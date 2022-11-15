import React from 'react';
import PropTypes from 'prop-types';

const BookingSection = (props) => {
  const [dateStart, setdateStart] = React.useState('');
  const [dateEnd, setDateEnd] = React.useState('');

  const makeBooking = async () => {
    const arg = {};
    arg.start = dateStart;
    arg.end = dateEnd;

    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffTime = Math.abs(start - end);
    const totalPrice = props.price * Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const args = {
      dateRange: arg,
      totalPrice: totalPrice
    };

    const response = await fetch('http://localhost:5005/bookings/new/' + props.listingId, {
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
      alert('booking has been requested')
    }
  }

  return (
    <>
      <span>Date Start: <input type="date" onChange={(e) => setdateStart(e.target.value)} /></span>
      <span>Date End: <input type="date" onChange={(e) => setDateEnd(e.target.value)} /></span>
      <button onClick={() => makeBooking()}>Make a Booking</button>
    </>
  );
}

BookingSection.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.string,
  price: PropTypes.string,
}

export default BookingSection;
