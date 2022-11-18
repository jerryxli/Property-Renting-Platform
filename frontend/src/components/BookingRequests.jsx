import React from 'react';
import PropTypes from 'prop-types';

const BookingRequests = (props) => {
  const [pendingBookings, setPendingBookings] = React.useState([]);
  const [statusChanged, setStatusChanged] = React.useState(false);

  const fetchPendingBookings = async () => {
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
        if (data.bookings[i].listingId === props.listingId && data.bookings[i].status === 'pending') {
          setPendingBookings(pendingBookings => [...pendingBookings, data.bookings[i]]);
        }
      }
    }
  }

  React.useEffect(() => {
    fetchPendingBookings();
  }, []);

  const acceptBooking = async (bookingId) => {
    const response = await fetch('http://localhost:5005/bookings/accept/' + bookingId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setStatusChanged(true);
      alert('booking accepted');
    }
  }

  const declineBooking = async (bookingId) => {
    const response = await fetch('http://localhost:5005/bookings/decline/' + bookingId, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setStatusChanged(true);
      alert('booking declined');
    }
  }
  return (
    <>
      {pendingBookings.length !== 0 && (
        <>
          <h1>Current Requests</h1>
          {pendingBookings.map((booking, idx) => {
            return (
              <div key={idx + statusChanged}>
                <div>Booking Id: {booking.id}</div>
                <div>Booking Requested By: {booking.owner}</div>
                <div>Date Range Requested: {booking.dateRange.start} to {booking.dateRange.end}</div>
                <div>Total Price: ${booking.totalPrice}</div>
                <button onClick={() => acceptBooking(booking.id)}>Accept Booking Request</button>
                <button onClick={() => declineBooking(booking.id)}>Decline Booking Request</button>
                <hr />
              </div>
            )
          })}
        </>
      )}
    </>
  );
}

BookingRequests.propTypes = {
  token: PropTypes.string,
  listingId: PropTypes.string,
}

export default BookingRequests;
