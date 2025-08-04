import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreHorizontal, Smile, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const MessagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      avatar: '',
      lastMessage: 'Thanks for sharing that cultural recipe!',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      culture: 'Mexican'
    },
    {
      id: 2,
      name: 'Kenji Tanaka',
      avatar: '',
      lastMessage: 'The festival was amazing, we should go together next time',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      culture: 'Japanese'
    },
    {
      id: 3,
      name: 'Amara Okafor',
      avatar: '',
      lastMessage: 'I loved your cubble about Nigerian music!',
      timestamp: '3 hours ago',
      unread: 1,
      online: true,
      culture: 'Nigerian'
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: 'Maria Rodriguez',
      content: 'Hey! I saw your post about traditional foods. Have you tried making mole?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      content: 'No, I haven\'t! I\'d love to learn how to make it. Do you have a good recipe?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Maria Rodriguez',
      content: 'Absolutely! It\'s a family recipe passed down from my grandmother. I can share it with you.',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'You',
      content: 'That would be amazing! Thank you so much 😊',
      timestamp: '10:36 AM',
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      senderName: 'Maria Rodriguez',
      content: 'Thanks for sharing that cultural recipe!',
      timestamp: '10:38 AM',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[600px] flex bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-teal-200 focus:border-teal-400"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-white transition-colors ${
                selectedChat === conversation.id ? 'bg-white border-l-4 border-teal-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-black truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <Badge variant="outline" className="text-xs mt-1 border-teal-200 text-teal-700">
                    {conversation.culture}
                  </Badge>
                </div>
                
                {conversation.unread > 0 && (
                  <Badge className="bg-teal-500 text-white text-xs">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-black">{selectedConversation.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.online ? 'Online' : 'Last seen 1 hour ago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4 text-teal-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4 text-teal-600" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4 text-teal-600" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white'
                        : 'bg-white text-black border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4 text-teal-600" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[40px] max-h-[120px] resize-none border-teal-200 focus:border-teal-400"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4 text-teal-600" />
                </Button>
                <Button 
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;