import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const apiHost = import.meta.env.VITE_API_HOST;

export default function Logout() {
  const { setIsLoggedIn } = useOutletContext();  //gets from context, lifts state to parent component
  const navigate = useNavigate();

  useEffect(() => {
    //serverside logout endpoint
    fetch(`${apiHost}/api/users/logout`, {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => response.text()) //expects plaintext resp.
    .then((data) => {
      console.log('Logout response:', data);
      setIsLoggedIn(false); // set the login state to false
      //delay to home for ~effect~
      setTimeout(() => {
        navigate('/'); 
      }, 2000); // 2 second delay
    })
    .catch((error) => {
      console.error('Logout failed:', error);
      navigate('/'); 
    });
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="logout-container">
      <h1>You have been logged out</h1>
      <p>Redirecting to home page...</p>
    </div>
  );
}
