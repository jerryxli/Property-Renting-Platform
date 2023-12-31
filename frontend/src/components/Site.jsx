import React from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';
import HostedListings from '../pages/HostedListings';
import BigButton from './BigButton';
import NewListing from '../pages/NewListing';
import EditListing from '../pages/EditListing';
import PublishListing from './PublishListing';
import LandingPage from '../pages/LandingPage';
import Listing from '../pages/Listing';
import BookingHistory from '../pages/BookingHistory';

import {
//   BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // Redirect,
  useNavigate,
  useLocation
} from 'react-router-dom';

function Site () {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
      setToken(lsToken);
    }
  }, []);

  React.useEffect(() => {
    const lsEmail = localStorage.getItem('email');
    if (lsEmail) {
      setEmail(lsEmail);
    }
  }, [token]);

  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        navigate('/');
      }
    }
  }, [token]);

  const logout = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      window.localStorage.clear();
      setToken(null);
      navigate('/');
    }
  }

  const styleObj = {
    margin: '0 10px 0 10px'
  };

  return (
    <div>
      <header>Airbrb</header>
      <nav>
        <ul>
          {!token && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link to="/">Landing Page</Link>
              </li>
              <li>
                <Link to="/listing/hostedListings">Hosted Listings</Link>
              </li>
            </>
          )}
        </ul>
        {token && (
          <BigButton onClick={logout}>Logout</BigButton>
        )}
      </nav>
      <div style={styleObj}>
        <Routes>
          <Route exact path="/dashboard" element={<b>Hello dashboard</b>}></Route>
          <Route exact path="/login" element={<Login setTokenFn={setToken} />}></Route>
          <Route exact path="/register" element={<Register setTokenFn={setToken} />}></Route>
          <Route exact path="/listing/edit/:id" element={<EditListing token={token}/>}></Route>
          <Route exact path="/listing/hostedListings" element={<HostedListings token={token} email={email} />}></Route>
          <Route exact path="/listing/hostedListings/newListing" element={<NewListing token={token}/>}></Route>
          <Route exact path="/listing/:listingId" element={<Listing token={token} email={email}/>}></Route>
          <Route exact path="/listing/publish/:id" element={<PublishListing token={token}/>}></Route>
          <Route exact path="/listing/history/:listingId" element={<BookingHistory token={token}/>}></Route>
          <Route exact path="/" element={<LandingPage token={token}/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Site;
