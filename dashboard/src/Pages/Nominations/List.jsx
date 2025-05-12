import Skeleton from 'Components/Skeleton/Skeleton';
import useQueryParams from 'Hooks/useQueryParams';
import Nomination from './Nomination';
import Sorting from './Sorting';

export default function List({ data }) {
  const { seasonId, contestId, seasonName, contestName } = useQueryParams();

  if (!data) return null;

  if ((data && data?.length === 0) || data === null) {
    return (
      <Skeleton
        title="Создайте номинацию"
        description="Чтобы создать номинацию нажмите на кнопку с плюсом"
      />
    );
  }

  if (data && data?.length > 0) {
    return (
      <>
        <Sorting />
        <div className="nominations-list__items">
          {data.map((nomination) => (
            <Nomination
              key={nomination.id}
              isPublished={nomination.published}
              name={nomination.name_ru}
              id={nomination.id}
              season={{ name: seasonName, id: seasonId }}
              contest={{ name: contestName, id: contestId }}
            />
          ))}
        </div>
      </>
    );
  }
}
