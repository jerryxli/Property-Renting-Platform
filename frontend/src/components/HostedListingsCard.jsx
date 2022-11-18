import React from 'react';
import PropTypes from 'prop-types';

import {
  useNavigate,
} from 'react-router-dom';

const HostedListingsCard = (props) => {
  const listing = props.listing;
  const idx = props.idx;
  const type = props.type;
  const bathrooms = props.bathrooms;
  const beds = props.beds;
  const navigate = useNavigate();
  const [published, setPublished] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [rating, setRating] = React.useState('');

  const unpublishListing = async () => {
    const response = await fetch('http://localhost:5005/listings/unpublish/' + listing.id, {
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
      alert('listing has been unpublished');
      setPublished(false);
    }
  }

  const deleteListing = async () => {
    const response = await fetch('http://localhost:5005/listings/' + listing.id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      alert('listing has been deleted');
      setDeleted(true);
    }
  }

  const listingDetails = async (id) => {
    const response = await fetch('http://localhost:5005/listings/' + id, {
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
      setPublished(data.listing.published);
      let totalScore = 0;
      for (let i = 0; i < listing.reviews.length; i++) {
        totalScore += parseInt(listing.reviews[i].score);
      }
      setRating(totalScore / listing.reviews.length);
    }
  }

  React.useEffect(() => {
    listingDetails(listing.id);
  }, []);

  return (
    <>
      {!deleted && (
        <>
        <hr />
        <div key={idx}>
          {listing.title}<br />
          <img src={listing.thumbnail}/>
          <div>Price: ${listing.price}</div>
          <div>Type: {type}</div>
          <div>Bathrooms: {bathrooms}</div>
          <div>Beds: {beds}</div>
          <div>Rating: <b>{rating}</b> ({listing.reviews.length} reviews)</div>
        </div>
        <button onClick={() => navigate('/listing/edit/' + listing.id)}>Edit</button>
        {!published && <button onClick={() => navigate('/listing/publish/' + listing.id)}>Publish Listing</button>}
        {published && <button onClick={() => unpublishListing()}>Unpublish Listing</button>}
        <button onClick={() => navigate('/listing/history/' + listing.id)}>View Requests and History</button>
        <div><button onClick={() => deleteListing()}>Delete Listing</button></div>
        <hr />
        </>
      )}
    </>
  );
}

HostedListingsCard.propTypes = {
  token: PropTypes.string,
  listing: PropTypes.object,
  idx: PropTypes.number,
  type: PropTypes.string,
  bathrooms: PropTypes.string,
  beds: PropTypes.string
}

export default HostedListingsCard;
