import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from '../src/components/Auth/Registration';
import TransactionSuccess from './components/Transaction_Sucess';
import ProfileWizard from './components/Wizard/Profile_Wizard';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products';
function App() {
  return (

        <BrowserRouter>
            <Routes>
              {/* Unprotected Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/User-Registration" element={<Register />} />
              <Route path="/User-Transaction-Success" element={<TransactionSuccess />} />
              <Route path="/Profile" element={<ProfileWizard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Products" element={<Products />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
