import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Login from './Login';
import Logout from './Logout';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';

function Header() {
  const {isAuthenticated, user } = useAuth0();
  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log(user)
  }, [isAuthenticated]);
  return (


    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid py-3">
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
             aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Nav.Link className="nav-link" href="/">Home</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" href="/categories">Categories</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" href="/about">About</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" href="/signup">sign up</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" href="/contact">Contact</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link className="nav-link" href="/profile">Profile</Nav.Link>
                    </li>
                    
                </ul>
            <Nav.Link className="navbar-brand mx-auto fw-bold mb-lg-0" href="/">MY SHOP</Nav.Link>
            {isAuthenticated?<><h5>{user.nickname}</h5><img src={user.picture} 
            alt={user.name} width={30} height={30} style={{marginRight:"10px", marginLeft:"10px"}}/><Logout/></>:<Login/>}

            </div>
        </div>
        
    </nav>
</>

  );
}

export default withAuth0(Header);