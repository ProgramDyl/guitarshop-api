import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Dylan's Guitar Shop</h1>

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
