import './App.css';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Menu from './components/menu/Menu';
import Context from './components/context/Context';
import Address from './components/address/Address';

function App() {
  return (
    <div>
      <Context>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
          </Routes>
        </Router>
      </Context>
    </div>
  );
};

export default App;