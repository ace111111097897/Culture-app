import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Send, MessageSquare } from 'lucide-react';

interface QRCodeFeedbackFormProps {
  type: 'cubble' | 'event' | 'general';
  targetId?: string;
  targetName?: string;
}

export const QRCodeFeedbackForm: React.FC<QRCodeFeedbackFormProps> = ({ 
  type, 
  targetId, 
  targetName 
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'cubble': return 'from-teal-500 to-cyan-500';
      case 'event': return 'from-green-500 to-teal-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'cubble': return 'Cubble';
      case 'event': return 'Event';
      default: return 'General';
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-slate-900/50 border-teal-500/20">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-teal-300 mb-2">Thank You!</h3>
          <p className="text-slate-400">Your feedback has been submitted successfully.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-900/50 border-teal-500/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-teal-300">
          <MessageSquare className="w-5 h-5" />
          Feedback Form
        </CardTitle>
        <Badge className={`bg-gradient-to-r ${getTypeColor()} text-white mx-auto`}>
          {getTypeLabel()} Feedback
        </Badge>
        {targetName && (
          <p className="text-sm text-slate-400">for {targetName}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-300">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-slate-600'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-300">Your Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or experience..."
              className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
              rows={4}
              required
            />
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-300">
              Email (Optional)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500"
            />
            <p className="text-xs text-slate-500">
              Leave your email if you'd like a response
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !feedback.trim() || rating === 0}
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </div>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};