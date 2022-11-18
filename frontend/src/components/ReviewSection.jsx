import React from 'react';
import PropTypes from 'prop-types';

const ReviewSection = (props) => {
  const [rating, setRating] = React.useState('');
  const [comment, setComment] = React.useState('');

  const leaveReview = async () => {
    const args = {};
    args.score = rating;
    args.comment = comment;

    const review = {
      review: args
    }

    const response = await fetch('http://localhost:5005/listings/' + props.listingId + '/review/' + props.bookingId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setRating('');
      setComment('');
      alert('review was submitted');
    }
  }

  return (
    <>
      <h3>Review Listing</h3>
      <div>
      Rating (/5): <input type="text" placeholder="Rating /5" value={rating} onChange={(e) => setRating(e.target.value)} />
      <div>
        <input type="text" placeholder="Leave a Review" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
        <button onClick={() => leaveReview()}>Submit Review</button>
      </div>
    </>
  );
}

ReviewSection.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.string,
  bookingId: PropTypes.number
}

export default ReviewSection;
