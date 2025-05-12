import React from 'react';
import JuryTicker from 'Components/JuryTicker';
import TextTicker from 'Components/TextTicker';
import Sponsors from 'Components/Sponsors';
import Journal from 'Components/Journal';
import Contests from 'Components/Contests';
import ErrorBoundary from 'Components/ErrorBoundary';
import AlbumPreview from 'Components/AlbumPreview';
import Winners from 'Components/Winners';
import PromoVideo from './PromoVideo/PromoVideo';
import Conference from './Conference';
import PopularVote from './PopularVote';
import Hero from './Hero';
import Popups from './Popups';
import RequestWorkButton from './ModalMenuButton';
import AkarBlock from './AkarBlock';

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <TextTicker />
      </ErrorBoundary>
      <ErrorBoundary>
        <AkarBlock />
      </ErrorBoundary>
      <ErrorBoundary>
        <PromoVideo />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contests />
      </ErrorBoundary>
      <ErrorBoundary>
        <PopularVote />
      </ErrorBoundary>
      <ErrorBoundary>
        <PromoVideo isSecond />
      </ErrorBoundary>
      <ErrorBoundary>
        <Journal />
      </ErrorBoundary>
      <ErrorBoundary>
        <Winners />
      </ErrorBoundary>
      <ErrorBoundary>
        <Conference />
      </ErrorBoundary>
      {/* <ErrorBoundary>
        <JuryTicker />
      </ErrorBoundary> */}
      <ErrorBoundary>
        <Sponsors />
      </ErrorBoundary>
      <ErrorBoundary>
        <AlbumPreview />
      </ErrorBoundary>
      <Popups />
      <RequestWorkButton />
    </>
  );
}
