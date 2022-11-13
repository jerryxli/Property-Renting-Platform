import React from 'react';

const PublishListing = () => {
  const [dateStart, setdateStart] = React.useState('');
  const [dateEnd, setDateEnd] = React.useState('');

  return (
    <>
    Availabilities: <br />
    Date Start: <input type="date" value={dateStart} onChange={(e) => setdateStart(e.target.value)} />
    Date End: <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />  
    <button onClick={}>Create!</button>
    </>
  );
}

export default PublishListing;