import PropTypes from 'prop-types';
import React from 'react';
import BigButton from '../components/BigButton';

import {
  useNavigate,
} from 'react-router-dom';

const NewListing = (props) => {
  const [newListingTitle, setNewListingTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [newListingPrice, setNewListingPrice] = React.useState('');
  const [newListingThumbnail, setNewListingThumbnail] = React.useState('');
  const [newListingType, setNewListingType] = React.useState('');
  const [newListingBathrooms, setNewListingBathrooms] = React.useState('');
  const [newListingBedrooms, setNewListingBedrooms] = React.useState('');
  const [newListingAmenities, setNewListingAmenities] = React.useState('');
  const navigate = useNavigate();
  const newListing = async (args) => {
    const response = await fetch('http://localhost:5005/listings/new', {
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
      navigate('/listing/hostedListings');
    }
  }
  return (
    <>
    List new page!<br />
    Title: <input type="text" value={newListingTitle} onChange={(e) => setNewListingTitle(e.target.value)} /><br />
    Street: <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} /><br />
    City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /><br />
    State: <input type="text" value={state} onChange={(e) => setState(e.target.value)} /><br />
    Postcode: <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} /><br />
    Country: <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /><br />
    Price: <input type="text" value={newListingPrice} onChange={(e) => setNewListingPrice(e.target.value)} /><br />
    Thumbnail: <input type="text" value={newListingThumbnail} onChange={(e) => setNewListingThumbnail(e.target.value)} /><br />
    Type: <input type="text" value={newListingType} onChange={(e) => setNewListingType(e.target.value)} /><br />
    Bathrooms: <input type="text" value={newListingBathrooms} onChange={(e) => setNewListingBathrooms(e.target.value)} /><br />
    Bedrooms: <input type="text" value={newListingBedrooms} onChange={(e) => setNewListingBedrooms(e.target.value)} /><br />
    Property Amenities: <input type="text" value={newListingAmenities} onChange={(e) => setNewListingAmenities(e.target.value)} /><br />
    <BigButton onClick={() => newListing({
      title: newListingTitle,
      address: {
        street: street,
        city: city,
        state: state,
        postcode: postcode,
        country: country
      },
      price: newListingPrice,
      thumbnail: newListingThumbnail,
      metadata: {
        type: newListingType,
        bathrooms: newListingBathrooms,
        bedrooms: newListingBedrooms,
        amenities: newListingAmenities
      },
    })}>Create!</BigButton>
    </>
  );
}

NewListing.propTypes = {
  token: PropTypes.string,
}

export default NewListing;
