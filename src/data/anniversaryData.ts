/**
 * Centralized content configuration for Kunja & Chittapan's 21st Wedding Anniversary Surprise.
 * Easy to customize, edit messages, add new photos, or adjust milestone years.
 */

export interface Milestone {
  id: string;
  year: number | string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  note?: string;
  location?: string;
  tags?: string[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  year?: string;
  rotation?: string;
}

export const ANNIVERSARY_CONFIG = {
  coupleNames: "Kunja & Chittapan",
  creatorName: "Chinnu",
  weddingYear: 2005,
  currentYear: 2026,
  yearsTogether: 21,
  anniversaryDate: "October 25, 2026",

  // Main featured photo for hero / card
  featuredPhoto: "/assets/aistudio/image_689f39c2.png",
  festivePhoto: "/assets/aistudio/image_85a0fd81.png",
  snowPhoto: "/assets/aistudio/image_abbbbb8f.png",
  mistPhoto: "/assets/aistudio/image_166e6a40.png",
  mallPhoto: "/assets/aistudio/image_61b14b69.png",
  christmasPhoto: "/assets/aistudio/image_9f8abae8.png",
  closeUpPhoto: "/assets/aistudio/image_fe3ffe66.png",

  // Milestones for the Storyline
  milestones: [
    {
      id: "m-2005",
      year: "2005",
      title: "That Unmistakable Spark",
      description: "Looking at them, there is a warmth that never dims. An effortless connection where conversations flow for hours, silences are never awkward, and simply sitting side by side feels like the easiest thing in the world.",
      image: "/assets/aistudio/image_fe3ffe66.png",
      imageAlt: "Kunja and Chittapan cozy smiling together",
      note: "That gentle glow and quiet understanding whenever they are near.",
      location: "Where It All Began",
      tags: ["ThatSpark", "Together", "Home"]
    },
    {
      id: "m-2010",
      year: "2010",
      title: "Building a World of Comfort & Care",
      description: "Through ordinary mornings, tea on the porch, spontaneous road trips, and everything life brought along. Learning each other's rhythms, celebrating small wins, and making every room brighter just by being in it.",
      image: "/assets/aistudio/image_166e6a40.png",
      imageAlt: "Kunja and Chittapan in misty hills",
      note: "Foggy mountain roads and a warm hand to hold.",
      location: "Misty Hills",
      tags: ["Adventures", "Warmth", "Care"]
    },
    {
      id: "m-2016",
      year: "2016",
      title: "Snowy Peaks & Unstoppable Laughter",
      description: "Bundled up in colorful winter gear, grinning ear to ear in the freezing snow. No matter how cold the winds get, their playful banter and shared warmth make every place feel cozy.",
      image: "/assets/aistudio/image_abbbbb8f.png",
      imageAlt: "Playful snow adventure in the mountains",
      note: "Never too grown up to laugh until your stomach hurts!",
      location: "Snow Peaks",
      tags: ["SnowDay", "Laughter", "Joy"]
    },
    {
      id: "m-2022",
      year: "2022",
      title: "Under Historic Arches & City Lights",
      description: "Standing proud in front of the Gateway of India, exploring bustling streets, taking in the sea breeze, and finding joy in every corner of the world together.",
      image: "/assets/images/regenerated_image_1792869904203.jpg",
      imageAlt: "Kunja and Chittapan at the Gateway of India",
      note: "Gateway of India — sharing stories, sights, and endless smiles.",
      location: "Mumbai & Beyond",
      tags: ["GatewayOfIndia", "Wanderlust", "Smiles"]
    },
    {
      id: "m-2024",
      year: "2024",
      title: "Holiday Lights & Everyday Sweetness",
      description: "From festive market stalls wrapped in fairy lights to quiet weekend strolls. It's the tight hugs, teasing smiles, and coffee breaks that turn ordinary days into cherished memories.",
      image: "/assets/aistudio/image_9f8abae8.png",
      imageAlt: "Christmas festive market embrace",
      note: "Fairy lights, chilly breezes, and the warmest hug.",
      location: "Holiday Market",
      tags: ["HolidayWarmth", "CozyMoments"]
    },
    {
      id: "m-2026",
      year: "2026",
      title: "21 Years — Still Laughing at the Same Jokes",
      description: "Twenty-one years of shared dreams, shared meals, inside jokes, and unwavering comfort. Looking back on thousands of memories, and looking forward with the exact same excitement.",
      image: "/assets/aistudio/image_689f39c2.png",
      imageAlt: "Kunja and Chittapan overlooking lush green hills",
      note: "Twenty-one years in, and their smiles are as radiant as ever.",
      location: "Scenic Viewpoint",
      tags: ["21Years", "EndlessJoy", "Forever"]
    }
  ] as Milestone[],

  // Full Gallery with scrapbook details
  gallery: [
    {
      id: "g1",
      src: "/assets/aistudio/image_689f39c2.png",
      title: "Scenic Horizons & Shared Smiles",
      caption: "High in the hills, hand in hand with the most beautiful smile.",
      year: "2024",
      rotation: "-rotate-2"
    },
    {
      id: "g2",
      src: "/assets/aistudio/image_85a0fd81.png",
      title: "Festive Elegance",
      caption: "Radiant in celebratory ethnic silks, glowing with love.",
      year: "2023",
      rotation: "rotate-2"
    },
    {
      id: "g3",
      src: "/assets/aistudio/image_9f8abae8.png",
      title: "Christmas Cheer & Cozy Hugs",
      caption: "The warmth of each other makes any chilly winter day joyful.",
      year: "2023",
      rotation: "-rotate-1"
    },
    {
      id: "g4",
      src: "/assets/aistudio/image_abbbbb8f.png",
      title: "Snow Day Shenanigans",
      caption: "Laughing out loud in thermal snowsuits on the mountain peak!",
      year: "2022",
      rotation: "rotate-3"
    },
    {
      id: "g5",
      src: "/assets/aistudio/image_61b14b69.png",
      title: "Casual Dates & Daily Happiness",
      caption: "The sweetest moments happen during simple everyday strolls.",
      year: "2023",
      rotation: "-rotate-2"
    },
    {
      id: "g6",
      src: "/assets/aistudio/image_166e6a40.png",
      title: "Misty Road Romance",
      caption: "Surrounded by mountain fog, their embrace is always home.",
      year: "2021",
      rotation: "rotate-1"
    },
    {
      id: "g7",
      src: "/assets/aistudio/image_fe3ffe66.png",
      title: "Gentle Morning Smiles",
      caption: "Comfortable in quiet moments and full of warmth.",
      year: "2025",
      rotation: "-rotate-1"
    }
  ] as GalleryPhoto[],

  // 21 messages for the 21 Hearts mini-game
  hearts21Messages: [
    "Year 1: For the spark that turned friendship into forever.",
    "Year 2: For learning each other's quiet thoughts.",
    "Year 3: For every silly inside joke no one else gets.",
    "Year 4: For every laugh you've shared over nothing at all.",
    "Year 5: For holding hands through every change and season.",
    "Year 6: For celebrating the little victories every single day.",
    "Year 7: For building a warm, welcoming sanctuary called home.",
    "Year 8: For every time you've stood beside each other without hesitation.",
    "Year 9: For all the road trips and spontaneous adventures.",
    "Year 10: For a decade of pure devotion and growing together.",
    "Year 11: For being best friends, through thick and thin, always.",
    "Year 12: For the comfort of knowing someone knows your whole heart.",
    "Year 13: For every warm cup of chai and late night chat.",
    "Year 14: For the patient wisdom you both bring into our lives.",
    "Year 15: For fifteen years of showing everyone what real partnership looks like.",
    "Year 16: For all the sweet family traditions you keep alive.",
    "Year 17: For laughing till your eyes crinkle with pure joy.",
    "Year 18: For the adventures still waiting on the open horizon.",
    "Year 19: For all the little things that make your love uniquely yours.",
    "Year 20: For two whole decades of inspiring everyone around you.",
    "Year 21: For 21 years of choosing each other, every single sunrise. ❤️"
  ],

  // Verbatim Letter from Chinnu
  letterParagraphs: [
    "My dearest Kunja and Chittapan,",
    "Happy 21st Wedding Anniversary! ❤️",
    "If there's one couple I'll always look at and think, ‘This is what love should feel like,’ it's you two.",
    "From starting out as friends to becoming partners for life, you've built something so beautiful. Twenty-one years of sharing a life, growing together, making memories, and being there for each other — and somehow, your story still feels like it's just getting started.",
    "You both are, without a doubt, one of my favourite couples in the whole world. And I hope you know how special that is to me.",
    "I hope you never stop being best friends. I hope you keep laughing at the silliest things, teasing each other over absolutely nothing, holding hands through every season of life, and finding new reasons to fall in love with each other.",
    "And most importantly, I hope you grow young together. May your years keep adding wisdom to your hearts, mischief to your smiles, sparkle to your eyes, and more beautiful memories than you can count.",
    "Thank you for being you, for sharing your love with the people around you, and for giving me a love story that I get to celebrate.",
    "If I could wish one thing for you both, it would be this: may the years ahead be even kinder, happier, funnier, and more beautiful than the years behind you.",
    "Here's to 21 years of love, a lifetime of friendship, and a million more little moments that make life special.",
    "I love you both so much.",
    "Happy Anniversary, my favourite couple. ❤️",
    "Forever cheering for your love story,",
    "Your Chinnu ♡"
  ],

  secretMessage: "Psst… I told you this was made with love. But I don't think you know just how much. Thank you for being such a special part of my world. Here's to many more years of love, laughter, and memories together. ❤️ — Chinnu"
};
