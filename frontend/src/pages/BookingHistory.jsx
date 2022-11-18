import React from 'react';
import PropTypes from 'prop-types';
import BookingRequests from '../components/BookingRequests';
import {
  useParams,
} from 'react-router-dom';

const BookingHistory = (props) => {
  const params = useParams();
  const [previousBookings, setPreviousBookings] = React.useState([]);
  const [profit, setProfit] = React.useState(0);
  const [daysBooked, setDaysBooked] = React.useState(0);

  const fetchPreviousBookings = async () => {
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
        if (data.bookings[i].listingId === params.listingId) {
          if (data.bookings[i].status === 'accepted' || data.bookings[i].status === 'declined') {
            setPreviousBookings(previousBookings => [...previousBookings, data.bookings[i]]);
            setProfit(profit => profit + data.bookings[i].totalPrice);
            const dateRange = data.bookings[i].dateRange;
            const time = Math.abs(new Date(dateRange.end) - new Date(dateRange.start));
            setDaysBooked(daysBooked => daysBooked + Math.ceil(time / (1000 * 60 * 60 * 24)));
          }
        }
      }
    }
  }

  React.useEffect(() => {
    fetchPreviousBookings();
  }, []);

  return (
    <>
      <BookingRequests token={props.token} listingId={params.listingId}/>
      {previousBookings.length !== 0 && (
        <>
          <h1>Previous Bookings</h1>
          {previousBookings.map((booking, idx) => {
            return (
              <div key={idx}>
                <div>Booking Id: {booking.id}</div>
                <div>Booked By: {booking.owner}</div>
                <div>Date Range: {booking.dateRange.start} to {booking.dateRange.end}</div>
                <div>Total Price: ${booking.totalPrice}</div>
                <div>Booking Status: {booking.status}</div>
                <hr />
              </div>
            )
          })}
        </>
      )}
      <h3>Total Days Booked: {daysBooked}</h3>
      <h3>Total Profit Made: {profit}</h3>
    </>
  );
}

BookingHistory.propTypes = {
  token: PropTypes.string,
}

export default BookingHistory;
