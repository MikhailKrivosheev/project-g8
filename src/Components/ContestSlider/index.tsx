import React, { useEffect, useState } from 'react';
import SliderCard, { ICard } from 'Components/UI/Card';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import Slider from 'Components/UI/Slider';
import Button from 'Components/UI/Button';
import useAPIError from 'Hooks/useAPIError';
import Api from 'Api';
import routes from 'Api/routes';
import useRoutes from 'Hooks/useRoutes';

function Slide({
  data: {
    id,
    preview_url: previewUrl,
    company: companyRu,
    nominations,
    name: nameRu,
    likes_count: likesCount,
    is_liked: isLiked,
  },
}: any) {
  return (
    <SliderCard
      id={id}
      className="card__contest"
      image={previewUrl}
      nominations={nominations}
      logo={previewUrl}
      company={companyRu}
      title={nameRu}
      isLiked={isLiked}
      likes={likesCount}
    />
  );
}

export default function ContestSlider({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const ROUTES = useRoutes();
  const [data, setData] = useState<ICard[] | null>(null);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await Api.get(routes.api.works(), {
          contest_id: id,
        });
        setData(response?.results);
      } catch (error: any) {
        handleAPIError(error);
      }
    };
    fetchContests();
  }, []);

  if (!data) return null;

  return (
    <Section overflow="hidden">
      <Title color="black" className="contest__title" sizeName="m">
        {title}
      </Title>
      <Slider
        className="contest__slider"
        elements={data}
        slide={Slide}
        overflow="visible"
        pagination
      />
      <Button
        link={ROUTES.workCreate()}
        color="transparent"
        icon="star"
        fullWidth
      >
        Подать работу
      </Button>
    </Section>
  );
}
