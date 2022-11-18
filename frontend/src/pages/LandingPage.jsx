import React from 'react';
import PropTypes from 'prop-types';
import PublishedListingsCard from '../components/PublishedListingCard';

const LandingPage = (props) => {
  const [listings, setListings] = React.useState([]);
  const [published, setPublished] = React.useState([]);

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
      setPublished(published => [...published, data.listing.published]);
    }
  }

  React.useEffect(() => {
    fetchListings();
    sortListings();
  }, []);

  React.useEffect(() => {
    listings.map((listing) => {
      return listingDetails(listing.id);
    })
  }, [listings]);

  const sortListings = () => {
    listings.sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <>
    <h1>Landing Page</h1>
    <div>
      Public listings:<br />
        {listings.map((listing, idx) => {
          if (published[idx]) {
            return (
              <PublishedListingsCard key={idx} listing={listing} idx={idx} />
            )
          } else {
            return null;
          }
        })}
    </div>
    </>
  );
}

LandingPage.propTypes = {
  token: PropTypes.string,
}

export default LandingPage;
