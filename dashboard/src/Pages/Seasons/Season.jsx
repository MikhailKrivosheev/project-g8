/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Api from 'Api';
import Typography from 'Components/UI/Typography';
import ModalDelete from 'Components/modals/ModalDelete';
import routes from 'Dictionaries/routes';
import ArrowDown from 'Icons/ArrowDown';
import Pencil from 'Icons/Pencil';
import TrashBox from 'Icons/TrashBox';
import wordPluralize from 'Utilities/wordPluralize';
import cn from 'classnames';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContestCard from './Contests/ContestCard';
import CreateContestCard from './Contests/CreateContestCard';

const getStatusTranslate = (status) => {
  switch (status) {
    case 'finished':
      return 'завершен';
    case 'active':
      return 'активный';
    default:
      return 'скрыт';
  }
};

export default function Season({ year, status, contests, id }) {
  const [isOpened, setIsOpened] = useState(status === 'active');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const arrowClassName = cn('season__arrow-button', {
    'season__arrow-button--opened': isOpened,
    'season__arrow-button--disabled': status === 'active',
  });

  const statusClassName = cn('season__status', {
    [`season__status--${status}`]: status,
  });

  const onSeasonClick = () => {
    if (status !== 'active' && !openConfirmModal) {
      setIsOpened((prev) => !prev);
    }
  };

  const onDeleteClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenConfirmModal(true);
  };

  return (
    <div className="season__holder" onClick={onSeasonClick}>
      <div className="season__heading-holder">
        <div className="season__heading">
          <div className="season__side">
            <Typography tag="h2">{year}</Typography>

            <Typography
              color="gray"
              type="caption"
              className="season__contests-counter"
            >
              {wordPluralize(contests?.length, 'категория')}
            </Typography>

            <div className={statusClassName}>{getStatusTranslate(status)}</div>
          </div>
          <div className="season__side season__side--buttons">
            {status !== 'active' && (
              <div className="delete-entity">
                <button
                  type="button"
                  className="delete-entity__button season__side-button"
                  onClick={onDeleteClick}
                >
                  <TrashBox />
                </button>
              </div>
            )}

            <Link
              to={routes.seasonPage(id)}
              className="season__link season__link--edit"
            >
              <Pencil />
            </Link>

            <div className={arrowClassName}>
              <ArrowDown />
            </div>
          </div>
        </div>
      </div>

      {isOpened && (
        <div className="season__contests-holder">
          {contests.length > 0 &&
            contests.map((contest) => (
              <ContestCard {...contest} seasonId={id} seasonName={year} />
            ))}
          <CreateContestCard seasonId={id} seasonName={year} />
        </div>
      )}

      <ModalDelete
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        deleteUrl={Api.routes.season(id)}
        questionText={`Вы точно хотите удалить сезон\u00A0${year}?`}
        description="Удаленный сезон нельзя будет вернуть"
        reloadPage
      />
    </div>
  );
}
