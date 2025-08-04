import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Plus, Sparkles } from 'lucide-react';

interface InteractiveHomeProps {
  username: string;
}

const InteractiveHomeSection: React.FC<InteractiveHomeProps> = ({ username }) => {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Alex Chen', content: 'Just discovered an amazing new game! Who wants to play together?', likes: 12, comments: 3, liked: false },
    { id: 2, author: 'Maya Rodriguez', content: 'Looking for cultural exchange partners. I speak Spanish and English!', likes: 8, comments: 5, liked: false }
  ]);
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: username || 'You',
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostForm(false);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-purple-600" />
            Welcome back, {username}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">What's on your mind today?</p>
          {!showPostForm ? (
            <Button onClick={() => setShowPostForm(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Share your thoughts..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-20"
              />
              <div className="flex gap-2">
                <Button onClick={handleNewPost} size="sm">Post</Button>
                <Button variant="outline" onClick={() => setShowPostForm(false)} size="sm">Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {posts.map(post => (
        <Card key={post.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                {post.author[0]}
              </div>
              <span className="font-semibold">{post.author}</span>
            </div>
            <p className="text-gray-800 mb-4">{post.content}</p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={post.liked ? 'text-red-500' : 'text-gray-500'}
              >
                <Heart className={`w-4 h-4 mr-1 ${post.liked ? 'fill-current' : ''}`} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MessageCircle className="w-4 h-4 mr-1" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InteractiveHomeSection;