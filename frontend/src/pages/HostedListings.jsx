import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';
import HostedListingsCard from '../components/HostedListingsCard';

import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  // Link,
  // Redirect,
  useNavigate,
  // useLocation
} from 'react-router-dom';

const HostedListings = (props) => {
  const [listings, setListings] = React.useState([]);
  const navigate = useNavigate();
  const [ListingType, setListingType] = React.useState('');
  const [ListingBathrooms, setListingBathrooms] = React.useState('');
  // const [ListingBedrooms, setListingBedrooms] = React.useState('');
  // const [ListingAmenities, setListingAmenities] = React.useState('');

  const fetchListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();
    setListings(data.listings);
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
      const metadata = data.listing.metadata;
      setListingType(metadata.type);
      setListingBathrooms(metadata.bathrooms);
      // setListingBedrooms(metadata.bedrooms);
      // setListingAmenities(metadata.amenities);
    }
  }

  React.useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      Current listings:<br />
      {listings.map((listing, idx) => {
        if (listing.owner === props.email) {
          listingDetails(listing.id);
          return (
            <HostedListingsCard key = {idx} listing={listing} idx={idx} type={ListingType} bathrooms={ListingBathrooms} ></HostedListingsCard>
          )
        } else {
          return null;
        }
      })}
      <BigButton onClick={() => navigate('/listing/hostedListings/newListing')}>create new listing</BigButton>
    </>
  );
}

HostedListings.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string
}

export default HostedListings;
