import React from 'react';
import PropTypes from 'prop-types';
import {
  useNavigate,
} from 'react-router-dom';

const PublishedListingsCard = (props) => {
  const listing = props.listing;
  const idx = props.idx;
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const styleObj = {
    cursor: isHovering ? 'pointer' : '',
  };

  const styleObj2 = {
    width: '100px',
    height: '70px'
  };

  return (
    <>
      <div style={styleObj} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => navigate('/listing/' + props.listing.id)}>
        <hr />
        <div key={idx}>
          {listing.title}<br />
          <img style={styleObj2} src={listing.thumbnail}/>
          <div><b>{listing.reviews.length} </b>Total Reviews</div>
        </div>
        <hr />
      </div>
    </>
  );
}

PublishedListingsCard.propTypes = {
  listing: PropTypes.object,
  idx: PropTypes.number,
}

export default PublishedListingsCard;
