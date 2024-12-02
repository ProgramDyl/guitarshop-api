import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';



function App() {

//  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 //get state variable
 //pass into nav as prop
 //play around with changing it
 //then use `useOutletContext` to path method into login and logout pages 
// after successful login, set true
//after logout, set false

  return (
    <>
      <h1 style={{ textAlign: 'center', backgroundColor: 'darkgrey' }}>Dylan's Guitar Shop</h1>

      <div style={{ display: 'flex', padding: '0px', justifyContent: 'center', alignItems: 'center' }}>
        <Nav />
      </div>
      
      
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        
        <Outlet />
      </div>
    </>
  )
}

export default App
