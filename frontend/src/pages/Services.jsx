import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import SkillsMatrix from '../components/home/SkillsMatrix';

const Services = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* 1. HERO SLIDER */}
      {/* Reduced Top Padding: pt-20 (Mobile) just enough for navbar */}
      <div className="pt-20 md:pt-28">
        <HeroSlider />
      </div>
      
      {/* 2. SKILLS MATRIX */}
      {/* Compact Padding: py-6 (Mobile) | py-24 (Desktop) */}
      <div className="py-6 md:py-24 px-4 md:px-0">
        <SkillsMatrix />
      </div>

    </div>
  );
};

export default Services;