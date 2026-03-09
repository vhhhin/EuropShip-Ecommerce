import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import GlobalNetwork from './components/GlobalNetwork';
import Playground from './components/Playground';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import LegalNotice from './components/LegalNotice';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Loader from './components/Loader';
import TabletShowcase from './components/TabletShowcase';
import BookDemo from './components/BookDemo';
import AIFaster from './components/AIFaster';
import ThemeScrollObserver from './components/ThemeScrollObserver';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ThemeScrollObserver />
              <main>
                <Hero />
                <section id="features" data-theme-trigger="light"><Features /></section>
                <section id="network"><GlobalNetwork /></section>
                <section id="showcase"><TabletShowcase /></section>
                <section id="playground" data-theme-trigger="light"><Playground /></section>
                <section id="aifaster" data-theme-trigger="light"><AIFaster /></section>
              </main>
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <ContactPage />
            </>
          }
        />
        
        <Route
          path="/book-demo"
          element={
            <>
              <BookDemo />
            </>
          }
        />
        
        <Route
          path="/privacy"
          element={
            <>
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />

        <Route
          path="/terms"
          element={
            <>
              <TermsOfService />
              <Footer />
            </>
          }
        />

        <Route
          path="/legal"
          element={
            <>
              <LegalNotice />
              <Footer />
            </>
          }
        />
      </Routes>
      <Loader />
    </BrowserRouter>
  );
};

export default App;