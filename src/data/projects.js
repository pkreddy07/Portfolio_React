import luminaiImg from '../assets/images/project-luminai.png';
import cexplainImg from '../assets/images/project-cexplain.png';
import hungryImg from '../assets/images/project-hungry.png';

const projects = [
  {
    id: 'luminai',
    title: 'lumin.ai',
    image: luminaiImg,
    description:
      'Lumin.ai is an AI-powered interview platform, with underlying multi-modal RAG system that automates the initial screening process through real-time conversational interviews. It uses an AI avatar to conduct context-aware interviews based on job descriptions, evaluates candidates across communication, confidence, body language, and technical relevance, and generates detailed reports with hiring recommendations. The platform also includes face verification to prevent duplicate interview attempts and an admin dashboard for managing job postings, monitoring candidates, and reviewing interview recordings.',
    tech: [
      { name: 'HTML', dot: '#e34c26' },
      { name: 'CSS', dot: '#563d7c' },
      { name: 'JavaScript', dot: '#f7df1e' },
      { name: 'Python', dot: '#3572a5' },
    ],
    link: 'https://github.com/pkreddy07/LuminAI',
  },
  {
    id: 'cexplain',
    title: 'CEXPLAIN',
    image: cexplainImg,
    description:
      'CEXPLAIN is a developer productivity tool designed to bridge the gap between cryptic C++ compiler errors and actionable fixes. Unlike standard compilers that provide raw stderr diagnostics, CEXPLAIN utilizes a triple-layered architecture — combining Static Analysis (AST), a Rule-Based Expert System, and a Transformer-based NLP model — to provide personalized, one-line remediations.',
    tech: [{ name: 'Python', dot: '#3572a5' }],
    link: 'https://github.com/pkreddy07/CEXPLAIN',
  },
  {
    id: 'hungry',
    title: 'Hungry',
    image: hungryImg,
    description:
      'A voice-controlled AI assistant that allows users to order food from Swiggy through natural conversations. The assistant understands spoken requests, searches restaurants and menus using Swiggy MCP, adds items to the cart, and places orders, providing a hands-free and seamless food ordering experience.',
    tech: [{ name: 'Python', dot: '#3572a5' }],
    link: 'https://github.com/pkreddy07/Hungry',
  },
];

export default projects;
