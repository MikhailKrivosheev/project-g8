import Footer from 'Components/Footer';
import Header from 'Components/Header';
import Main from 'Components/Main';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AtomEffects from 'AtomEffects';
import ErrorBoundary from 'Components/ErrorBoundary';
import MainErrorBoundaryContent from 'Components/Main/ErrorBoundaryContent';
import Cookies from 'Components/Cookies';
import ScrollToTop from './Components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <AtomEffects />
      <ErrorBoundary content={<MainErrorBoundaryContent />}>
        <Main />
      </ErrorBoundary>
      <Footer />
      <Cookies />
    </Router>
  );
}
