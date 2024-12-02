import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiHost = import.meta.env.VITE_API_HOST;

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Call the logout endpoint on the server
        fetch(`${apiHost}/api/users/logout`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((response) => response.text()) // Expecting plain text response
        .then((data) => {
            console.log('Logout response:', data);
            // Display the logout success message
            setTimeout(() => {
                navigate('/login'); 
            }, 2000); // 2 second delay
        })
        .catch((error) => {
            console.error('Logout failed:', error);
            navigate('/login'); 
        });
    }, [navigate]);

    return (
        <div className="logout-container">
            <h1>You have been logged out</h1>
            <p>Redirecting to login page...</p>
        </div>
    );
}
