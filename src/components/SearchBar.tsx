import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, User, Globe, MapPin } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'user' | 'culture';
  name: string;
  description: string;
  location?: string;
  avatar?: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockResults: SearchResult[] = [
    { id: '1', type: 'user', name: 'Maria Santos', description: 'Brazilian culture enthusiast', location: 'São Paulo, Brazil' },
    { id: '2', type: 'culture', name: 'Japanese Culture', description: 'Tea ceremonies, anime, traditional arts', location: 'Japan' },
    { id: '3', type: 'user', name: 'Ahmed Hassan', description: 'Middle Eastern traditions', location: 'Cairo, Egypt' },
    { id: '4', type: 'culture', name: 'Indian Culture', description: 'Festivals, cuisine, classical music', location: 'India' },
    { id: '5', type: 'user', name: 'Elena Rossi', description: 'Italian food and art lover', location: 'Rome, Italy' },
    { id: '6', type: 'culture', name: 'Korean Culture', description: 'K-pop, Korean BBQ, traditional dance', location: 'South Korea' }
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const filtered = mockResults.filter(result => 
          result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users or cultures..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      
      {(results.length > 0 || isSearching) && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {isSearching ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="ml-2 text-sm text-gray-600">Searching...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result) => (
                  <div key={result.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={result.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}>
                        {result.type === 'user' ? <User className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{result.name}</h4>
                      <p className="text-xs text-gray-600">{result.description}</p>
                      {result.location && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{result.location}</span>
                        </div>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${result.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {result.type === 'user' ? 'User' : 'Culture'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;