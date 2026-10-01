import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import NoticeBar from './components/NoticeBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import ScopeCalculator from './components/ScopeCalculator';
import PricingTiers from './components/PricingTiers';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import LeadIntakeForm from './components/LeadIntakeForm';
import AdminDrawer from './components/AdminDrawer';
import Footer from './components/Footer';

import './styles/tokens.css';
import './styles/style.css';
import './styles/components.css';

export default function App() {
  const [currency, setCurrency] = useState('INR');
  const [prefillData, setPrefillData] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // When user locks in scope calculator configuration
  const handleLockScope = (config) => {
    setPrefillData({
      projectType: config.typeName.includes('SaaS')
        ? 'SaaS MVP'
        : config.typeName.includes('E-Commerce')
        ? 'E-Commerce'
        : config.typeName.includes('Redesign')
        ? 'Website Redesign'
        : 'Headless CMS',
      budget: config.formattedAmount,
      brief: `[Pre-configured from Scope Calculator]\nProject Type: ${config.typeName}\nTarget Scope: ${config.pages} Pages\nEstimated Investment: ${config.formattedAmount}\nAdd-ons: ${config.addonLabels.join(', ') || 'Standard Fast Delivery'}\nTimeline: ${config.timeline}\n\nOur Project Details:\n`
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user chooses a tier from PricingTiers
  const handleSelectTier = (tierName, priceStr) => {
    setPrefillData({
      projectType: tierName.includes('SaaS') ? 'SaaS MVP' : 'Headless CMS',
      budget: priceStr,
      brief: `Interested in selecting the ${tierName} package (${priceStr}).\nOur project timeline and requirements:\n`
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks "Start a Similar Project" from a Case Study modal
  const handleSelectSimilarProject = (projectTitle) => {
    setPrefillData({
      projectType: projectTitle.includes('SaaS') ? 'SaaS MVP' : 'Headless CMS',
      budget: 'Flexible',
      brief: `Interested in building a digital flagship similar to ${projectTitle}.\nOur startup background and goals:\n`
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut listener for agency founders: Ctrl + Shift + A (or Cmd + Shift + A)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="site-wrapper">
      {/* 3D WebGL Interactive Animation Background */}
      <ThreeBackground />

      {/* Ambient Dark Light Blobs & Noise */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-blob blob-teal"></div>
        <div className="ambient-blob blob-terracotta"></div>
        <div className="ambient-blob blob-gold"></div>
      </div>
      <div className="noise-overlay" aria-hidden="true"></div>

      {/* Top Notice Bar */}
      <NoticeBar currency={currency} onCurrencyChange={setCurrency} />

      {/* Main Navigation Header - Clean & Public */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <Portfolio onSelectSimilarProject={handleSelectSimilarProject} />
        <Services />
        <ScopeCalculator currency={currency} onLockScope={handleLockScope} />
        <PricingTiers currency={currency} onSelectTier={handleSelectTier} />
        <Process />
        <Testimonials />
        <LeadIntakeForm prefillData={prefillData} />
      </main>

      {/* Footer with Discreet Founder Portal Link */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* MongoDB Live Leads Admin Drawer (Password Protected) */}
      <AdminDrawer isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
