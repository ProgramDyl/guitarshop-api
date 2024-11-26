import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



//TODO: 


export default function Card(props) {
    return (
        <div className="card mt-3">
            <img 
                src={`${props.apiHost}/public/${props.guitars.image_filename}`}
                className="thumbnail"
                alt={`${props.guitars.year} ${props.guitars.brand} ${props.guitars.model}`}
            />
            <div className="guitar-info text-center mt-3">
                <h4 className="card-title">{`${props.guitars.brand.model} ${props.guitars.model}`}</h4>
                <div className="card-description">
                    <h3 className="description">{`${props.guitars.description}`}</h3>
                </div>
            </div>
        </div>
    )
}