
import React, { useState, useEffect } from 'react';

const inspirations = [
  {
    quote: "The Self is everywhere. Bright is the Self, indivisible, untouched by sin, wise, immanent and transcendent.",
    author: "Isha Upanishad"
  },
  {
    quote: "Knowledge is structured in consciousness. The process of education takes place in the field of consciousness.",
    author: "Maharishi Mahesh Yogi"
  },
  {
    quote: "When you surrender to what is and so become fully present, the past ceases to have any power.",
    author: "Sri Sri Ravi Shankar"
  },
  {
    quote: "Undisturbed calmness of mind is attained by cultivating friendliness toward the happy, compassion for the unhappy, delight in the virtuous, and indifference toward the wicked.",
    author: "Patanjali"
  },
  {
    quote: "The day you decide that you are more interested in being aware of your thoughts than in the thoughts themselves—that is the day you will find your way out.",
    author: "Sadhguru"
  },
  {
    quote: "Like oil is present in every piece of sesame, divinity is present in every soul.",
    author: "Hindu Proverb"
  },
  {
    quote: "True happiness comes not when we get rid of all of our problems, but when we change our relationship to them.",
    author: "Swami Vivekananda"
  },
  {
    quote: "To realize the Self is to be still.",
    author: "Ramana Maharshi"
  },
  {
    quote: "Life is a difficult challenge for most of us. It becomes more challenging when we are constantly transformed by our own thoughts.",
    author: "Sri Chinmoy"
  },
  {
    quote: "Karmanyevadhikaraste Ma Phaleshu Kadachana" (You have the right to work only, but never to its fruits)",
    author: "Bhagavad Gita"
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
      <div className="indian-card p-8 text-center transition-opacity duration-1000 ease-in-out relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 h-16 w-16 opacity-10">
          <img 
            src="https://cdn.pixabay.com/photo/2017/10/10/07/48/om-2836755_960_720.png" 
            alt="Om symbol" 
            className="w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 right-0 h-16 w-16 opacity-10">
          <img 
            src="https://cdn.pixabay.com/photo/2017/10/10/07/48/om-2836755_960_720.png" 
            alt="Om symbol" 
            className="w-full h-full"
          />
        </div>
      
        <h2 className="font-sanskrit text-2xl md:text-3xl text-foreground mb-2">Today's Wisdom</h2>
        <div className="mehndi-divider mx-auto max-w-xs mb-6"></div>
        <div className="max-w-3xl mx-auto">
          <div className={`transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl font-sanskrit text-foreground mb-4 italic">"‍{inspiration.quote}"</p>
            <p className="text-muted-foreground">— {inspiration.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyInspiration;
