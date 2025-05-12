import React from 'react';
import DictionaryEffect from './Dictionary';
import LangEffect from './Lang';
import ResizeEffect from './Resize';
import SeasonEffect from './Season';
import SettingsEffect from './Settings';
import ThemeEffect from './Theme';
import UserEffect from './User';
import WorkCounterEffect from './WorkCounter';

export default function AtomEffects() {
  return (
    <>
      <LangEffect />
      <ThemeEffect />
      <DictionaryEffect />
      <SeasonEffect />
      <ResizeEffect />
      <UserEffect />
      <WorkCounterEffect />
      <SettingsEffect />
    </>
  );
}
