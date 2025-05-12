import ArrowToPlus from 'Icons/ArrowToPlus';

export default function Skeleton({ title, description }) {
  return (
    <div className="skeleton">
      <h1 className="skeleton__title">{title}</h1>
      <p className="skeleton__description">{description}</p>
      <div className="skeleton__blocks">
        <div className="skeleton__block skeleton__block--short" />
        <div className="skeleton__block skeleton__block--long" />
        <div className="skeleton__block skeleton__block--short" />
      </div>
      <div className="skeleton__arrow">
        <ArrowToPlus />
      </div>
    </div>
  );
}
