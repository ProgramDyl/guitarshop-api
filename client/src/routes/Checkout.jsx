import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import '../ui/Checkout.css';

export default function Checkout() {
    // Initialize state variables for form inputs
    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        province: '',
        postal_code: '',
        creditCard: '',
        expDate: '',
        cvv: ''
    });

    // init state variables
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // cart items state
    const [cartItems, setCartItems] = useState([]);

    // lift state of isLoggedIn to parent component
    const { isLoggedIn, setIsLoggedIn } = useOutletContext();

    // extract cart data
    const [cookies, setCookie, removeCookie] = useCookies(['cart', 'authToken']);
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = cookies.authToken;
        if (token) {
            // validate token
            setIsLoggedIn(true);
        }

        const parseCartCookie = () => {
            const cartCookie = cookies.cart || '';
            const productIds = cartCookie.split(',');
            const quantities = {}; // init empty obj
            productIds.forEach(id => {
                quantities[id] = (quantities[id] || 0) + 1; // checks if id matches current. if it does, add 1 to the product total.
            });
            return quantities;
        };

        const fetchCartItems = async () => {
            const quantities = parseCartCookie();
            const uniqueProductIds = Object.keys(quantities);

            const apiUrl = `${import.meta.env.VITE_API_HOST}/api/guitars/all`;
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    const filteredProducts = data.filter(product => uniqueProductIds.includes(product.product_id.toString()))
                        .map(product => ({ ...product, quantity: quantities[product.product_id] })); // add quantity to each product
                    setCartItems(filteredProducts);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCartItems();
    }, [cookies, setIsLoggedIn]);

    // input chgs
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // validate
    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.address) newErrors.address = 'Address is required';
        if (!form.city) newErrors.city = 'City is required';
        if (!form.province) newErrors.province = 'Province is required';
        if (!form.postal_code) newErrors.postal_code = 'Postal code is required';
        if (!form.creditCard) newErrors.creditCard = 'Credit card number is required';
        if (!form.expDate) newErrors.expDate = 'Expiration date is required';
        if (!form.cvv) newErrors.cvv = 'CVV is required';
        return newErrors;
    };

    // //form submission::
    const handleSubmit = (e) => {
        //tip: default submission form behaviour is bad lol
        e.preventDefault();
        console.log('Submit button clicked');

        //validate
        const validationErrors = validate();
        setErrors(validationErrors);

        //no errors? proceed with form
        if (Object.keys(validationErrors).length === 0) {
            console.log('Validation passed');
            console.log('Form submitted:', form);
            console.log('Cart items:', cartItems);
            
            //success messages: 
            setSuccessMessage('Purchase successful!');
            //clears server errors
            setServerError('');

            removeCookie('cart'); //remove cookie
            console.log('Navigating to confirmation page');
            navigate('/confirmation'); // nav to confirmation page
        } else {
            console.log('Validation failed:', validationErrors);
            setServerError('Cannot complete purchase. Please correct the errors and try again.');
        }
    };

    // //if user is NOT logged in, make em log in!
    if (!isLoggedIn) {
        return (
            <div>
                <h1>Checkout</h1>
                <p>Please <Link to="/login">login</Link> to proceed with checkout.</p>
            </div>
        );
    }

    //form ui!
    return (
        <div>
            <h1>Checkout</h1>
            <div className="cart-summary">
                <h2>Order Summary</h2>
                {cartItems.map(item => (
                    <div key={item.product_id}>
                        <p>{item.brand} {item.model} x {item.quantity} - ${(item.cost * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} required />
                    {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={form.city} onChange={handleChange} required />
                    {errors.city && <p className="error">{errors.city}</p>}
                </div>
                <div className="form-group">
                    <label>Province</label>
                    <input type="text" name="province" value={form.province} onChange={handleChange} required />
                    {errors.province && <p className="error">{errors.province}</p>}
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postal_code" value={form.postal_code} onChange={handleChange} required />
                    {errors.postal_code && <p className="error">{errors.postal_code}</p>}
                </div>
                <br />
                <h3>Credit Card Info:</h3>
                <div className="form-group">
                    <label>Credit Card Number</label>
                    <input type="text" name="creditCard" value={form.creditCard} onChange={handleChange} required />
                    {errors.creditCard && <p className="error">{errors.creditCard}</p>}
                </div>
                <div className="form-group">
                    <label>Expiration Date</label>
                    <input type="text" name="expDate" value={form.expDate} onChange={handleChange} required />
                    {errors.expDate && <p className="error">{errors.expDate}</p>}
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input type="text" name="cvv" value={form.cvv} onChange={handleChange} required />
                    {errors.cvv && <p className="error">{errors.cvv}</p>}
                </div>
                {serverError && <p className="error">{serverError}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit" className="btn btn-primary mt-3 ml-2">Complete Purchase</button>
            </form>
        </div>
    );
}
