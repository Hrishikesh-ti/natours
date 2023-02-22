import Facts from '../utils/Facts';
import Review from '../utils/Review';

function Role({ guide }) {
  let role = 'Lead Guide';

  if (guide.role === 'guide') role = 'Guide';
  else if (guide.role === 'intern') role = 'Intern';

  return (
    <div className="overview-box__detail" key={guide._id}>
      <img
        className="overview-box__img"
        src={`/img/users/${guide.photo}`}
        alt={`${guide.name}`}
      />
      <span className="overview-box__label">{role}</span>
      <span className="overview-box__text">{guide.name}</span>
    </div>
  );
}

function DetailPage({ tour }) {
  const paragraphs = tour?.description?.split('\n');

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <Facts tour={tour} />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((guide) => (
                <Role guide={guide} key={guide._id} />
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About the {tour.name}</h2>
          {paragraphs.map((des, ind) => (
            <p className="description__text" key={ind}>
              {des}
            </p>
          ))}
        </div>
      </section>
      <section className="section-pictures">
        {tour.images.map((img, ind) => (
          <div className="picture-box" key={ind}>
            <img
              className={`picture-box__img picture-box__img--${ind + 1}`}
              src={`/img/tours/${img}`}
              alt={tour.name}
            />
          </div>
        ))}
      </section>

      <section className="section-map">
        <div id="map" />
      </section>

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review, index) => (
            <Review review={review} key={index} />
          ))}
        </div>
      </section>
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour"
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
            </p>
            <button className="btn btn--green span-all-rows">
              Book tour now!
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailPage;
