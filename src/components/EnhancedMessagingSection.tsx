import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  avatar: string;
}

const EnhancedMessagingSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Hey! How was the cultural festival?',
      unreadCount: 2,
      avatar: '👩‍🎨'
    },
    {
      id: '2', 
      name: 'Marcus Johnson',
      lastMessage: 'Thanks for the food recommendation!',
      unreadCount: 0,
      avatar: '👨‍🍳'
    },
    {
      id: '3',
      name: 'Aisha Patel',
      lastMessage: 'The art exhibition was amazing',
      unreadCount: 1,
      avatar: '🎭'
    }
  ]);

  const messages = [
    { id: '1', sender: 'Sarah Chen', content: 'Hey! How was the cultural festival?', timestamp: new Date() },
    { id: '2', sender: 'You', content: 'It was incredible! So many different cultures represented.', timestamp: new Date() }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      toast({ title: "Message sent!", description: "Your cultural connection continues..." });
      setNewMessage('');
    }
  };

  const openChat = (chatId: string) => {
    setSelectedChat(chatId);
    toast({ title: "Chat opened", description: "Start your cultural conversation!" });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Connect with your cultural community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => openChat(chat.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{chat.avatar}</span>
                    <div>
                      <p className="font-medium">{chat.name}</p>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                  {chat.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedChat ? chats.find(c => c.id === selectedChat)?.name : 'Click on a connection to chat'}</span>
              <Button variant="ghost" size="sm">
                <Bot className="h-4 w-4 text-teal-600" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-64">
            {selectedChat ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'You' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          message.sender === 'You'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Click on a connection to start messaging
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedMessagingSection;