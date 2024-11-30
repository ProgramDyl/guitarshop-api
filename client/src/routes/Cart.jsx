import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const apiHost = import.meta.env.VITE_API_HOST;

// display individual cart items
const CartItem = ({ product }) => {
  
  //*  
  //*NOTE: 
  //* toFixed() was provided by asking CoPilot, I was having  
  //* crashes before I asked it what to do. Specifically,
  //* my cost was displaying with 12 decimal places. So when 
  //* I changed the datatype to float, it would throw an error. 
  //* I asked co-pilot if there was a quick way to fix this. 
  
  const total = (product.cost * product.quantity).toFixed(2); 
  return (
    <div className="cart-item">
      <img src={`${apiHost}/${product.image_filename}`} alt={product.name} className="img-thumbnail" />
      <h4>{product.brand} {product.model}</h4>
      <p>price: ${product.cost.toFixed(2)}</p>
      <p>quantity: {product.quantity}</p>
      <p>total: ${total}</p>
    </div>
  );
};

export default function Cart() {
  
  //init products (setter) 
  //cookies init!!
  const [cookies] = useCookies(['cart']);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // parse cart cookie to get product ids and quantities
  const parseCartCookie = () => {

    const cartCookie = cookies.cart || '';
    //split what's in the list by the comma 
    const productIds = cartCookie.split(',');
    const quantities = {}; //init empty obj
    
    productIds.forEach(id => { 
      quantities[id] = (quantities[id] || 0) + 1; //checks if id matches current. if it does, add 1 to the product total.  
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
        console.error('failed to fetch data');
        return [];
      }
    } catch (error) {
      console.error('error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    const quantities = parseCartCookie();
    const uniqueProductIds = Object.keys(quantities);

    //grab guitars, convert to data (see mike's demo)
    fetchAllGuitars().then(data => {

      // filter the fetched guitars to include only those in the cart
      const filteredProducts = data.filter(product => uniqueProductIds.includes(product.product_id.toString()))
        // add quantity to each product
        .map(product => ({ ...product, quantity: quantities[product.product_id] })); 
      setProducts(filteredProducts);
      setLoading(false);
    }).catch(error => {
      console.error('error fetching data:', error);
      setLoading(false);
    });
  }, [cookies.cart]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // calculate subtotal cost source: co-pilot
  const calculateSubtotal = () => {
    const subtotal = products.reduce((total, product) => total + (product.cost * product.quantity), 0);
    return subtotal.toFixed(2); ///toFixed source: CoPilot 
  };

  return (
    <div className="cart-container text-center">
      <h1>your shopping cart</h1>
      {products.map(product => (
        <CartItem key={product.product_id} product={product} />
      ))}
      <h3>subtotal: ${calculateSubtotal()}</h3>
      <div>
        <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">continue shopping</button>
        <button onClick={() => navigate('/checkout')} className="btn btn-primary mt-3 ml-2">complete purchase</button>
      </div>
    </div>
  );
}
