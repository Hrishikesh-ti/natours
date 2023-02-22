import React from 'react';

function Star({ index, rating }) {
  if (index > rating) {
    return (
      <svg className="reviews__star reviews__star--inactive">
        <use xlinkHref="/img/icons.svg#icon-star" />
      </svg>
    );
  }
  return (
    <svg className="reviews__star reviews__star--active">
      <use xlinkHref="/img/icons.svg#icon-star" />
    </svg>
  );
}

function Stars({ rating }) {
  let stars = [];

  for (let index = 1; index <= 5; index++) {
    stars.push(<Star index={index} rating={Math.round(rating)} key={index} />);
  }

  return <>{stars}</>;
}

function Review({ review }) {
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`/img/users/${review.user.photo}`}
          alt={review.user.name}
        />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
        <Stars rating={review.rating} />
      </div>
    </div>
  );
}

export default Review;
