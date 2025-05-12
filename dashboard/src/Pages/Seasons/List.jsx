import Skeleton from '../../Components/Skeleton/Skeleton';
import Season from './Season';

export default function List({ data }) {
  if (!data) return null;

  if ((data && data?.length === 0) || data === null) {
    return (
      <Skeleton
        title="Создайте сезон"
        description="Чтобы создать сезон нажмите на кнопку с плюсом"
      />
    );
  }

  if (data && data?.length > 0) {
    return data.map((season) => <Season {...season} key={season.id} />);
  }
}
