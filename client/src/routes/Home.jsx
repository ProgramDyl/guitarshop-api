import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Card from '../ui/Card';
import { Link } from 'react-router-dom';

export default function Home() {
    // initialize state for guitars
    const [guitars, setGuitars] = useState([]);

    // set api host and url for fetching data
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + '/api/guitars/all';

    // fetch guitars when component mounts or apiUrl changes
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Guitars fetched: ", data);
                    setGuitars(data);
                } else {
                    console.error("Failed to fetch: ", response.status);
                    setGuitars(null);
                }
            } catch (error) {
                console.error('Error fetching guitars: ', error);
            }
        }
        fetchData();
    }, [apiUrl]);

    // display loading message if guitars are null
    if (guitars === null) {
        return <p>Loading... </p>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px', textAlign: 'center' }}>
            <h1 style={{ color: '#6200ea', marginBottom: '20px', textAlign: 'center' }}>Our Inventory</h1>
            <div className="card-row" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                {guitars.length > 0 ? 
                    guitars.map(guitar => (
                        <Card key={guitar.id} guitars={guitar} apiHost={apiHost} showLinks={true} />
                    )) : 
                    <p>No guitars available...</p>
                }
            </div>
        </div>
    );
}
