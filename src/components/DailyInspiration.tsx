
import React, { useState, useEffect } from 'react';

const inspirations = [
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    quote: "The spiritual journey is the unlearning of fear and the acceptance of love.",
    author: "Marianne Williamson"
  },
  {
    quote: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi"
  },
  {
    quote: "The spiritual life does not remove us from the world but leads us deeper into it.",
    author: "Henri J.M. Nouwen"
  },
  {
    quote: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
    author: "Pierre Teilhard de Chardin"
  },
  {
    quote: "Happiness cannot be traveled to, owned, earned, worn or consumed. Happiness is the spiritual experience of living every minute with love, grace, and gratitude.",
    author: "Denis Waitley"
  },
  {
    quote: "Just as a candle cannot burn without fire, men cannot live without a spiritual life.",
    author: "Buddha"
  }
];

const DailyInspiration = () => {
  const [inspiration, setInspiration] = useState({ quote: "", author: "" });
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Get a random inspiration
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    setInspiration(inspirations[randomIndex]);
    setFadeIn(true);
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="spiritual-card text-center transition-opacity duration-1000 ease-in-out">
        <h2 className="font-sanskrit text-2xl md:text-3xl text-spiritual-brown mb-6">Daily Inspiration</h2>
        <div className="max-w-3xl mx-auto">
          <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl font-sanskrit text-spiritual-brown mb-4 italic">"{inspiration.quote}"</p>
            <p className="text-spiritual-brown/70">— {inspiration.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInspiration;
