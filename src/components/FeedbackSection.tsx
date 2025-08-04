import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Star, Send, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

const FeedbackSection: React.FC = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: MessageCircle },
    { id: 'bug', label: 'Bug Report', icon: AlertCircle },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb },
    { id: 'safety', label: 'Safety Concern', icon: AlertCircle }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      setEmail('');
      setRating(0);
    }, 3000);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
      >
        ★
      </button>
    ));
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Feedback & Support</h1>
            <p className="text-gray-600">Help us improve your experience</p>
          </div>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
            <p className="text-green-700">Your feedback has been submitted successfully. We appreciate your input and will review it carefully.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Feedback & Support</h1>
          <p className="text-gray-600">Help us improve your experience</p>
        </div>
      </div>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Share Your Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div>
              <Label className="text-base font-medium mb-3 block">What type of feedback?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {feedbackTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFeedbackType(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        feedbackType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium">{type.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label className="text-base font-medium mb-3 block">How would you rate your experience?</Label>
              <div className="flex gap-1">
                {renderStars()}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Feedback Text */}
            <div>
              <Label htmlFor="feedback" className="text-base font-medium">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Please share your thoughts, suggestions, or report any issues..."
                className="mt-2 min-h-[120px]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-medium">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="mt-2"
              />
              <p className="text-sm text-gray-600 mt-1">We'll only use this to follow up on your feedback if needed.</p>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">How do I report a user?</h4>
              <p className="text-sm text-gray-700">You can report a user by clicking the three dots on their profile and selecting "Report User".</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">How long does it take to get a response?</h4>
              <p className="text-sm text-gray-700">We typically respond to feedback within 24-48 hours during business days.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Can I suggest new features?</h4>
              <p className="text-sm text-gray-700">Absolutely! We love hearing feature ideas from our community. Use the "Feature Request" option above.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSection;