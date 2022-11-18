import React from 'react';
import PropTypes from 'prop-types';
import ReviewSection from '../components/ReviewSection';
import BookingSection from '../components/BookingSection';
import {
  useParams
} from 'react-router-dom';

const Listing = (props) => {
  const params = useParams();
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [type, setType] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  // const [images, setImages] = React.useState([]);
  const [allowReview, setAllowReview] = React.useState(false);
  const [bookingId, setBookingId] = React.useState('');
  const [bookingStatus, setBookingStatus] = React.useState('');

  const listingDetails = async (listingId) => {
    const response = await fetch('http://localhost:5005/listings/' + listingId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const listing = data.listing;
      setTitle(listing.title);
      const address = listing.address.street + ' ' + listing.address.city + ' ' + listing.address.state;
      setAddress(address);
      setPrice(listing.price);
      setType(listing.metadata.type);
      setThumbnail(listing.thumbnail);
      setBathrooms(listing.metadata.bathrooms);
      setBedrooms(listing.metadata.bedrooms);
      setAmenities(listing.metadata.amenities);
      let totalScore = 0;
      for (let i = 0; i < listing.reviews.length; i++) {
        totalScore += parseInt(listing.reviews[i].score);
        setReviews(reviews => [...reviews, listing.reviews[i].comment]);
      }
      setRating(totalScore / listing.reviews.length);
      // setImages(images => [...images, data.listing.thumbnail]);
    }
  }

  const fetchBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      for (let i = 0; i < data.bookings.length; i++) {
        if (data.bookings[i].listingId === params.listingId && data.bookings[i].owner === props.email) {
          setBookingId(data.bookings[i].id);
          setBookingStatus(data.bookings[i].status);
          if (data.bookings[i].status === 'accepted') {
            setAllowReview(true);
          }
        }
      }
    }
  }

  React.useEffect(() => {
    listingDetails(params.listingId);
    if (props.token != null) {
      fetchBookings();
    }
  }, []);

  const styleObj = {
    width: '100px',
    height: '70px'
  };

  return (
    <>
    <div>
      <h1>{title}</h1>
      <img style={styleObj} src={thumbnail}/>
      <div>Address: {address}</div>
      <div>Ammenities: {amenities}</div>
      <div>Price: ${price}</div>
      {/* <div>Extra Images:</div> */}
      <div>Type: {type}</div>
      <div>Bedrooms: {bedrooms}</div>
      {/* beds */}
      <div>Bathrooms: {bathrooms}</div>
      <div>Rating: {rating}</div>
      <b>Reviews: </b>
      <ul>
        {reviews.map((review, idx) => {
          return (
            <li key={idx}>{review}</li>
          )
        })}
      </ul>
      {props.token && bookingId && (
        <h3>Booking Status: {bookingStatus}</h3>
      )}
      {props.token && (
        <BookingSection token={props.token} listingId={params.listingId} price={price}/>
      )}
      {props.token && allowReview && (
        <ReviewSection token={props.token} listingId={params.listingId} bookingId={bookingId}/>
      )}
    </div>
    </>
  );
}

Listing.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string
}

export default Listing;
