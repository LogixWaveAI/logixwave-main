const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("./models/Project");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const projects = [
  {
    title: "Uber Clone App",
    category: "Mobile App",
    client: "Personal Project",
    duration: "6 Weeks",
    role: "Full Stack Developer",

    // REQUIRED
    thumbnail:
      "https://placehold.co/600x400/1e293b/06b6d4?text=Uber+Clone",

    // Gallery (Images + Videos)
    media: [
      {
        url: "https://placehold.co/800x500/1e293b/06b6d4?text=Ride+Booking+Screen",
        type: "image",
      },
      {
        url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
        type: "video",
      },
    ],

    description:
      "A full-stack ride booking mobile application with real-time driver tracking and payments.",
    challenge:
      "Maintaining real-time driver updates with minimal battery consumption.",
    solution:
      "Used Socket.io with Redis-based pub/sub architecture.",

    techStack: [
      "React Native",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Google Maps API",
    ],
    features: [
      "Live Driver Tracking",
      "Ride Matching Algorithm",
      "Fare Calculation",
      "Wallet Integration",
    ],

    stats: [
      { label: "Architecture", value: "Microservices" },
      { label: "Realtime", value: "Socket.io" },
      { label: "Maps", value: "Google API" },
    ],

    github: "https://github.com/yourusername/uber-clone",
    live: "https://uber-clone-demo.com",
  },

  {
    title: "AI Teaching Assistant",
    category: "AI & Data",
    client: "R&D Project",
    duration: "4 Weeks",
    role: "AI Engineer",

    thumbnail:
      "https://placehold.co/600x400/1e293b/8b5cf6?text=AI+Assistant",

    media: [
      {
        url: "https://placehold.co/800x500/1e293b/8b5cf6?text=RAG+Pipeline",
        type: "image",
      },
    ],

    description:
      "RAG-based AI assistant that answers questions using course content.",
    challenge:
      "Avoiding hallucinations while generating responses from LLMs.",
    solution:
      "Implemented strict retrieval pipeline using LangChain and vector DB.",

    techStack: [
      "Python",
      "LangChain",
      "OpenAI",
      "Pinecone",
      "React.js",
    ],
    features: [
      "Context-Aware Q&A",
      "Document Ingestion",
      "Quiz Generator",
      "Multi-language Support",
    ],

    stats: [
      { label: "Model", value: "GPT-4" },
      { label: "Technique", value: "RAG" },
      { label: "Vector DB", value: "Pinecone" },
    ],

    github: "https://github.com/yourusername/ai-teaching-assistant",
    live: "https://ai-assistant-demo.com",
  },

  {
    title: "E-commerce Platform",
    category: "Web Dev",
    duration: "8 Weeks",
    role: "Full Stack Developer",

    thumbnail:
      "https://placehold.co/600x400/1e293b/10b981?text=E-commerce",

    media: [
      {
        url: "https://placehold.co/800x500/1e293b/10b981?text=Admin+Dashboard",
        type: "image",
      },
      {
        url: "https://placehold.co/800x500/1e293b/10b981?text=Checkout+Page",
        type: "image",
      },
    ],

    description:
      "A scalable e-commerce web application with admin dashboard and payments.",
    challenge:
      "Handling inventory sync and cart state across users.",
    solution:
      "Used Redux Toolkit and optimistic UI updates.",

    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Stripe",
    ],
    features: [
      "Admin Dashboard",
      "Inventory Management",
      "Secure Checkout",
      "Order Tracking",
    ],

    stats: [
      { label: "Auth", value: "JWT" },
      { label: "Payments", value: "Stripe" },
      { label: "Stack", value: "MERN" },
    ],

    github: "https://github.com/yourusername/ecommerce-platform",
    live: "https://shop-demo.com",
  },
];

const importData = async () => {
  try {
    await Project.deleteMany();
    await Project.insertMany(projects);

    console.log("✅ Projects Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
};

importData();
