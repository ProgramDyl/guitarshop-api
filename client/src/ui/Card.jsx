import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../ui/Card.css'

export default function Card(props) {
    return (
        <div className="card mt-3 shadow-sm rounded text-center">
            <div className="thumbnail-container">
                <img 
                    src={`${props.apiHost}/${props.guitars.image_filename}`}
                    className="thumbnail"
                    alt={`${props.guitars.year} ${props.guitars.brand} ${props.guitars.model}`}
                />
            </div>
            <div className="guitar-info mt-3">
                <h4 className="card-title font-weight-bold">{`${props.guitars.brand} ${props.guitars.model}`}</h4>
                <h3 className="card-cost text-success">{`$${props.guitars.cost}`}</h3>
                <div className="card-description">
                    <p className="description text-muted">{`${props.guitars.description}`}</p>
                </div>
            </div>
            {props.showLinks && (
                <div className="mt-3">
                    <Link 
                        to={`/details/${props.guitars.product_id}`} 
                        className="btn btn-primary btn-sm">
                        <i className="bi bi-menu-button-fill"></i> Details
                    </Link>
                </div>
            )}
        </div>
    );
}
