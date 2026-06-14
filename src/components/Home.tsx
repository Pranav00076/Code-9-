import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import CareerPath from './CareerPath';
import ChallengeArena from './ChallengeArena';
import Testimonials from './Testimonials';
import JoinCTA from './JoinCTA';

interface HomeProps {
  isDark: boolean;
}

export default function Home({ isDark }: HomeProps) {
  return (
    <div className="flex flex-col">
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Services isDark={isDark} />
      <CareerPath isDark={isDark} />
      <ChallengeArena isDark={isDark} />
      <Testimonials isDark={isDark} />
      <JoinCTA isDark={isDark} />
    </div>
  );
}
