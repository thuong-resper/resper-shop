import './styles.css';

export const PreviousBtn = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-prev" onClick={onClick}>
      <span>{'<'}</span>
    </button>
  );
};

export const NextBtn = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-next" onClick={onClick}>
      <span>{'>'}</span>
    </button>
  );
};
