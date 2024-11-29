import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';

export default function Home() {

    const [guitars, setGuitars] = useState([]); //init as empty array

    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + '/api/guitars/all';

    //get guitars from API
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/api/guitars/all');
                if (response.ok) {
                    const data = await response.json();
                    console.log("Guitar fetched: ", data);
                    setGuitars(data);
                } else {
                    console.error("Failed to fetch: ", response.status);
                    console.log("Response body: ", await response.text());
                    setGuitars(null);
                }
            } catch (error) {
                console.error('Error fetching skateboards: ', error);
            }
        }
        fetchData();
    }, []);

    if (guitars === null) {
        return <p>Loading... </p>; //loading state
    }

    return (
        <>
            <div>
                <h1>Our Inventory</h1>
                <div className="card-row">
                {
                    guitars.length > 0 ?
                    guitars.map(guitars => (
                        <Card guitars={guitars} apiHost={apiHost} showLinks={true} />
                    )) :
                    <p>No guitars... </p>
                }
                </div>
        
            </div>
         </>
    );
}

