import Description from 'Components/UI/Description';
import Checkbox from 'Components/UI/Form/Checkbox';
import GrayField from 'Components/UI/Form/GrayInput';
import Title from 'Components/UI/Title';
import useResize from 'Hooks/useResize';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useRecoilValue } from 'recoil';
import activeContestAtom from 'Recoil/Atoms/ActiveContest';
import seasonAtom from 'Recoil/Atoms/Season';
import FilesRow from './FilesRow';
import FileWrapper from './FileWrapper';
import GalleryFields from './GalleryFields';
import MusicFields from './MusicFields';
import VideoSlider from './VideoSlider';

type TRules = {
  rules: {
    brand: { required: boolean };
    vimeo_link: {
      required: boolean;
    };
    slider_images: {
      required: boolean;
    };
    slider_videos: {
      required: boolean;
    };
  };
  activeNominations?: any[];
};

function WorkCreateFiles({ rules, activeNominations }: TRules) {
  const activeContest = useRecoilValue(activeContestAtom);
  const season = useRecoilValue(seasonAtom);
  const translate = useTranslate();
  const { isDesktop } = useResize();

  const isYoungCheckbox = activeNominations?.find(
    ({ is_young: isYoung }) => isYoung === true
  );

  const isMusicContest =
    activeContest?.label?.toLowerCase().includes('музыка') ||
    activeContest?.label?.toLowerCase().includes('music');

  const isArchitectureContest =
    activeContest?.label?.toLowerCase().includes('архитектура') ||
    activeContest?.label?.toLowerCase().includes('architecture');

  return (
    <>
      <FilesRow rowGap={12}>
        <Title sizeName="m">Загрузка файлов</Title>
        <Description sizeName="s">
          Вы можете загрузить файлы, учитывая нашу структуру и посмотреть
          черновик страницы
        </Description>
      </FilesRow>
      <FilesRow columns={isDesktop ? 3 : 2} gap={0}>
        <FileWrapper
          title="Миниатюра проекта"
          sizeName="s"
          description={translate(
            'Это небольшое изображение, которое визуально представляет ваш проект.<br/>Расположено в верхнем левом углу страницы кейса, пропорции 3:2, файлы .jpg .png'
          )}
          name="preview"
          maxSize={5}
          required
        />
      </FilesRow>
      {isMusicContest ? (
        <MusicFields />
      ) : (
        <GalleryFields required={rules?.slider_images?.required} />
      )}
      {!isMusicContest && (
        <FilesRow gap={30} columns={isDesktop ? 3 : 2}>
          <FileWrapper
            title={translate('Миниатюра видео')}
            sizeName="s"
            description={translate(
              'Это обложка ролика — выберите, какое изображение будет отображаться перед его просмотром.<br/>Пропорции 3:2, файлы .jpg .png, размер не более 2 МБ.'
            )}
            name="video_preview"
            maxSize={2}
          />
        </FilesRow>
      )}

      {!isMusicContest && (
        <FilesRow rowGap={10}>
          <Title sizeName="s">
            {translate('Ссылка на основной ролик о проекте Vimeo/VK video')}
            {rules?.vimeo_link?.required ? '*' : ''}
          </Title>
          <Description
            sizeName="s"
            color="gray"
            dangerHTML={translate(
              '1. Обязательно проверьте настройки приватности страницы, с которой размещаете видео, и настройки приватности данного видео. Страницы пользователя или группы, с которой добавляете видео, должны быть открыты всем, в том числе и неавторизованным пользователям. В настройках видео должен быть предоставлен доступ к просмотру всеми пользователями, в том числе и неавторизованными.<br /><br />2. Перейдите на необходимое вам видео и нажмите кнопку Share (Vimeo) или «Поделиться» (VK).<br /><br />3. Скопируйте текст с поля Embed (Vimeo) или Код для вставки (VK) и вставьте в поле для ссылки.'
            )}
          />

          <GrayField
            closeButton
            required={rules?.vimeo_link?.required}
            fullWidth
            label="Ссылка на видео Vimeo/VK"
            name="vimeo_link"
          />
        </FilesRow>
      )}

      {!isMusicContest && (
        <FilesRow rowGap={0}>
          <Title sizeName="s">Ссылка на короткий ролик о проекте</Title>
          <Description sizeName="s" color="gray">
            {translate(
              'Самое важное о вашем проекте в коротком 30-секундном ролике (видео-ролик, скринкаст).'
            )}
          </Description>
          <GrayField label="Ссылка на ваш ролик" name="short_video_link" />
        </FilesRow>
      )}

      {!isMusicContest && (
        <FilesRow rowGap={0}>
          <VideoSlider
            required={rules?.slider_videos?.required}
            // required={false}
          />
        </FilesRow>
      )}

      <Checkbox className="work-create__submission-rules" required name="agree">
        {translate('Я согласен/на с')}{' '}
        <a href={season?.rules_url} target="_blank" rel="noreferrer">
          {translate('правилами участия конкурса')}
        </a>
      </Checkbox>
      <Checkbox
        className="work-create__submission-rules"
        required
        name="personalData"
      >
        {translate('Я даю ')}{' '}
        <a
          href="https://g8.art/storage/docs/ParticipationConsent.pdf"
          target="_blank"
          rel="noreferrer"
        >
          {translate('согласие на обработку персональных данных')}
        </a>
      </Checkbox>

      <Checkbox
        className="work-create__submission-rules"
        required
        name="isRecentWork"
      >
        {isArchitectureContest
          ? translate('Проект реализован не раньше 1 января 2022г.')
          : translate('Проект реализован не раньше 1 января 2024г.')}
      </Checkbox>

      {isYoungCheckbox && (
        <Checkbox
          className="work-create__submission-rules"
          required
          name="isYoung"
          description="*Возраст участника номинации Young должен быть менее 30 лет, подтвердите что вам меньше"
        >
          {translate('Я подтверждаю, что мой возраст до 30 лет*')}{' '}
        </Checkbox>
      )}
    </>
  );
}

export default React.memo(WorkCreateFiles);
