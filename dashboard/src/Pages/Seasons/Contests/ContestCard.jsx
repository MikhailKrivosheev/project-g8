import Api from 'Api';
import ModalDelete from 'Components/modals/ModalDelete';
import Typography from 'Components/UI/Typography';
import routes from 'Dictionaries/routes';
import Pencil from 'Icons/Pencil';
import TrashBox from 'Icons/TrashBox';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContestCard({
  published,
  seasonId,
  id,
  name,
  seasonName,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onButtonDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenConfirmModal(true);
  };

  return (
    <>
      <Link
        className="season__contest-holder"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        to={`${routes.nominations(
          seasonId,
          id
        )}?season_name=${seasonName}&contest_name=${name}`}
      >
        <div className="season__contest-heading">
          <>
            {published && (
              <span className="season__contest-status">Опубликовано</span>
            )}

            {isHovered && (
              <>
                <Link
                  to={`${routes.contestPage(
                    seasonId,
                    id
                  )}?season_name=${seasonName}&contest_name=${name}`}
                  className="season__link"
                >
                  <Pencil />
                </Link>
                <div className="delete-entity">
                  <button
                    type="button"
                    onClick={onButtonDeleteClick}
                    className="delete-entity__button"
                  >
                    <TrashBox />
                  </button>
                </div>
              </>
            )}
          </>
        </div>
        <Typography tag="h3">{name}</Typography>
      </Link>
      <ModalDelete
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        deleteUrl={Api.routes.contest(id)}
        questionText="Вы точно хотите удалить категорию?"
        description="Удаленную категорию нельзя будет вернуть"
        reloadPage
      />
    </>
  );
}
