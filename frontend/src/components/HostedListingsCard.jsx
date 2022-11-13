import React from 'react';
import PropTypes from 'prop-types';

import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  useNavigate,
} from 'react-router-dom';

const HostedListingsCard = (props) => {
  const listing = props.listing;
  const idx = props.idx;
  const type = props.type;
  const bathrooms = props.bathrooms;
  const navigate = useNavigate();
  return (
    <>
      <hr />
      <div key={idx}>
        {listing.title}<br />
        <img src={listing.thumbnail}/>
        <div>Price: ${listing.price}</div>
        <div>Type: {type}</div>
        <div>Bathrooms: {bathrooms}</div>
      </div>
      <button onClick={() => navigate('/listing/edit/' + listing.id)}>Edit</button>
      <hr />
    </>
  );
}

HostedListingsCard.propTypes = {
  listing: PropTypes.object,
  idx: PropTypes.number,
  type: PropTypes.string,
  bathrooms: PropTypes.string
}

export default HostedListingsCard;
