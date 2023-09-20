import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Signup() {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({ screen_hint: 'signup' });
  };

  return (
    <div>
      <h4>Sign Up</h4>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;