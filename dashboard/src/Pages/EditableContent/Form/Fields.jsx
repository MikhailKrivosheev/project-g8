import { Button } from '@material-ui/core';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import activeEditableTab from 'Recoil/Atoms/activeEditableTab';
import AwardsPage from './AwardsPage';
import HomePageContent from './HomePage';
import TextBanner from './TextBanner';
import useStyles from './useStyles';

const PAGE_TYPES = {
  home: <HomePageContent parentName="home" />,
  awards: <AwardsPage parentName="awards" />,
  conference: (
    <TextBanner key="conference" isWithDate parentName="conference" />
  ),
  works: <TextBanner key="works" parentName="works" />,
  jury: <TextBanner key="jury" parentName="jury" />,
  price: <TextBanner key="price" parentName="price" />,
};

const ButtonTab = ({ tabKey }) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useRecoilState(activeEditableTab);

  const getTabName = () => {
    switch (tabKey) {
      case 'awards':
        return 'G8 Creative Awards';
      case 'conference':
        return 'Конференция';
      case 'works':
        return 'Работы';
      case 'jury':
        return 'Жюри';
      case 'price':
        return 'Стоимость';
      default:
        return 'Главная страница';
    }
  };

  return (
    <Button
      className={classes.tab}
      variant="contained"
      color={activeTab === tabKey ? 'primary' : 'grey'}
      onClick={() => setActiveTab(tabKey)}
    >
      {getTabName()}
    </Button>
  );
};

export default function Fields() {
  const classes = useStyles();
  const activeTab = useRecoilValue(activeEditableTab);

  return (
    <>
      <div className={classes.tabs}>
        {Object.keys(PAGE_TYPES).map((key) => (
          <ButtonTab key={key} tabKey={key} />
        ))}
      </div>
      {React.isValidElement(PAGE_TYPES[activeTab]) && PAGE_TYPES[activeTab]}
    </>
  );
}
