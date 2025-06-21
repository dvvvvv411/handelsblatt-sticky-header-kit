
interface TestArticleContent {
  title: string;
  subtitle: string;
  author: string;
  category: string;
  heroImageUrl: string;
  heroImageCaption: string;
  content: Array<{
    title: string;
    text: string;
  }>;
}

const sampleTitles = [
  "The Future of Cryptocurrency in Global Markets",
  "How Blockchain Technology is Revolutionizing Finance",
  "Digital Assets: A New Era of Investment",
  "Understanding DeFi: Decentralized Finance Explained",
  "The Rise of NFTs in the Digital Economy"
];

const sampleSubtitles = [
  "An in-depth analysis of market trends and future predictions",
  "Exploring the transformative power of distributed ledger technology",
  "What investors need to know about the digital asset revolution",
  "A comprehensive guide to decentralized financial systems",
  "How non-fungible tokens are changing ownership and value"
];

const sampleAuthors = [
  "Dr. Sarah Mueller",
  "Michael Schneider",
  "Prof. Anna Weber",
  "Thomas Becker",
  "Lisa Hoffmann"
];

const sampleCategories = [
  "Krypto",
  "Blockchain",
  "Fintech",
  "Digital Assets",
  "Technology"
];

const sampleImageUrls = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1642104704074-c72b3d0bb32a?w=800&h=600&fit=crop"
];

const sampleImageCaptions = [
  "Cryptocurrency trading visualization on digital display",
  "Blockchain network representation with connected nodes",
  "Digital finance dashboard showing market data",
  "Modern financial technology interface",
  "Cryptocurrency symbols and market charts"
];

const sampleContentSections = [
  {
    title: "Market Overview",
    text: "The cryptocurrency market has experienced unprecedented growth over the past year, with institutional adoption driving significant price movements. Major corporations and financial institutions are increasingly recognizing digital assets as legitimate investment vehicles, leading to enhanced market stability and regulatory clarity."
  },
  {
    title: "Technology Developments",
    text: "Recent technological advancements in blockchain infrastructure have improved transaction speeds and reduced costs significantly. Layer 2 solutions and proof-of-stake consensus mechanisms are paving the way for more sustainable and efficient cryptocurrency networks."
  },
  {
    title: "Regulatory Landscape",
    text: "Governments worldwide are working to establish comprehensive regulatory frameworks for digital assets. These developments are crucial for long-term market stability and investor protection, while balancing innovation with consumer safety."
  },
  {
    title: "Investment Implications",
    text: "For investors, the evolving cryptocurrency landscape presents both opportunities and challenges. Portfolio diversification strategies now commonly include digital assets, but proper risk management and thorough research remain essential for successful investment outcomes."
  }
];

export const generateTestContent = (): TestArticleContent => {
  const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);
  
  return {
    title: sampleTitles[randomIndex(sampleTitles)],
    subtitle: sampleSubtitles[randomIndex(sampleSubtitles)],
    author: sampleAuthors[randomIndex(sampleAuthors)],
    category: sampleCategories[randomIndex(sampleCategories)],
    heroImageUrl: sampleImageUrls[randomIndex(sampleImageUrls)],
    heroImageCaption: sampleImageCaptions[randomIndex(sampleImageCaptions)],
    content: [
      sampleContentSections[randomIndex(sampleContentSections)],
      sampleContentSections[randomIndex(sampleContentSections)],
      sampleContentSections[randomIndex(sampleContentSections)]
    ].filter((section, index, arr) => 
      arr.findIndex(s => s.title === section.title) === index
    )
  };
};

export const generateTestImage = (): string => {
  const randomIndex = Math.floor(Math.random() * sampleImageUrls.length);
  return sampleImageUrls[randomIndex];
};
