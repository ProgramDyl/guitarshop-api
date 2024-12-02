import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Home from '../routes/Home';

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState();
    const [successMessage, setSuccessMessage] = useState(null);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = `${apiHost}/api/users/login`; 
    const navigate = useNavigate();

    // handle form submission 
    const onSubmit = async (data) => {
        //map the form data
        const formattedData = {
            email: data.email,
            password: data.password
        };
        console.log('Submitting data: ', formattedData);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                //send data
                body: JSON.stringify(formattedData),
            });

            if(!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to log in.');
            }

            setSuccessMessage('Log-in Successful!');
            setServerError(null);
        } catch (error) {
            console.error('Login error occurred: ', error);
            setServerError(error.message);
            setSuccessMessage(null);
        }
    };

    return (
        <div className="main-content">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" {...register('email', { required: true })} placeholder="Enter email" />
                        {errors.email && <span className="error-message">Email is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" {...register('password', {required: true })} placeholder="Enter password" />
                        {errors.password && <span className="error-message">Password is required</span>}                        
                    </div>
                    {serverError && <span className="error-message">{serverError}</span>}
                    {successMessage && <span className="success-message">{successMessage}</span>}
                    &nbsp;
                    <br></br>
                    <br></br>
                    <div>
                        <button onClick={() => navigate('/')} type="submit" className="btn-submit">Log In</button>
                    </div>
                </form>
                <Link to="/signup">Don't have an account? Signup here</Link>
            </div>
        </div>
    );
}