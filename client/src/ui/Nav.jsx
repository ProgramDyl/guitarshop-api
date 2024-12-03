import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Nav({ isLoggedIn }) {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '2px solid #e94560' }}>
            <Link to="/" className="btn btn-outline-secondary" style={{ margin: '0 10px' }}>Home</Link>
            {!isLoggedIn && <Link to="/login" className="btn btn-outline-secondary" style={{ margin: '0 10px' }}>Login</Link>}
            <Link to="/cart" className="btn btn-outline-secondary bi bi-cart" style={{ margin: '0 10px' }}></Link>
            {isLoggedIn && <Link to="/logout" className="btn btn-outline-secondary" style={{ margin: '0 10px' }}>Logout</Link>}
        </nav>
    );
}
