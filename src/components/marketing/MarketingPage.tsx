'use client';

import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { PricingSection } from './PricingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

interface MarketingPageProps {
  onLogin: () => void;
  onSignup: () => void;
  onGetStarted: () => void;
}

export function MarketingPage({
  onLogin,
  onSignup,
  onGetStarted,
}: MarketingPageProps) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar
        onLogin={onLogin}
        onSignup={onSignup}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <main>
        <HeroSection onGetStarted={onGetStarted} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection onSelectPlan={(plan) => onGetStarted()} />
        <CTASection onGetStarted={onGetStarted} />
      </main>

      <Footer />
    </div>
  );
}
