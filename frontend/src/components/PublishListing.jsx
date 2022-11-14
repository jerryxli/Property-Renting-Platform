import React from 'react';
import PropTypes from 'prop-types';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

const PublishListing = (props) => {
  const [dates, setDates] = React.useState([]);
  const [dateStart, setdateStart] = React.useState([]);
  const [dateEnd, setDateEnd] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const publishListing = async () => {
    const args = [];
    for (let i = 0; i < dateStart.length; i++) {
      const arg = {};
      arg.start = dateStart[i]
      arg.end = dateEnd[i]
      args.push(arg);
    }
    const availability = {
      availability: args
    }
    const response = await fetch('http://localhost:5005/listings/publish/' + params.id, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(availability),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      navigate('/listing/hostedListings');
    }
  }
  console.log('start' + dateStart);
  console.log('end' + dateEnd);
  const addMoreDates = () => {
    setDates(dates => [...dates, <span key={dates.length}>Date Start: <input type="date" onChange={(e) => setdateStart(dateStart => [...dateStart, e.target.value])} /></span>]);
    setDates(dates => [...dates, <span key={dates.length}>Date End: <input type="date" onChange={(e) => setDateEnd(dateEnd => [...dateEnd, e.target.value])} /></span>]);
    setDates(dates => [...dates, <br key={1000 + dates.length}/>]);
  }

  return (
    <>
    Availabilities: <br />
    Date Start: <input type="date" onChange={(e) => setdateStart(dateStart => [...dateStart, e.target.value])} />
    Date End: <input type="date" onChange={(e) => setDateEnd(dateEnd => [...dateEnd, e.target.value])} />
    <button onClick={() => addMoreDates()}>Add more dates!</button>
    <button onClick={() => publishListing()}>Create!</button> <br />
    {/* then render input */}
    {dates}
    </>
  );
}

PublishListing.propTypes = {
  token: PropTypes.string,
}

export default PublishListing;
