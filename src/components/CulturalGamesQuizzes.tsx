import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Globe, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

interface Game {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  players: string;
  icon: string;
}

const CulturalGamesQuizzes: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const culturalGames: Game[] = [
    {
      id: 'xiangqi',
      name: 'Xiangqi (Chinese Chess)',
      description: 'Strategic board game from China',
      category: 'Strategy',
      difficulty: 'Hard',
      players: '2',
      icon: '🐉'
    },
    {
      id: 'go',
      name: 'Go (Weiqi)',
      description: 'Ancient territory control game',
      category: 'Strategy',
      difficulty: 'Hard',
      players: '2',
      icon: '⚫'
    },
    {
      id: 'mancala',
      name: 'Mancala',
      description: 'African seed-sowing game',
      category: 'Strategy',
      difficulty: 'Medium',
      players: '2',
      icon: '🌍'
    },
    {
      id: 'shogi',
      name: 'Shogi',
      description: 'Japanese chess variant',
      category: 'Strategy',
      difficulty: 'Hard',
      players: '2',
      icon: '🏯'
    }
  ];

  const quizQuestions: Question[] = [
    {
      id: 1,
      question: "Which country is the origin of the game Go?",
      options: ["Japan", "China", "Korea", "Mongolia"],
      correct: 1,
      explanation: "Go originated in China over 4000 years ago.",
      category: "History"
    },
    {
      id: 2,
      question: "In Mancala, what are the playing pieces typically called?",
      options: ["Stones", "Seeds", "Beans", "All of the above"],
      correct: 3,
      explanation: "Mancala pieces can be called stones, seeds, or beans depending on the region.",
      category: "Rules"
    },
    {
      id: 3,
      question: "How many pieces does each player start with in Xiangqi?",
      options: ["14", "15", "16", "17"],
      correct: 2,
      explanation: "Each player starts with 16 pieces in Xiangqi.",
      category: "Rules"
    }
  ];

  const startQuiz = () => {
    setActiveQuiz('cultural');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setQuizCompleted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (quizCompleted) {
    return (
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardContent className="p-6 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-white/80 mb-4">
            You scored {score} out of {quizQuestions.length}
          </p>
          <div className="mb-6">
            <Progress value={(score / quizQuestions.length) * 100} className="w-full" />
          </div>
          <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
            Try Another Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (activeQuiz) {
    const question = quizQuestions[currentQuestion];
    return (
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              Cultural Quiz
            </CardTitle>
            <Badge variant="outline" className="text-white border-white/30">
              {currentQuestion + 1}/{quizQuestions.length}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{question.question}</h3>
            
            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto ${
                    showResult
                      ? index === question.correct
                        ? 'bg-green-600 border-green-500'
                        : selectedAnswer === index
                        ? 'bg-red-600 border-red-500'
                        : 'bg-white/5 border-white/20'
                      : selectedAnswer === index
                      ? 'bg-blue-600 border-blue-500'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    {showResult && index === question.correct && (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                    )}
                    {showResult && selectedAnswer === index && index !== question.correct && (
                      <XCircle className="w-5 h-5 mr-2 text-red-300" />
                    )}
                    <span className="text-white">{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                <p className="text-white/90 text-sm">{question.explanation}</p>
              </div>
            )}

            {!showResult && (
              <Button 
                onClick={submitAnswer} 
                disabled={selectedAnswer === null}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Submit Answer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="w-6 h-6 mr-2" />
            Cultural Games & Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {culturalGames.map((game) => (
              <Card key={game.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{game.icon}</div>
                    <Badge className={`${getDifficultyColor(game.difficulty)} text-white text-xs`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{game.name}</h3>
                  <p className="text-white/70 text-sm mb-3">{game.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">{game.players} players</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={startQuiz} className="bg-purple-600 hover:bg-purple-700">
              <Brain className="w-4 h-4 mr-2" />
              Start Cultural Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalGamesQuizzes;