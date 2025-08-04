import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bell } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  unread?: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  avatar: string;
}

const MessagingSection: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
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
  
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Hey! How was the cultural festival?',
      timestamp: new Date(),
      unread: true
    },
    {
      id: '2',
      sender: 'You',
      content: 'It was incredible! So many different cultures represented.',
      timestamp: new Date()
    }
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send to backend
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
      {/* Chat List */}
      <Card className="md:col-span-1 bg-teal-50 border border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <MessageCircle className="h-5 w-5 text-teal-600" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 border-b border-teal-100 cursor-pointer hover:bg-teal-100 ${
                selectedChat === chat.id ? 'bg-teal-100' : ''
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chat.avatar}</span>
                  <div>
                    <p className="font-medium text-teal-800">{chat.name}</p>
                    <p className="text-sm text-teal-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
                {chat.unreadCount > 0 && (
                  <Badge className="bg-purple-600 text-white h-5 w-5 p-0 flex items-center justify-center">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Chat Window */}
      <Card className="md:col-span-2 bg-blue-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-800">
            <span>{selectedChat ? chats.find(c => c.id === selectedChat)?.name : 'Select a chat'}</span>
            <Bell className="h-5 w-5 text-blue-600" />
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
                          ? 'bg-teal-600 text-white'
                          : 'bg-white text-blue-800 border border-blue-200'
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
                  className="bg-white border-blue-300 text-blue-800 placeholder:text-blue-500"
                />
                <Button onClick={sendMessage} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-blue-600">
              Select a conversation to start messaging
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingSection;