import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface NotificationsSectionProps {
  onNotificationRead: () => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({ onNotificationRead }) => {
  const notifications = [
    { id: '1', type: 'like', message: 'Sarah liked your profile', time: '5 min ago', unread: true },
    { id: '2', type: 'message', message: 'New message from Marcus', time: '1 hour ago', unread: true },
    { id: '3', type: 'match', message: 'You have a new match!', time: '2 hours ago', unread: false }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Notifications & Alerts</h2>
      {notifications.map((notif) => (
        <Card key={notif.id} className={notif.unread ? 'border-purple-200 bg-purple-50' : ''}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">{notif.message}</p>
                <p className="text-sm text-gray-600">{notif.time}</p>
              </div>
            </div>
            {notif.unread && (
              <Button size="sm" variant="outline" onClick={onNotificationRead}>
                Mark Read
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsSection;