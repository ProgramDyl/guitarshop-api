import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {

  return (
    <>
      <h1>Dylan's Guitar Shop</h1>
      
      <div>
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
