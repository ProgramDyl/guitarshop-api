import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Cart() {
  // initialize cookies and state
  const [cookies, setCookie] = useCookies(['cart']);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // parse cart cookie (product ids and quantities)
  const parseCartCookie = () => {
    const cartCookie = cookies.cart || '';
    const productIds = cartCookie.split(',');
    const quantities = {};
    productIds.forEach(id => {
      quantities[id] = (quantities[id] || 0) + 1;
    });
    return quantities;
  };

  // fetch product details (product ids)
  const fetchProductData = async (productIds) => {
    const response = await fetch(`/api/guitars?ids=${productIds.join(',')}`);
    const products = await response.json();
    return products;
  };

  // useEffect fetches new data when cookie changes
  useEffect(() => {
    const quantities = parseCartCookie();
    const uniqueProductIds = Object.keys(quantities);
    
    if (uniqueProductIds.length > 0) {
      fetchProductData(uniqueProductIds).then(data => {
        // map product data to state
        setProducts(data.map(product => ({ ...product, quantity: quantities[product.product_id] })));
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [cookies.cart]);

  if (loading) {
    // display loading message
    return <p>Loading...</p>;
  }

  // calculate subtotal cost
  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + (product.cost * product.quantity), 0);
  };

  return (
    <div className="cart-container text-center">
      <h1>Your Shopping Cart</h1>
      {products.map(product => (
        // render each cart item
        <CartItem key={product.product_id} product={product} />
      ))}
      <h3>Subtotal: ${calculateSubtotal()}</h3>
      <div>
        {/* buttons for navigation */}
        <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">Continue shopping</button>
        <button onClick={() => navigate('/checkout')} className="btn btn-primary mt-3 ml-2">Complete purchase</button>
      </div>
    </div>
  );
}

// display individual cart items
const CartItem = ({ product }) => (
  <div className="cart-item">
    <img src={`${apiHost}/${product.image_filename}`} alt={product.name} className="img-thumbnail" />
    <h4>{product.brand} {product.model}</h4>
    <p>Price: ${product.cost}</p>
    <p>Quantity: {product.quantity}</p>
    <p>Total: ${product.cost * product.quantity}</p>
  </div>
);
