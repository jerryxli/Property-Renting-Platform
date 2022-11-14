import React from 'react';
import PropTypes from 'prop-types';

const PublishedListingsCard = (props) => {
  const listing = props.listing;
  const idx = props.idx;
  return (
    <>
      <hr />
      <div key={idx}>
        {listing.title}<br />
        <img src={listing.thumbnail}/>
        {/* reviews */}
      </div>
      <hr />
    </>
  );
}

PublishedListingsCard.propTypes = {
  listing: PropTypes.object,
  idx: PropTypes.number,
}

export default PublishedListingsCard;
