import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Heart, RefreshCw } from 'lucide-react';

interface Inspiration {
  quote: string;
  translation: string;
  author: string;
  category: string;
}

const inspirations: Inspiration[] = [
  {
    quote: "सत्यमेव जयते",
    translation: "Truth alone triumphs",
    author: "Mundaka Upanishad",
    category: "Truth"
  },
  {
    quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    translation: "You have the right to work only, but never to its fruits",
    author: "Bhagavad Gita",
    category: "Karma"
  },
  {
    quote: "अहिंसा परमो धर्मः",
    translation: "Non-violence is the highest virtue",
    author: "Mahabharata",
    category: "Ahimsa"
  },
  {
    quote: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
    translation: "May all be happy, may all be free from illness",
    author: "Ancient Sanskrit Prayer",
    category: "Peace"
  },
  {
    quote: "योग: कर्मसु कौशलम्",
    translation: "Yoga is excellence in action",
    author: "Bhagavad Gita",
    category: "Yoga"
  },
  {
    quote: "वसुधैव कुटुम्बकम्",
    translation: "The world is one family",
    author: "Maha Upanishad",
    category: "Unity"
  },
  {
    quote: "सर्वं खल्विदं ब्रह्म",
    translation: "All this is indeed Brahman",
    author: "Chandogya Upanishad",
    category: "Oneness"
  }
];

const DailyInspiration = () => {
  const [inspiration, setInspiration] = useState<Inspiration>({ 
    quote: "", 
    translation: "", 
    author: "", 
    category: "" 
  });
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomInspiration = () => {
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    return inspirations[randomIndex];
  };

  useEffect(() => {
    setInspiration(getRandomInspiration());
  }, []);

  const handleNewQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      setInspiration(getRandomInspiration());
      setIsLoading(false);
    }, 500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Spiritual Inspiration',
          text: `"${inspiration.quote}" - ${inspiration.author}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="spiritual-card text-center relative"
      >
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isLiked ? 'text-red-500' : 'text-spiritual-brown/70 hover:text-spiritual-brown'
            }`}
          >
            <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-spiritual-brown/70 hover:text-spiritual-brown transition-colors duration-300"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleNewQuote}
            className={`p-2 rounded-full text-spiritual-brown/70 hover:text-spiritual-brown transition-colors duration-300 ${
              isLoading ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <h2 className="font-sanskrit text-2xl md:text-3xl text-spiritual-brown mb-6">Daily Inspiration</h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <motion.p
              key={inspiration.quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-sanskrit text-spiritual-brown mb-4"
            >
              {inspiration.quote}
            </motion.p>
            <motion.p
              key={inspiration.translation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-spiritual-brown/80 mb-4"
            >
              {inspiration.translation}
            </motion.p>
            <motion.p
              key={inspiration.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.4 }}
              className="text-spiritual-brown/70 italic"
            >
              - {inspiration.author}
            </motion.p>
          </div>
          <span className="inline-block px-3 py-1 bg-spiritual-brown/10 rounded-full text-sm text-spiritual-brown/70">
            {inspiration.category}
          </span>
        </div>

        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 rounded-b-lg shadow-lg"
          >
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`"${inspiration.quote}" - ${inspiration.author}`);
                  setShowShareOptions(false);
                }}
                className="px-4 py-2 bg-spiritual-brown/10 text-spiritual-brown rounded-md hover:bg-spiritual-brown/20 transition-colors duration-300"
              >
                Copy Text
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `"${inspiration.quote}" - ${inspiration.author}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-spiritual-brown/10 text-spiritual-brown rounded-md hover:bg-spiritual-brown/20 transition-colors duration-300"
              >
                Share on Twitter
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DailyInspiration;
