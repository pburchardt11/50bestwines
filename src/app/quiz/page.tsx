'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

const questions: QuizQuestion[] = [
  {
    id: 'occasion',
    question: 'What\u2019s the occasion?',
    options: [
      { label: 'Casual weeknight dinner', value: 'casual', emoji: '🍽' },
      { label: 'Special celebration', value: 'celebration', emoji: '🎉' },
      { label: 'Gift for someone', value: 'gift', emoji: '🎁' },
      { label: 'Exploring something new', value: 'explore', emoji: '🧭' },
    ],
  },
  {
    id: 'flavor',
    question: 'What flavours do you enjoy?',
    options: [
      { label: 'Bold & full-bodied', value: 'bold', emoji: '💪' },
      { label: 'Light & refreshing', value: 'light', emoji: '🌿' },
      { label: 'Sweet & fruity', value: 'sweet', emoji: '🍓' },
      { label: 'Dry & crisp', value: 'dry', emoji: '🍋' },
    ],
  },
  {
    id: 'food',
    question: 'What are you eating?',
    options: [
      { label: 'Red meat or steak', value: 'red-meat', emoji: '🥩' },
      { label: 'Seafood or fish', value: 'seafood', emoji: '🐟' },
      { label: 'Pasta or pizza', value: 'pasta', emoji: '🍝' },
      { label: 'Cheese or charcuterie', value: 'cheese', emoji: '🧀' },
      { label: 'No food, just sipping', value: 'none', emoji: '🍷' },
    ],
  },
  {
    id: 'budget',
    question: 'What\u2019s your budget?',
    options: [
      { label: 'Under $15', value: 'budget', emoji: '💰' },
      { label: '$15 - $30', value: 'mid', emoji: '💵' },
      { label: '$30 - $75', value: 'premium', emoji: '💎' },
      { label: '$75+', value: 'luxury', emoji: '👑' },
    ],
  },
  {
    id: 'adventure',
    question: 'How adventurous are you?',
    options: [
      { label: 'Stick to what I know', value: 'safe', emoji: '🏠' },
      { label: 'Open to suggestions', value: 'open', emoji: '🌍' },
      { label: 'Surprise me!', value: 'surprise', emoji: '🎲' },
    ],
  },
];

interface Recommendation {
  type: string;
  region: string;
  description: string;
  searchQuery: string;
  emoji: string;
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { flavor, food, budget } = answers;

  // Bold + red meat => big red
  if (flavor === 'bold' && food === 'red-meat') {
    return {
      type: 'Red',
      region: 'Napa Valley or Bordeaux',
      description: 'A bold Cabernet Sauvignon or Bordeaux blend would be perfect. Look for wines with deep fruit, structured tannins, and a long finish.',
      searchQuery: 'type=red',
      emoji: '🍷',
    };
  }

  // Light + seafood => white
  if (flavor === 'light' && food === 'seafood') {
    return {
      type: 'White',
      region: 'Loire Valley or Marlborough',
      description: 'A crisp Sauvignon Blanc or Chablis would complement your seafood beautifully. Look for bright acidity and citrus notes.',
      searchQuery: 'type=white',
      emoji: '🥂',
    };
  }

  // Sweet => dessert/rosé
  if (flavor === 'sweet') {
    return {
      type: 'Rosé or Dessert',
      region: 'Provence or Sauternes',
      description: 'Try an elegant Provence rosé for casual sweetness, or a Sauternes for something truly special. Both offer beautiful fruit-forward flavours.',
      searchQuery: 'type=rosé',
      emoji: '🌸',
    };
  }

  // Dry + cheese => Italian or Spanish red
  if (flavor === 'dry' && food === 'cheese') {
    return {
      type: 'Red',
      region: 'Tuscany or Rioja',
      description: 'A Chianti Classico or aged Rioja pairs beautifully with cheese. Expect earthy notes, cherry fruit, and well-integrated tannins.',
      searchQuery: 'type=red',
      emoji: '🍷',
    };
  }

  // Celebration => sparkling
  if (answers.occasion === 'celebration') {
    return {
      type: 'Sparkling',
      region: 'Champagne',
      description: 'Nothing says celebration like Champagne. For the best value, look at Grower Champagnes or premium Crémant from Alsace or Burgundy.',
      searchQuery: 'type=sparkling',
      emoji: '🍾',
    };
  }

  // Budget => value picks
  if (budget === 'budget') {
    return {
      type: 'Red or White',
      region: 'Argentina, Chile, or Portugal',
      description: 'Amazing value can be found in South American Malbecs, Chilean Carmenère, and Portuguese reds. These regions consistently over-deliver at affordable prices.',
      searchQuery: 'priceRange=Budget',
      emoji: '💎',
    };
  }

  // Luxury gift
  if (answers.occasion === 'gift' && budget === 'luxury') {
    return {
      type: 'Red',
      region: 'Burgundy or Barolo',
      description: 'For a luxury gift, consider a fine Burgundy Pinot Noir or a Barolo from Piedmont. These are wines that speak of terroir and tradition.',
      searchQuery: 'type=red',
      emoji: '🎁',
    };
  }

  // Bold + pasta
  if (flavor === 'bold' && food === 'pasta') {
    return {
      type: 'Red',
      region: 'Tuscany or Southern Italy',
      description: 'An Italian Sangiovese-based wine like Chianti or Brunello pairs perfectly with pasta. Look for wines with bright acidity to cut through rich sauces.',
      searchQuery: 'type=red',
      emoji: '🍷',
    };
  }

  // Default
  return {
    type: 'Red or White',
    region: 'France or Italy',
    description: 'Based on your preferences, we recommend exploring classic French or Italian wines. Start with a Côtes du Rhône red or a Vermentino white for excellent quality and value.',
    searchQuery: '',
    emoji: '🍷',
  };
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  function selectAnswer(value: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  }

  const recommendation = showResult ? getRecommendation(answers) : null;

  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Wine Finder Quiz</h1>
          <p className="mt-3 text-text/50">Answer a few questions and we&apos;ll recommend the perfect wine for you.</p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {!showResult ? (
          <>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between text-xs text-text/40">
                <span>Question {currentStep + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-card-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-wine/70 to-wine transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-text sm:text-3xl">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-8 space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectAnswer(option.value)}
                  className="flex w-full items-center gap-4 rounded-xl border border-card-border bg-card-bg p-5 text-left transition-all duration-200 hover:border-wine/40 hover:bg-wine/5 hover:shadow-[0_0_20px_rgba(139,34,82,0.1)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-wine/10 text-2xl">{option.emoji}</span>
                  <span className="text-base font-medium text-text">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Back button */}
            {currentStep > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-sm text-text/40 hover:text-wine transition-colors"
                >
                  &larr; Back to previous question
                </button>
              </div>
            )}
          </>
        ) : recommendation ? (
          <>
            {/* Result */}
            <div className="text-center">
              <span className="text-6xl">{recommendation.emoji}</span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-text">Your Perfect Wine</h2>
              <p className="mt-2 text-wine font-serif text-xl font-bold">{recommendation.type} from {recommendation.region}</p>
            </div>

            <div className="mt-8 rounded-2xl border border-card-border bg-card-bg p-8">
              <p className="text-sm leading-relaxed text-text/60">{recommendation.description}</p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`/rankings?${recommendation.searchQuery}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-8 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Browse Matching Wines
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-xl border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10"
              >
                Retake Quiz
              </button>
            </div>

            <AdUnit format="horizontal" className="mt-12" />
          </>
        ) : null}
      </div>
    </>
  );
}
