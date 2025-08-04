import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, MapPin, Users, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'user' | 'culture';
  name: string;
  location?: string;
  culture?: string;
  verified?: boolean;
  image?: string;
  description?: string;
}

interface EnhancedSearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'users' | 'cultures'>('all');
  const { isMobile, isTablet } = useResponsive();

  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'user',
      name: 'Maria Rodriguez',
      location: 'Barcelona, Spain',
      culture: 'Spanish',
      verified: true,
      image: '/api/placeholder/40/40'
    },
    {
      id: '2',
      type: 'culture',
      name: 'Japanese Culture',
      description: 'Traditional customs, tea ceremony, anime',
      image: '/api/placeholder/40/40'
    },
    {
      id: '3',
      type: 'user',
      name: 'Ahmed Hassan',
      location: 'Cairo, Egypt',
      culture: 'Egyptian',
      verified: false,
      image: '/api/placeholder/40/40'
    }
  ];

  const filteredResults = mockResults.filter(result => {
    if (activeFilter === 'users' && result.type !== 'user') return false;
    if (activeFilter === 'cultures' && result.type !== 'culture') return false;
    return result.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setIsActive(value.length > 0);
    onSearch?.(value);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search users, cultures, countries..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsActive(true)}
          className={cn(
            'pl-10 pr-4 h-12 text-base border-2 border-gray-200 focus:border-purple-500 rounded-xl',
            {
              'text-sm h-10': isMobile,
            }
          )}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSearch('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            ×
          </Button>
        )}
      </div>

      {isActive && query && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-2 border-gray-100">
          <CardContent className="p-0">
            {/* Filter Tabs */}
            <div className="flex border-b border-gray-100 p-2">
              {[
                { key: 'all', label: 'All', icon: Search },
                { key: 'users', label: 'Users', icon: Users },
                { key: 'cultures', label: 'Cultures', icon: Globe }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={activeFilter === key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveFilter(key as any)}
                  className={cn(
                    'flex items-center gap-2 mr-2',
                    {
                      'bg-purple-100 text-purple-700': activeFilter === key,
                      'text-xs px-2 py-1': isMobile,
                    }
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {!isMobile && label}
                </Button>
              ))}
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0"
                    onClick={() => {
                      console.log('Selected:', result);
                      setIsActive(false);
                      setQuery('');
                    }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={result.image} alt={result.name} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {result.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 truncate">
                          {result.name}
                        </h4>
                        {result.verified && (
                          <Badge className="bg-green-100 text-green-700 text-xs px-1 py-0">
                            ✓
                          </Badge>
                        )}
                      </div>
                      
                      {result.type === 'user' ? (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {result.location && (
                            <>
                              <MapPin className="h-3 w-3" />
                              <span className="truncate">{result.location}</span>
                            </>
                          )}
                          {result.culture && (
                            <Badge variant="outline" className="text-xs">
                              {result.culture}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 truncate">
                          {result.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-400 capitalize">
                      {result.type}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try searching for users or cultures</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearchBar;