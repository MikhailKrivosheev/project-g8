import AkarBlock from './AkarBlock';
import ConferenceBlock from './ConferenceBlock';
import MainContent from './MainContent';
import PopularVoteBlock from './PopularVoteBlock';

export default function HomePageContent({ parentName }) {
  return (
    <>
      <MainContent parentName={parentName} />
      <AkarBlock parentName="akar" />
      <PopularVoteBlock parentName={parentName} />
      <ConferenceBlock parentName={parentName} />
    </>
  );
}
