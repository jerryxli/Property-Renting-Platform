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
  // const [images, setImages] = React.useState([]);
  const [allowReview, setAllowReview] = React.useState(false);
  const [bookingId, setBookingId] = React.useState('');

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
          if (data.bookings[i].status === 'accepted') {
            setAllowReview(true);
            setBookingId(data.bookings[i].id);
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

  return (
    <>
    <div>
      <h1>{title}</h1>
      <img src={thumbnail}/>
      <div>Address: {address}</div>
      <div>Ammenities: {amenities}</div>
      <div>Price: ${price}</div>
      {/* <div>Extra Images:</div> */}
      <div>Type: {type}</div>
      {/* <div>Reviews: </div> */}
      <div>Bedrooms: {bedrooms}</div>
      {/* beds */}
      <div>Bathrooms: {bathrooms}</div>
      {props.token && (
        <BookingSection listingId={params.listingId} price={price}/>
      )}
      {props.token && allowReview && (
        <ReviewSection listingId={params.listingId} bookingId={bookingId}/>
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
