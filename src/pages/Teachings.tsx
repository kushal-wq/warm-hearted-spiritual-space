
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, User, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TeachingsAPI, Teaching } from '@/api/supabaseUtils';

// In a real app, this would fetch from Supabase
const fetchTeachings = async (): Promise<Teaching[]> => {
  const teachings = await TeachingsAPI.getAll();
  
  // If no data from Supabase, use mock data
  if (teachings.length === 0) {
    // Mock data - in a real application, this would come from Supabase
    return [
      {
        id: "1",
        title: "Understanding the Bhagavad Gita",
        author: "Swami Krishnananda",
        date: "2023-06-15",
        description: "An exploration of the timeless wisdom contained in the Bhagavad Gita and its relevance to modern life.",
        category: "Scripture",
        imageUrl: "/placeholder.svg",
        content: `
          <p>The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is structured as a dialogue between Prince Arjuna and his guide and charioteer Krishna.</p>
          
          <h2>Core Teachings</h2>
          <p>The Bhagavad Gita presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic ideals of moksha. The text covers a broad range of spiritual topics, touching upon ethical dilemmas and philosophical issues.</p>
          
          <p>Krishna counsels Arjuna to "fulfill his Kshatriya (warrior) duty to uphold the Dharma" through "selfless action". Krishna's advice – in which he explains paths to devotion, knowledge, and selfless action – has been interpreted as a guide for living a spiritual life.</p>
          
          <h2>Modern Relevance</h2>
          <p>The teachings of the Gita remain highly relevant in today's fast-paced world. Its message about performing one's duty without attachment to results provides a framework for ethical decision-making in professional and personal contexts.</p>
          
          <p>Similarly, its emphasis on self-knowledge and self-mastery offers guidance for personal development and spiritual growth in an age of distraction and materialism.</p>
          
          <h2>Conclusion</h2>
          <p>The Bhagavad Gita's enduring appeal lies in its ability to address the fundamental questions of human existence while providing practical guidance for daily life. By studying and applying its teachings, one can gain insights into the nature of reality, duty, and the path to liberation.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        title: "The Practice of Meditation",
        author: "Guru Ramdev",
        date: "2023-07-22",
        description: "A comprehensive guide to meditation techniques for spiritual growth and inner peace.",
        category: "Practices",
        imageUrl: "/placeholder.svg",
        content: `
          <p>Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.</p>
          
          <h2>Benefits of Regular Meditation</h2>
          <p>Scientific research has shown that regular meditation can reduce stress, control anxiety, promote emotional health, enhance self-awareness, lengthen attention span, and may even reduce age-related memory loss.</p>
          
          <p>On a spiritual level, meditation helps in connecting with one's inner self, developing compassion, and achieving higher states of consciousness.</p>
          
          <h2>Types of Meditation</h2>
          <p>There are many types of meditation practices:</p>
          <ul>
            <li><strong>Mindfulness meditation</strong>: Originates from Buddhist teachings and involves paying attention to thoughts as they pass through your mind.</li>
            <li><strong>Spiritual meditation</strong>: Used in Eastern religions and Western Christian traditions, and focuses on deepening the connection with the divine.</li>
            <li><strong>Focused meditation</strong>: Involves concentration using any of the five senses.</li>
            <li><strong>Movement meditation</strong>: Includes walking through the woods, gardening, or other gentle forms of motion.</li>
            <li><strong>Mantra meditation</strong>: Uses a repetitive sound to clear the mind, such as "Om."</li>
          </ul>
          
          <h2>Getting Started</h2>
          <p>If you're new to meditation, start with just a few minutes daily and gradually increase the duration. Find a quiet space, sit comfortably, focus on your breath, and gently bring your attention back whenever it wanders.</p>
          
          <p>Remember, meditation is a skill that improves with practice. Be patient with yourself and enjoy the journey toward inner peace and spiritual growth.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "3",
        title: "Karma Yoga: The Path of Action",
        author: "Swami Vivekananda",
        date: "2023-08-10",
        description: "Exploring the spiritual discipline of selfless action and service to others.",
        category: "Philosophy",
        imageUrl: "/placeholder.svg",
        content: `
          <p>Karma Yoga is one of the four classical paths of yoga described in Hindu philosophy. It is the path of action dedicated to the divine, performed without any expectation of results or attachment to the fruits of one's actions.</p>
          
          <h2>The Philosophy of Karma Yoga</h2>
          <p>The central tenet of Karma Yoga is that our actions should be performed with the right attitude – selflessly, without ego involvement, and with full awareness. When actions are performed in this way, they do not create karmic bondage and can lead to spiritual liberation.</p>
          
          <p>Lord Krishna explains in the Bhagavad Gita: "You have the right to work, but never to the fruit of work. You should never engage in action for the sake of reward, nor should you long for inaction."</p>
          
          <h2>Practices of Karma Yoga</h2>
          <p>Karma Yoga can be practiced in everyday life through:</p>
          <ul>
            <li><strong>Selfless service (Seva)</strong>: Helping others without expecting anything in return</li>
            <li><strong>Duty (Dharma)</strong>: Fulfilling one's responsibilities with dedication and integrity</li>
            <li><strong>Sacrifice (Yajna)</strong>: Offering actions as sacrifices to the divine</li>
          </ul>
          
          <h2>Benefits of Karma Yoga</h2>
          <p>Practicing Karma Yoga purifies the mind, reduces ego, develops detachment, and cultivates equanimity in success and failure. It helps us act with wisdom and compassion, gradually transforming ordinary actions into spiritual practice.</p>
          
          <p>In today's world, where action often stems from selfish motives, Karma Yoga offers a pathway to meaningful living through selfless service and dedication to the greater good.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "4",
        title: "The Sacred Meaning of Om",
        author: "Yogi Bhajan",
        date: "2023-09-05",
        description: "Diving deep into the cosmic sound and its spiritual significance across various traditions.",
        category: "Symbolism",
        imageUrl: "/placeholder.svg",
        content: `
          <p>Om (or Aum) is a sacred sound and a spiritual symbol in Indian religions. It signifies the essence of the ultimate reality, consciousness, or Atman. The sound is often chanted at the beginning and end of Hindu prayers, chants, and meditation.</p>
          
          <h2>The Components of Om</h2>
          <p>The sound Om is composed of three syllables: A, U, and M, which represent various fundamental triads:</p>
          <ul>
            <li>The three worlds: earth, atmosphere, and heaven</li>
            <li>The three major Hindu gods: Brahma (creator), Vishnu (preserver), and Shiva (destroyer)</li>
            <li>The three states of consciousness: waking, dreaming, and deep sleep</li>
          </ul>
          
          <p>The silence that follows the sound represents the fourth state of consciousness, Turiya, which is the ultimate state of bliss and non-duality.</p>
          
          <h2>Om Across Traditions</h2>
          <p>Om is important in multiple Indian religions:</p>
          <ul>
            <li>In Hinduism, it is placed at the beginning of most sacred texts and is used in prayer and meditation.</li>
            <li>In Buddhism, Om is often the first syllable in mantras such as Om Mani Padme Hum.</li>
            <li>In Jainism, Om is considered a condensed form of reference to the Pañca-Parameṣṭhi (five supreme beings).</li>
          </ul>
          
          <h2>Chanting Om</h2>
          <p>When chanted, Om creates a vibration that is thought to align with the natural vibration of the universe. Regular chanting can help calm the mind, reduce stress, increase concentration, and connect with one's higher self.</p>
          
          <p>To chant Om effectively, sit in a comfortable position, close your eyes, take a deep breath, and on the exhale, produce the sound starting from the navel and moving upward. The sound should naturally progress from "Aaaaa" to "Uuuuu" to "Mmmmm," followed by silence.</p>
          
          <p>Through this sacred sound, practitioners seek to connect with the divine essence that permeates all existence.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "5",
        title: "Dharma in Daily Life",
        author: "Sadhguru",
        date: "2023-10-18",
        description: "Practical wisdom on how to align with your purpose and live righteously in the modern world.",
        category: "Lifestyle",
        imageUrl: "/placeholder.svg",
        content: `
          <p>Dharma is a concept that encompasses duty, virtue, morality, and righteousness. It refers to the right way of living and the path of righteous conduct that upholds the natural order of the universe.</p>
          
          <h2>Understanding Your Personal Dharma</h2>
          <p>Each individual has a unique dharma based on their stage of life, personal abilities, and societal role. This is known as Sva-dharma (one's personal duty). Discovering and fulfilling one's dharma involves:</p>
          <ul>
            <li>Self-awareness and understanding of one's natural inclinations and talents</li>
            <li>Alignment with one's core values and principles</li>
            <li>Recognition of responsibilities to family, community, and society</li>
          </ul>
          
          <h2>Dharma in Everyday Decisions</h2>
          <p>Practicing dharma in daily life involves making choices that are:</p>
          <ul>
            <li><strong>Truthful</strong>: Adhering to honesty in all interactions</li>
            <li><strong>Compassionate</strong>: Considering the welfare of all beings</li>
            <li><strong>Non-harming</strong>: Minimizing harm to others and oneself</li>
            <li><strong>Balanced</strong>: Maintaining equilibrium between various aspects of life</li>
          </ul>
          
          <h2>Challenges in Modern Life</h2>
          <p>The fast-paced, materially oriented modern world presents unique challenges to dharmic living. These include:</p>
          <ul>
            <li>Competing priorities and time constraints</li>
            <li>Cultural messaging that emphasizes consumption and status</li>
            <li>Ethical dilemmas in professional settings</li>
          </ul>
          
          <h2>Practical Approaches</h2>
          <p>To integrate dharma into modern life, consider these approaches:</p>
          <ul>
            <li>Start each day with intention and mindfulness</li>
            <li>Regularly reflect on the rightness of your actions</li>
            <li>Cultivate awareness of how your choices affect others</li>
            <li>Simplify your life to align with your core values</li>
          </ul>
          
          <p>By aligning with dharma, we not only fulfill our purpose but also contribute to the harmony and wellbeing of the world around us.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "6",
        title: "The Power of Mantras",
        author: "Sri Sri Ravi Shankar",
        date: "2023-11-30",
        description: "Understanding the science behind sacred sounds and how they can transform consciousness.",
        category: "Practices",
        imageUrl: "/placeholder.svg",
        content: `
          <p>Mantras are sacred sounds, words, or phrases that are repeated during meditation or spiritual practices. They are believed to have psychological and spiritual powers, and their repetition is a central practice in many spiritual traditions.</p>
          
          <h2>The Science of Sound</h2>
          <p>Modern science is beginning to recognize what ancient traditions have known for millennia: sound has the power to affect our physical body, emotions, and consciousness. Each mantra creates a specific vibration that can:</p>
          <ul>
            <li>Alter brainwave patterns</li>
            <li>Activate specific energy centers in the body</li>
            <li>Create resonance with particular aspects of consciousness</li>
          </ul>
          
          <h2>Types of Mantras</h2>
          <p>There are several types of mantras used for different purposes:</p>
          <ul>
            <li><strong>Bija (seed) mantras</strong>: Single-syllable sounds that resonate with specific chakras or energies</li>
            <li><strong>Saguna mantras</strong>: Mantras addressed to specific deities or aspects of the divine</li>
            <li><strong>Nirguna mantras</strong>: Mantras that point to the formless, absolute reality</li>
            <li><strong>Protection mantras</strong>: Mantras used for spiritual protection and removing obstacles</li>
            <li><strong>Healing mantras</strong>: Mantras specifically for physical, emotional, or spiritual healing</li>
          </ul>
          
          <h2>Practicing Mantra Meditation</h2>
          <p>To practice mantra meditation effectively:</p>
          <ol>
            <li>Choose a mantra that resonates with you or is given by a teacher</li>
            <li>Find a quiet, comfortable space</li>
            <li>Sit with spine straight but relaxed</li>
            <li>Begin by focusing on your breath</li>
            <li>Start repeating the mantra mentally or softly out loud</li>
            <li>When the mind wanders, gently bring it back to the mantra</li>
            <li>Practice regularly, ideally at the same time each day</li>
          </ol>
          
          <h2>Benefits of Mantra Practice</h2>
          <p>Regular mantra practice can lead to:</p>
          <ul>
            <li>Increased focus and concentration</li>
            <li>Reduced stress and anxiety</li>
            <li>Enhanced self-awareness</li>
            <li>Deeper states of meditation</li>
            <li>Spiritual awakening and transformation</li>
          </ul>
          
          <p>Whether you're seeking spiritual growth, emotional balance, or mental clarity, the ancient practice of mantra repetition offers a powerful tool for transformation of consciousness.</p>
        `,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
  
  return teachings;
};

const Teachings = () => {
  const [selectedTeaching, setSelectedTeaching] = useState<Teaching | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data, isLoading } = useQuery<Teaching[]>({
    queryKey: ['teachings'],
    queryFn: () => fetchTeachings()
  });

  const handleReadTeaching = (teaching: Teaching) => {
    setSelectedTeaching(teaching);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-sanskrit text-spiritual-brown mb-4">Sacred Teachings</h1>
            <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
              Explore our collection of spiritual wisdom, ancient texts, and modern interpretations to guide your spiritual journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="h-96 bg-white/50 animate-pulse">
                  <div className="h-full"></div>
                </Card>
              ))
            ) : (
              data?.map((teaching) => (
                <Card key={teaching.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-video bg-spiritual-sand/30 relative">
                    <img 
                      src={teaching.imageUrl} 
                      alt={teaching.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-spiritual-gold/90 text-white text-xs px-2 py-1 rounded">
                      {teaching.category}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-sanskrit text-spiritual-brown">{teaching.title}</CardTitle>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <User className="h-4 w-4 mr-1" /> {teaching.author}
                    </CardDescription>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <Calendar className="h-4 w-4 mr-1" /> {new Date(teaching.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-spiritual-brown/80">{teaching.description}</p>
                  </CardContent>
                  
                  <div className="p-4 pt-0 mt-auto">
                    <Button 
                      className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90 text-white"
                      onClick={() => handleReadTeaching(teaching)}
                    >
                      <Book className="h-4 w-4 mr-2" /> Read Teaching
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Teaching Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-sanskrit text-spiritual-brown">
              {selectedTeaching?.title}
            </DialogTitle>
            <DialogDescription className="flex flex-col sm:flex-row sm:justify-between text-spiritual-brown/70">
              <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {selectedTeaching?.author}</span>
              <span className="flex items-center mt-1 sm:mt-0"><Calendar className="h-4 w-4 mr-1" /> {selectedTeaching && new Date(selectedTeaching.date).toLocaleDateString()}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <div className="bg-spiritual-sand/30 p-4 rounded-md">
              <div className="prose prose-sm sm:prose max-w-none text-spiritual-brown/80"
                dangerouslySetInnerHTML={{ __html: selectedTeaching?.content || '' }}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teachings;
