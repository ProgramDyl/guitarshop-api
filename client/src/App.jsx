import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Dylan's Guitar Shop</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Nav />
      </div>
      
      
      <hr />
      <div>
        <p>Guitars</p>
        <hr></hr>
        <Outlet />
      </div>
    </>
  )
}

export default App
