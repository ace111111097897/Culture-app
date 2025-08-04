import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Heart, Smile, Camera, Gift } from 'lucide-react';

interface FakeMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isFromUser: boolean;
  messageType: 'text' | 'emoji' | 'photo' | 'gift';
}

interface FakeConversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  personality: string;
}

const FAKE_CONVERSATIONS: FakeConversation[] = [
  {
    id: '1', userId: 'alex_artist', userName: 'Alex Johnson', userAvatar: 'AJ',
    lastMessage: 'That art gallery was amazing! 🎨', timestamp: new Date(Date.now() - 300000),
    unreadCount: 2, isOnline: true, personality: 'creative'
  },
  {
    id: '2', userId: 'maria_music', userName: 'Maria Gonzalez', userAvatar: 'MG',
    lastMessage: 'Want to check out that new café? ☕', timestamp: new Date(Date.now() - 600000),
    unreadCount: 0, isOnline: false, personality: 'romantic'
  },
  {
    id: '3', userId: 'sam_tech', userName: 'Sam Lee', userAvatar: 'SL',
    lastMessage: 'The AI conference was incredible!', timestamp: new Date(Date.now() - 900000),
    unreadCount: 1, isOnline: true, personality: 'intellectual'
  }
];

const getPersonalityMessages = (personality: string) => {
  const messages = {
    creative: [
      "I'm working on a new piece, want to see? 🎨",
      "That sunset photo you shared was breathtaking!",
      "Found this amazing street art today 📸",
      "Your creative energy is so inspiring! ✨"
    ],
    romantic: [
      "Good morning beautiful! Hope your day is as lovely as you 🌹",
      "This song reminds me of you 🎵",
      "Can't wait to see you again 💕",
      "You make every day brighter ☀️"
    ],
    intellectual: [
      "Just read an fascinating article about quantum computing 🤖",
      "Your thoughts on that documentary were spot on!",
      "Have you seen the latest research on AI ethics?",
      "Coffee and deep conversation later? ☕"
    ],
    outgoing: [
      "Party at my place this weekend! You in? 🎉",
      "Found this amazing new restaurant! 🍕",
      "Adventure time! Where should we explore? 🗺️",
      "Game night was so much fun! Round 2? 🎮"
    ],
    adventurous: [
      "Planning a hiking trip this weekend! 🏔️",
      "Found this hidden gem of a restaurant 🗺️",
      "Road trip next month? I know the perfect route! 🚗",
      "Your travel photos are making me wanderlust! ✈️"
    ]
  };
  return messages[personality] || messages.outgoing;
};

const FakeMessagingSystem: React.FC = () => {
  const [conversations, setConversations] = useState<FakeConversation[]>(FAKE_CONVERSATIONS);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<FakeMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulate incoming messages
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomConv = conversations[Math.floor(Math.random() * conversations.length)];
        const personalityMessages = getPersonalityMessages(randomConv.personality);
        const randomMsg = personalityMessages[Math.floor(Math.random() * personalityMessages.length)];
        
        const newMsg: FakeMessage = {
          id: Date.now().toString(),
          senderId: randomConv.userId,
          senderName: randomConv.userName,
          senderAvatar: randomConv.userAvatar,
          content: randomMsg,
          timestamp: new Date(),
          isFromUser: false,
          messageType: 'text'
        };

        if (activeChat === randomConv.id) {
          setMessages(prev => [...prev, newMsg]);
        }

        setConversations(prev => prev.map(conv => 
          conv.id === randomConv.id 
            ? { ...conv, lastMessage: randomMsg, timestamp: new Date(), unreadCount: activeChat === conv.id ? 0 : conv.unreadCount + 1 }
            : conv
        ));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [conversations, activeChat]);

  const openChat = (conversationId: string) => {
    setActiveChat(conversationId);
    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      // Mark as read
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ));
      
      // Load some initial messages
      const initialMessages: FakeMessage[] = [
        {
          id: '1',
          senderId: conv.userId,
          senderName: conv.userName,
          senderAvatar: conv.userAvatar,
          content: conv.lastMessage,
          timestamp: conv.timestamp,
          isFromUser: false,
          messageType: 'text'
        }
      ];
      setMessages(initialMessages);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const conv = conversations.find(c => c.id === activeChat);
    if (!conv) return;

    const userMsg: FakeMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      senderAvatar: 'YU',
      content: newMessage,
      timestamp: new Date(),
      isFromUser: true,
      messageType: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Simulate response after delay
    setTimeout(() => {
      const personalityMessages = getPersonalityMessages(conv.personality);
      const response = personalityMessages[Math.floor(Math.random() * personalityMessages.length)];
      
      const responseMsg: FakeMessage = {
        id: (Date.now() + 1).toString(),
        senderId: conv.userId,
        senderName: conv.userName,
        senderAvatar: conv.userAvatar,
        content: response,
        timestamp: new Date(),
        isFromUser: false,
        messageType: 'text'
      };

      setMessages(prev => [...prev, responseMsg]);
    }, 2000 + Math.random() * 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => openChat(conv.id)}
                className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${activeChat === conv.id ? 'bg-purple-50' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {conv.userAvatar}
                      </AvatarFallback>
                    </Avatar>
                    {conv.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conv.userName}</p>
                      {conv.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          {activeChat ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {conversations.find(c => c.id === activeChat)?.userAvatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {conversations.find(c => c.id === activeChat)?.userName}
                </CardTitle>
                <p className="text-xs text-gray-500">
                  {conversations.find(c => c.id === activeChat)?.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          ) : (
            <CardTitle className="text-lg">Select a conversation</CardTitle>
          )}
        </CardHeader>
        <CardContent className="flex flex-col h-64">
          {activeChat ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-2 rounded-lg ${
                      msg.isFromUser 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeMessagingSystem;