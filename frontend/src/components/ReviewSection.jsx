import React from 'react';
import PropTypes from 'prop-types';

const ReviewSection = (props) => {
  const [rating, setRating] = React.useState('');
  const [review, setReview] = React.useState('');

  const leaveReview = async () => {
    const args = {
      rating: rating,
      review: review
    };

    const response = await fetch('http://localhost:5005/listings/' + props.listingId + '/review/' + props.bookingId, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setRating('');
      setReview('');
    }
  }

  return (
    <>
      <h3>Review Listing</h3>
      <div>
      Rating (/5): <input type="text" placeholder="Rating /5" value={rating} onChange={(e) => setRating(e.target.value)} />
      <div>
        <textarea placeholder="Leave a Review" value={review} cols="30" rows="10" onChange={(e) => setReview(e.target.value)}></textarea>
      </div>
      <button onClick={() => leaveReview()}>Submit Review</button>
      </div>
    </>
  );
}

ReviewSection.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.string,
  bookingId: PropTypes.string
}

export default ReviewSection;
