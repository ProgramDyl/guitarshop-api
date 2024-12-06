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

//state from parent component 
const { isLoggedIn } = useOutletContext();

//Log current state values for debugging (optional)
console.log("Form state:", form);
console.log("errors state:", errors);
console.log("is logged in:", isLoggedIn);

if (!isLoggedIn) {
    return (
        <div>
            <h1>Checkout</h1>
            <p>This is the checkout page</p>
        </div>
    );
}
}