import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Nav({ isLoggedIn }) {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: 'linear-gradient(135deg, #003135, #141619)', borderBottom: '2px solid #e94560' }}>
           
            <Link to="/" className="btn btn-primary" backgroundColor="#303C6C" style={{ margin: '0 10px' }}>Home</Link>
           
            {!isLoggedIn && <Link to="/login" className="btn btn-primary" style={{ margin: '0 10px' }}>Login</Link>}
           
            <Link to="/cart" className="btn btn-primary bi bi-cart" style={{ margin: '0 10px' }}></Link>
            
            {isLoggedIn && <Link to="/logout" className="btn btn-primary" style={{ margin: '0 10px' }}>Logout</Link>}
        </nav>
    );
}

