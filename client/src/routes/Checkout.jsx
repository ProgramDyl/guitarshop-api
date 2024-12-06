import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Checkout() {

//state variables
const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    creditCard: '',
    expDate: '',
    cvv: '',
});

//init state var for errors
const [errors, setErrors] = useState({});

const navigate = useNavigate();

//state from parent component 
const { isLoggedIn } = useOutletContext();

//Log current state values for debugging (optional)
console.log("Form state:", form);
console.log("errors state:", errors);
console.log("is logged in:", isLoggedIn);

if (!isLoggedIn) {
    return (
        <div>
            <h1>Uh Oh!</h1>
            <p>Please <Link to="/login">login</Link> to proceed with checkout.</p>

            <p>Make an <Link to="/signup">Account</Link> if you don't already have one!</p> 
        </div>
    );
}

//collect mailing addy and cc info
return (
    <div className="main-content">
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Mailing Address</label>
                    <input type="text" {...register('address', { required: true })} placeholder="Enter address" />
                    {errors.address && <span className="error-message">Address is required.</span>}
                </div>
                <div className="form-group">
                    <label>Credit Card Information:</label>
                    <input type="text" {...register('Credit Card Number', { required: true })} placeholder="Enter password" />
                    {errors.creditCard && <span className="error-message">Credit card number is required</span>}
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="date" name="expiryDate" {...register('expiryDate', { required: true })} placeholder="Card Expiry Date:" />
                    {errors.expDate && <span className="error-message">Expiry date is required.</span>}
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input type="password" {...register('cvv', { required: true })} placeholder="cvv" />
                    {errors.cvv && <span className="error-message">cvv is required. </span>}
                </div>
                {serverError && <span className="error-message">{serverError}</span>}
                {successMessage && <span className="success-message">{successMessage}</span>}
                <div>
                    <button onClick={() => navigate('/confirmation')} className="btn btn-primary mt-3 ml-2">Complete Purchase</button>
                </div>
            </form>            
        </div>       
        
    </div>
);
}