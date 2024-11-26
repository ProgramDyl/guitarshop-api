import { Link } from 'react-router-dom';
import Home from '../routes/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Nav() {
    return (
        <>

            <Link to="/" className="btn btn-outline-secondary">Home </Link>
            
            <Link to="/login" className="btn btn-outline-secondary">Login </Link>
            
            <Link to="/cart" className="btn btn-outline-secondary">Cart </Link>
            
            <Link to="/logout" className="btn btn-outline-secondary">Logout </Link>
           
        </>
    );
}