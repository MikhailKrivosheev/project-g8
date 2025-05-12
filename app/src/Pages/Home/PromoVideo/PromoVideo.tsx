import Section from 'Components/UI/Section';
import Video from 'Components/Video';
import React from 'react';
import { useRecoilValue } from 'recoil';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';

export default function PromoVideo({ isSecond }: { isSecond?: boolean }) {
  const { home: homeContent } = useRecoilValue(settingsAtom);

  if (!homeContent) return null;

  const {
    first_video: firstVideo,
    first_video_preview: firstVideoPreview,
    second_video: secondVideo,
    second_video_preview: secondVideoPreview,
  } = homeContent;

  return (
    <Section isWide>
      <Video
        src={isSecond ? secondVideo : firstVideo}
        preview={isSecond ? secondVideoPreview : firstVideoPreview}
        muted={false}
        playsInline
        className="banner-video"
      />
    </Section>
  );
}
