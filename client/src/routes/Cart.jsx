import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const apiHost = import.meta.env.VITE_API_HOST;

//TODO: 
  // - user can remove product from cart 
  // - should remove product from cookie 
  // - display subtotal, tax, and grand-total


// display individual cart items
const CartItem = ({ product }) => {
  const total = (product.cost * product.quantity).toFixed(2); // round total to 2 decimal places
  return (
    <div className="cart-item">
      <img src={`${apiHost}/${product.image_filename}`} alt={product.name} className="img-thumbnail" />
      <h4>{product.brand} {product.model}</h4>
      <p>price: ${product.cost.toFixed(2)}</p> {/* round price to 2 decimal places */}
      <p>quantity: {product.quantity}</p>
      <p>total: ${total}</p>
    </div>
  );
};

export default function Cart() {
  const [cookies] = useCookies(['cart']);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // parse cart cookie to get product ids and quantities
  const parseCartCookie = () => {
    const cartCookie = cookies.cart || '';
    console.log('Cart Cookie:', cartCookie); // Log the cart cookie
    if (typeof cartCookie !== 'string') {
      console.error('Cart cookie is not a string:', cartCookie);
      return {};
    }
    const productIds = cartCookie.split(',');
    const quantities = {}; // init empty obj
    productIds.forEach(id => {
      quantities[id] = (quantities[id] || 0) + 1; // checks if id matches current. if it does, add 1 to the product total.
    });
    return quantities;
  };

  // fetch all guitars from api
  const fetchAllGuitars = async () => {
    const apiUrl = `${apiHost}/api/guitars/all`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    const quantities = parseCartCookie();
    const uniqueProductIds = Object.keys(quantities);

    fetchAllGuitars().then(data => {
      const filteredProducts = data.filter(product => uniqueProductIds.includes(product.product_id.toString()))
        .map(product => ({ ...product, quantity: quantities[product.product_id] })); // add quantity to each product
      setProducts(filteredProducts);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [cookies.cart]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // calculate subtotal cost
  const calculateSubtotal = () => {
    const subtotal = products.reduce((total, product) => total + (product.cost * product.quantity), 0);
    return subtotal.toFixed(2); // round subtotal to 2 decimal places
  };

  return (
    <div className="cart-container text-center">
      <h1>Your Shopping Cart</h1>
      {products.map(product => (
        <CartItem key={product.product_id} product={product} />
      ))}
      <h3>Subtotal: ${calculateSubtotal()}</h3>
      <div>
        <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">Continue Shopping</button>
        <button onClick={() => navigate('/checkout')} className="btn btn-primary mt-3 ml-2">Complete Purchase</button>
      </div>
    </div>
  );
}
