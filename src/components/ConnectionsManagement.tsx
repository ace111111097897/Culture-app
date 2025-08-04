import React, { useState } from 'react';
import { Users, UserPlus, UserMinus, MessageCircle, MoreHorizontal, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Connection {
  id: string;
  name: string;
  avatar?: string;
  mutualFriends: number;
  lastActive: string;
  interests: string[];
  status: 'online' | 'offline' | 'away';
  connectionDate: string;
}

interface ConnectionsManagementProps {
  friends: Connection[];
  pendingRequests: Connection[];
  suggestions: Connection[];
  onRemoveFriend: (id: string) => void;
  onBlockUser: (id: string) => void;
  onSendMessage: (id: string) => void;
  onAcceptRequest: (id: string) => void;
  onDeclineRequest: (id: string) => void;
  onSendRequest: (id: string) => void;
}

const ConnectionsManagement: React.FC<ConnectionsManagementProps> = ({
  friends,
  pendingRequests,
  suggestions,
  onRemoveFriend,
  onBlockUser,
  onSendMessage,
  onAcceptRequest,
  onDeclineRequest,
  onSendRequest
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const filterAndSortConnections = (connections: Connection[]) => {
    let filtered = connections.filter(conn => 
      conn.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || conn.status === filterStatus)
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'recent': return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        case 'mutual': return b.mutualFriends - a.mutualFriends;
        default: return 0;
      }
    });
  };

  const ConnectionCard = ({ connection, actions }: { connection: Connection; actions: React.ReactNode }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={connection.avatar} alt={connection.name} />
              <AvatarFallback className="bg-purple-100 text-purple-600">
                {connection.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(connection.status)}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{connection.name}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>{connection.mutualFriends} mutual friends</span>
              <span>•</span>
              <span>Active {connection.lastActive}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {connection.interests.slice(0, 3).map((interest, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {connection.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{connection.interests.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {actions}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search connections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
                <SelectItem value="mutual">Mutual Friends</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="away">Away</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">👥 Friends ({friends.length})</TabsTrigger>
          <TabsTrigger value="requests">📨 Requests ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="suggestions">💡 Suggestions ({suggestions.length})</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="mt-4">
          <div className="space-y-3">
            {filterAndSortConnections(friends).map((friend) => (
              <ConnectionCard
                key={friend.id}
                connection={friend}
                actions={
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSendMessage(friend.id)}
                      className="h-8 w-8 p-0"
                    >
                      <MessageCircle className="h-3 w-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onRemoveFriend(friend.id)}>
                          <UserMinus className="h-4 w-4 mr-2" />
                          Remove Friend
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onBlockUser(friend.id)}
                          className="text-red-600"
                        >
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                }
              />
            ))}
            {filterAndSortConnections(friends).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No friends found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Pending Requests Tab */}
        <TabsContent value="requests" className="mt-4">
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <ConnectionCard
                key={request.id}
                connection={request}
                actions={
                  <>
                    <Button
                      size="sm"
                      onClick={() => onAcceptRequest(request.id)}
                      className="bg-green-500 hover:bg-green-600 text-white h-8 px-3"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeclineRequest(request.id)}
                      className="h-8 px-3"
                    >
                      Decline
                    </Button>
                  </>
                }
              />
            ))}
            {pendingRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending friend requests</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="mt-4">
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <ConnectionCard
                key={suggestion.id}
                connection={suggestion}
                actions={
                  <Button
                    size="sm"
                    onClick={() => onSendRequest(suggestion.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white h-8 px-3"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                }
              />
            ))}
            {suggestions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No friend suggestions available</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionsManagement;