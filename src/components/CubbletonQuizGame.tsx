import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, Clock, MessageCircle, Send, Users, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CubbletonQuizGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'Maria', message: 'Good luck everyone! 🍀', time: '2m ago' },
    { user: 'Kenji', message: 'This is so fun!', time: '1m ago' }
  ]);

  const questions = [
    {
      question: "Which festival is known as the 'Festival of Lights'?",
      options: ['Diwali', 'Holi', 'Eid', 'Christmas'],
      correct: 0,
      culture: 'Indian',
      difficulty: 'Easy'
    },
    {
      question: "What is the traditional Japanese art of paper folding called?",
      options: ['Ikebana', 'Origami', 'Calligraphy', 'Bonsai'],
      correct: 1,
      culture: 'Japanese',
      difficulty: 'Medium'
    },
    {
      question: "Which dance originated in Argentina?",
      options: ['Salsa', 'Flamenco', 'Tango', 'Samba'],
      correct: 2,
      culture: 'Argentinian',
      difficulty: 'Medium'
    }
  ];

  const players = [
    { name: 'You', score: score, avatar: '/placeholder.svg', rank: 1 },
    { name: 'Maria', score: 85, avatar: '/placeholder.svg', rank: 2 },
    { name: 'Kenji', score: 78, avatar: '/placeholder.svg', rank: 3 },
    { name: 'Ahmed', score: 72, avatar: '/placeholder.svg', rank: 4 }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  const startGame = () => {
    setGameActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!gameActive) return;
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + (timeLeft * 10));
      }
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setGameActive(false);
      setShowResult(true);
    }
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, {
        user: 'You',
        message: chatMessage,
        time: 'now'
      }]);
      setChatMessage('');
    }
  };

  const getAnswerButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return 'border-orange-200 hover:bg-orange-50';
    }
    if (index === questions[currentQuestion].correct) {
      return 'bg-green-500 text-white border-green-500';
    }
    if (index === selectedAnswer && index !== questions[currentQuestion].correct) {
      return 'bg-red-500 text-white border-red-500';
    }
    return 'border-gray-200 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Best Cubbleton Quiz
        </h1>
        <p className="text-gray-600">Test your cultural knowledge and compete with others!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Game Area */}
        <div className="lg:col-span-2">
          {!gameActive && !showResult && (
            <Card className="border-orange-200 text-center p-8">
              <CardContent>
                <Trophy className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Ready to Test Your Cultural Knowledge?</h2>
                <p className="text-gray-600 mb-6">Answer questions about cultures from around the world!</p>
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {gameActive && (
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <Badge className="bg-orange-100 text-orange-700">
                      {questions[currentQuestion].culture}
                    </Badge>
                    <Badge variant="outline" className="border-orange-200">
                      {questions[currentQuestion].difficulty}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-bold">{timeLeft}s</span>
                  </div>
                </div>
                <Progress value={(timeLeft / 30) * 100} className="mt-2" />
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-6">{questions[currentQuestion].question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 h-auto text-left justify-start ${getAnswerButtonClass(index)}`}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-600">Score: <span className="font-bold text-orange-600">{score}</span></p>
                </div>
              </CardContent>
            </Card>
          )}

          {showResult && (
            <Card className="border-green-200 text-center p-8">
              <CardContent>
                <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
                <p className="text-gray-600 mb-4">Your final score: <span className="font-bold text-green-600">{score}</span></p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={startGame}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Play Again
                  </Button>
                  <Button variant="outline" className="border-orange-200">
                    Share Score
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-500" />
                <span>Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {players.map((player, index) => (
                  <div key={player.name} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <img src={player.avatar} alt={player.name} />
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.score} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Box */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span>Game Chat</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Users className="h-3 w-3 mr-1" />
                  {players.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-blue-600">{msg.user}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="flex-1 border-blue-200"
                />
                <Button 
                  size="sm" 
                  onClick={sendChatMessage}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CubbletonQuizGame;