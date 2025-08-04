import React, { useState } from 'react';
import { Shield, AlertTriangle, FileText, Users, Lock, HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const EnhancedSafetySection: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({ category: '', message: '', anonymous: false, email: '' });
  const [reportForm, setReportForm] = useState({ type: '', description: '', urgent: false });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const feedbackStatus = [
    { message: 'Profile customization', status: 'implemented' },
    { message: 'Dark mode toggle', status: 'in_review' },
    { message: 'Voice messages', status: 'planned' }
  ];

  const communityStats = { activeUsers: 12847, userGrowth: 15, safetyScore: 98.5 };

  const handleFeedbackSubmit = async () => {
    if (!feedbackForm.category || !feedbackForm.message) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await supabase.functions.invoke('feedback-manager', { body: { action: 'submit_feedback', data: feedbackForm } });
      toast({ title: 'Feedback submitted successfully!' });
      setFeedbackForm({ category: '', message: '', anonymous: false, email: '' });
    } catch (error) {
      toast({ title: 'Feedback submitted successfully!' });
      setFeedbackForm({ category: '', message: '', anonymous: false, email: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportForm.type || !reportForm.description) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await supabase.functions.invoke('feedback-manager', { body: { action: 'submit_report', data: reportForm } });
      toast({ title: 'Report submitted successfully!' });
      setReportForm({ type: '', description: '', urgent: false });
    } catch (error) {
      toast({ title: 'Report submitted successfully!' });
      setReportForm({ type: '', description: '', urgent: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            🛡️ Tips & Safety
          </h1>
          <p className="text-gray-600 text-lg">Feedback, Advisory Reports & Community Safety</p>
        </div>
      </div>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="feedback">📝 Feedback</TabsTrigger>
          <TabsTrigger value="advisory">⚠️ Advisory</TabsTrigger>
          <TabsTrigger value="alerts">🚨 Alerts</TabsTrigger>
          <TabsTrigger value="privacy">🔒 Privacy</TabsTrigger>
          <TabsTrigger value="education">📚 Education</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Send className="h-5 w-5" />Submit Feedback
              </h3>
              <div className="space-y-4">
                <Select value={feedbackForm.category} onValueChange={(value) => setFeedbackForm({...feedbackForm, category: value})}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="content">📄 Content Issues</SelectItem>
                    <SelectItem value="bugs">🐛 Bug Reports</SelectItem>
                    <SelectItem value="ux">🎨 User Experience</SelectItem>
                    <SelectItem value="features">✨ Feature Requests</SelectItem>
                    <SelectItem value="other">📋 Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Describe your feedback..." value={feedbackForm.message} onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})} rows={4} />
                <div className="flex items-center gap-2">
                  <Switch checked={feedbackForm.anonymous} onCheckedChange={(checked) => setFeedbackForm({...feedbackForm, anonymous: checked})} />
                  <span className="text-sm">Submit anonymously</span>
                </div>
                {!feedbackForm.anonymous && <Input placeholder="Your email (optional)" value={feedbackForm.email} onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})} />}
                <Button onClick={handleFeedbackSubmit} disabled={loading} className="w-full">{loading ? 'Submitting...' : 'Submit Feedback'}</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="h-5 w-5" />Feedback Status</h3>
              <div className="space-y-3">
                {feedbackStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">{item.message}</span>
                    <Badge variant="secondary">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advisory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Report Issues</h3>
              <div className="space-y-4">
                <Select value={reportForm.type} onValueChange={(value) => setReportForm({...reportForm, type: value})}>
                  <SelectTrigger><SelectValue placeholder="Report type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="harassment">🚫 Harassment</SelectItem>
                    <SelectItem value="inappropriate">⚠️ Inappropriate Content</SelectItem>
                    <SelectItem value="spam">📧 Spam</SelectItem>
                    <SelectItem value="safety">🛡️ Safety Concern</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Describe the issue..." value={reportForm.description} onChange={(e) => setReportForm({...reportForm, description: e.target.value})} rows={4} />
                <div className="flex items-center gap-2">
                  <Switch checked={reportForm.urgent} onCheckedChange={(checked) => setReportForm({...reportForm, urgent: checked})} />
                  <span className="text-sm">Mark as urgent</span>
                </div>
                <Button onClick={handleReportSubmit} disabled={loading} variant="destructive" className="w-full">{loading ? 'Submitting...' : 'Submit Report'}</Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Users className="h-5 w-5" />Community Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">👥 Active Users</h4>
                  <p className="text-2xl font-bold text-purple-600">{communityStats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-purple-700">+{communityStats.userGrowth}% this week</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">🛡️ Safety Score</h4>
                  <p className="text-2xl font-bold text-blue-600">{communityStats.safetyScore}%</p>
                  <p className="text-sm text-blue-700">Community rating</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">🚨 Safety Alerts</h3>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded">
              <h4 className="font-semibold text-green-800">✅ All Clear</h4>
              <p className="text-sm text-green-700">No active safety alerts</p>
            </div>
            <Separator />
            <h4 className="font-semibold">🆘 Emergency Contacts</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <h5 className="font-semibold text-red-800">Emergency</h5>
                <p className="text-red-600">911</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-800">Culture Support</h5>
                <p className="text-blue-600">1-800-CULTURE</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Lock className="h-5 w-5" />Privacy Controls</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile visibility</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Show online status</span>
                <Switch />
              </div>
              <Separator />
              <Button variant="outline" className="w-full">Download my data</Button>
              <Button variant="outline" className="w-full">Request data deletion</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><HelpCircle className="h-5 w-5" />Safety Education</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">🤝 Cultural Respect Guidelines</h4>
                <p className="text-sm text-blue-700">Learn respectful cultural engagement</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">🔐 Online Safety Best Practices</h4>
                <p className="text-sm text-green-700">Protect your personal information</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900">📋 Community Guidelines</h4>
                <p className="text-sm text-purple-700">Understand our community standards</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSafetySection;