import Button from 'Components/UI/Button';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'Components/LazyLoad';
import { useRecoilValue } from 'recoil';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import DeleteItem from './DeleteItem';
import { IWorksUser, TWorkCard } from './types';

export default function WorkCard({
  id,
  preview_url: previewUrl,
  name,
  nominations,
  season,
  status,
  deleteCallBack,
}: IWorksUser & TWorkCard) {
  const { work_status: workStatus } = useRecoilValue(dictionaryAtom);
  const { isDesktop } = useResize();

  const ROUTES = useRoutes();
  return (
    <li className="work-user">
      <div className="work-user__preview">
        <Link to={ROUTES.work(id)} className="work-user__link">
          link to work
        </Link>
        <LazyLoad src={previewUrl} alt="" className="work-user__image" />
        <div className="work-user__title">{name}</div>
      </div>
      <div className="work-user__info">
        {nominations?.length && (
          <div className="work-user__nominations">
            {nominations?.map((nomination: IWorksUser) => (
              <div className="work-user__nomination" key={nomination.id}>
                {nomination.name}
              </div>
            ))}
          </div>
        )}

        {status === 'draft' || status === 'unpaid' ? (
          <div className="work-user__paid-status">
            <Button link={ROUTES.payment(id)} color="gray" strached>
              Оплатить
            </Button>
          </div>
        ) : (
          <div className="work-user__paid-status">{workStatus?.[status]}</div>
        )}
        {season?.year && <div className="work-user__year">{season?.year}</div>}
      </div>
      <div className="work-user__work-edit">
        <Button
          link={
            status === 'draft' || status === 'unpaid' || status === 'moderation'
              ? ROUTES.workUpdate(id)
              : ''
          }
          fullWidth={!isDesktop}
          color="gray"
          strached
          disabled={
            status !== 'draft' && status !== 'unpaid' && status !== 'moderation'
          }
        >
          Редактировать
        </Button>
      </div>
      <DeleteItem
        status={status}
        name={name}
        id={id}
        setWorksUser={deleteCallBack}
      />
    </li>
  );
}
