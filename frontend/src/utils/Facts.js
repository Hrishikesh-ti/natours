function Overview({ label, value, icon }) {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{value}</span>
    </div>
  );
}

function Facts({ tour }) {
  const month = new Date(tour.startDates[0]).toLocaleString('default', {
    month: 'long',
  });
  const year = new Date(tour.startDates[0]).getFullYear();

  return (
    <>
      <Overview label="Next date" value={`${month}  ${year}`} icon="calendar" />
      <Overview label="Difficulty" value={tour.difficulty} icon="trending-up" />
      <Overview
        label="Participants"
        value={`${tour.maxGroupSize}  people`}
        icon="user"
      />
      <Overview
        label="Rating"
        value={`${tour.ratingsAverage} / 5`}
        icon="star"
      />
    </>
  );
}

export default Facts;
