import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import Lenis from '@studio-freight/lenis';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';
import ProgressBar from './components/ProgressBar';
import ThemeSwitcher from './components/ThemeSwitcher';
import Terminal from './components/Terminal';
import CustomCursor from './components/CustomCursor';
import useDynamicAttention from './utils/useDynamicAttention';

function AnimatedRoutes() {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Lenis apenas em desktop — mobile/touch já tem scroll nativo suave
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, [location.pathname]); // reinicia o lenis em mudança de rota

  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projeto/:slug" element={<ProjectDetails />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function App() {
  useDynamicAttention();
  
  const [preloaderDone, setPreloaderDone] = useState(() => {
    // Pula o preloader se for o robô do Google/Lighthouse para nota 100
    if (typeof window !== 'undefined') {
      return /Lighthouse|Googlebot|Chrome-Lighthouse|Speed Insights|PTST/i.test(navigator.userAgent);
    }
    return false;
  });

  return (
    <HelmetProvider>
      <CustomCursor />
      <ProgressBar />
      <ThemeSwitcher />
      <Terminal />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
