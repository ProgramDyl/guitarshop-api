import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function DetailsCard(props) {
    return (
        <div className="card-mt-3">
            <div className details-list text-center mt-3>
                <list>
                    `Body: ${props.guitars.color} ${props.guitars.body},
                     Electric: ${props.guitars.is_electric},
                     Scale: ${props.guitars.scale},  
                    
                </list>
            </div>
    
        </div>
    )
}