import React from 'react';
// Safe Icons Imports
import { 
  FaBrain, FaGlobe, FaMobileAlt, FaShieldAlt, FaServer, FaChartLine, 
  FaDatabase, FaRobot, FaLayerGroup, FaNetworkWired 
} from 'react-icons/fa'; 

import { 
  SiNextdotjs, SiPython, SiReact, SiMongodb, SiMysql, SiFastapi, 
  SiDocker, SiKalilinux, SiExpo, SiAmazonwebservices, SiPandas, 
  SiNumpy, SiScikitlearn, SiTensorflow, SiPytorch, SiLangchain,
  SiOpenai // Ye usually safe hai, agar error aye to isko bhi hata dena
} from 'react-icons/si';

export const servicesData = [
  {
    id: "ai-gen",
    title: "Artificial Intelligence & Automation",
    subtitle: "Generative AI • RAG • Agents",
    icon: <FaBrain />,
    // Pinecone ki jagah Database icon use kiya hai jo safe hai
    techIcons: [<SiPython />, <SiFastapi />, <SiLangchain />, <FaDatabase />], 
    shortDesc: "End-to-end AI Agents, RAG Pipelines, and Automation utilizing Python, Vector DBs, and MongoDB.",
    
    blogContent: [
      {
        heading: "The Age of Autonomous Intelligence",
        text: "We don’t wrap APIs. We build intelligence. We architect intelligent ecosystems. In the modern era, businesses need AI that understands their data, not just general knowledge. We specialize in building Retrieval-Augmented Generation (RAG) pipelines that allow LLMs to talk to your proprietary documents, databases, and emails without hallucinations."
      },
      {
        heading: "Our AI Tech Stack & Architecture",
        text: "Our engineering core is built on **Python** and **FastAPI** for high-performance inference. For memory and context, we utilize **Vector Databases** (Pinecone/ChromaDB). Crucially, we integrate **MongoDB** as our primary operational database to store massive amounts of unstructured conversation history, user sessions, and agent metadata, ensuring your AI remembers every interaction."
      },
      {
        heading: "What We Build",
        text: "From AI-powered support systems that automate the majority of customer queries to autonomous research agents that analyze the web and produce actionable reports, we deliver end-to-end solutions. Leveraging LangChain and LlamaIndex, we design robust workflows where AI can execute code, query SQL databases, and interact with enterprise software through APIs."
      },
      {
        heading: "Enterprise Automation",
        text: "Beyond text generation, we automate entire business workflows. Using tools like **Selenium** and custom Python scripts, we build AI agents that can log into portals, scrape data, fill forms, and generate invoices automatically."
      }
    ],

    features: [
      "Custom RAG Pipelines (LangChain)",
      "Vector Search Integration",
      "Operational AI Data in MongoDB",
      "LLM Fine-Tuning & Deployment",
      "Autonomous Agents",
      "Voice AI & Audio Processing",
      "Computer Vision Integration"
    ],
    tech: ["Python", "FastAPI", "MongoDB", "LangChain", "Pinecone", "OpenAI", "Llama 3", "Docker"],
    color: "purple",
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    id: "web-dev",
    title: "Full Stack Web Engineering",
    subtitle: "MERN • Next.js • SQL",
    icon: <FaGlobe />,
    techIcons: [<SiNextdotjs />, <SiReact />, <SiMysql />, <SiMongodb />],
    shortDesc: "Enterprise-grade scalable platforms using Next.js, MERN Stack, and Relational Data structures.",
    
    blogContent: [
      {
        heading: "Engineering for Scale",
        text: "A website is your digital headquarters. We don't use templates we engineer custom platforms designed to handle millions of requests. Our expertise lies in the **MERN Stack (MongoDB, Express, React, Node.js)** for flexibility and **Next.js** for superior SEO and Server-Side Rendering (SSR)."
      },
      {
        heading: "Database Mastery: SQL & NoSQL",
        text: "One size does not fit all. For transactional data like payments and inventory, we utilize **MySQL** to ensure data integrity. For unstructured data like logs and AI context, we leverage **MongoDB**. Our architectures often use a hybrid approach to get the best of both worlds."
      },
      {
        heading: "Performance First",
        text: "We obsess over Core Web Vitals. By implementing caching strategies, lazy loading, and edge computing, we ensure your application loads in milliseconds, not seconds."
      }
    ],

    features: [
      "Server-Side Rendering (Next.js)",
      "Hybrid Database Arch (MySQL + MongoDB)",
      "Real-time Sockets (Socket.io)",
      "Microservices & Docker",
      "Advanced State Management (Redux)",
      "Secure Authentication (OAuth/JWT)"
    ],
    tech: ["Next.js", "React.js", "Node.js", "MySQL", "MongoDB", "Redis", "AWS", "Tailwind CSS"],
    color: "cyan",
    gradient: "from-cyan-600 to-blue-600"
  },
  {
    id: "mobile-app",
    title: "Native Mobile Applications",
    subtitle: "React Native Ecosystem",
    icon: <FaMobileAlt />,
    techIcons: [<SiReact />, <SiExpo />, <FaMobileAlt />],
    shortDesc: "Pure React Native development for buttery smooth iOS and Android experiences.",
    
    blogContent: [
      {
        heading: "One Codebase, Native Performance",
        text: "We believe in the efficiency of **React Native**. Why build twice when you can build once and deploy everywhere? We focus exclusively on React Native to deliver applications that look and feel 100% native on both iOS and Android. We utilize the **Expo** ecosystem for rapid development and Over-The-Air (OTA) updates."
      },
      {
        heading: "Fluid Animations & UI",
        text: "A great app isn't just functional it's beautiful. We use **React Native Reanimated** to create 60FPS animations and buttery smooth gestures. Our apps don't lag. They respond instantly to user touch, providing a premium feel."
      },
      {
        heading: "Deep Device Integration",
        text: "We push React Native to its limits. From accessing the camera and GPS to integrating complex Bluetooth devices, we handle deep native modules. We ensure your app works flawlessly offline, syncing data with the cloud once connectivity is restored."
      }
    ],

    features: [
      "Cross-Platform (iOS & Android)",
      "Offline-First Architecture",
      "60FPS Animations (Reanimated)",
      "Deep Native Module Integration",
      "OTA Updates via Expo",
      "Real-time Chat & Notifications"
    ],
    tech: ["React Native", "Expo", "NativeWind", "TypeScript", "Redux", "Firebase", "Realm"],
    color: "emerald",
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    id: "cyber-security",
    title: "Cyber Security & Audits",
    subtitle: "Offensive Security",
    icon: <FaShieldAlt />,
    techIcons: [<SiKalilinux />, <FaShieldAlt />, <SiPython />],
    shortDesc: "Advanced Penetration Testing and Security Audits using Kali Linux.",
    
    blogContent: [
      {
        heading: "The Red Team Approach",
        text: "Security is not a product it's a process. Our offensive security team acts as the 'Red Team' for your business. We don't just scan for bugs we actively try to break into your systems using **Kali Linux** and custom **Python scripts**. We think like hackers so we can stop them."
      },
      {
        heading: "VAPT & Compliance",
        text: "We perform rigorous **Vulnerability Assessment and Penetration Testing (VAPT)** on your web applications, mobile apps, and network infrastructure. We identify SQL Injections, XSS flaws, and weak authentication protocols before they become headlines."
      },
      {
        heading: "Secure by Design",
        text: "We don't just find bugs we help you fix them. We conduct secure code reviews and help your developers implement best practices in authentication, encryption, and API security."
      }
    ],

    features: [
      "Vulnerability Assessment (VAPT)",
      "Web & Mobile App Penetration Testing",
      "Secure Code Review",
      "Network Security Hardening",
      "Automated Security Scripting",
      "Phishing Simulation"
    ],
    tech: ["Kali Linux", "Burp Suite", "Metasploit", "Wireshark", "Python", "Nmap", "OWASP"],
    color: "red",
    gradient: "from-red-600 to-rose-600"
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Automation",
    subtitle: "AWS & Docker",
    icon: <FaServer />,
    techIcons: [<SiDocker />, <SiAmazonwebservices />, <FaServer />],
    shortDesc: "Zero-downtime deployment pipelines and scalable cloud architecture.",
    
    blogContent: [
      {
        heading: "Infrastructure as Code",
        text: "Manual server setup is a recipe for disaster. We treat infrastructure as code. Using **Docker** for containerization and **Kubernetes** for orchestration, we ensure your application runs identically in development, staging, and production environments."
      },
      {
        heading: "The AWS Cloud Advantage",
        text: "We design resilient cloud architectures on **AWS**. From setting up EC2 instances and RDS databases to configuring S3 buckets and CloudFront CDNs, we optimize for both performance and cost. We implement auto-scaling groups so your server capacity grows with your traffic."
      },
      {
        heading: "CI/CD Automation",
        text: "We automate the boring stuff. Our **CI/CD pipelines** automatically test, build, and deploy your code every time you push to the repository. This ensures zero-downtime deployments and allows your team to ship features faster."
      }
    ],

    features: [
      "Docker Containerization",
      "CI/CD Pipeline Automation",
      "AWS Cloud Architecture",
      "Serverless Computing (Lambda)",
      "Infrastructure as Code",
      "Load Balancing & Auto-Scaling"
    ],
    tech: ["AWS", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Nginx", "Terraform"],
    color: "orange",
    gradient: "from-orange-600 to-amber-600"
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    subtitle: "Insight Engineering",
    icon: <FaChartLine />,
    techIcons: [<SiPython />, <SiPandas />, <FaChartLine />],
    shortDesc: "Turning raw data into predictive insights using Python and ML models.",
    
    blogContent: [
      {
        heading: "From Noise to Signal",
        text: "Data is the new oil, but only if you can refine it. We use **Python**, **Pandas**, and **NumPy** to ingest, clean, and structure massive datasets. We turn messy, unstructured data lakes into clean, queryable data warehouses."
      },
      {
        heading: "Predictive Intelligence",
        text: "History tells you what happened we tell you what *will* happen. Using advanced Machine Learning models (**Scikit-Learn**, **TensorFlow**), we build predictive engines that forecast sales, detect churn, and optimize inventory."
      },
      {
        heading: "Visual Storytelling",
        text: "Data is useless if you can't understand it. We build interactive dashboards using **PowerBI** or custom React charts that allow stakeholders to visualize trends, track KPIs, and make data-driven decisions in real-time."
      }
    ],

    features: [
      "Predictive Modeling & ML",
      "Big Data Cleaning & ETL",
      "Computer Vision Models",
      "Statistical Analysis",
      "Business Intelligence Dashboards",
      "Automated Reporting"
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "PowerBI", "Jupyter"],
    color: "blue",
    gradient: "from-blue-600 to-sky-600"
  }
];