import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react'; // Import useState
import Login from './components/Auth/Login';
import Register from './components/Auth/Registration';
import TransactionSuccess from './components/Transaction_Sucess';
import ProfileWizard from './components/Wizard/Profile_Wizard';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products';
import UserFormPage from './components/Create-User';
import Sidebar from './components/Shared/Sidebar';
import Navbar from './components/Shared/Navbar';
import BankDetails from './components/Payment';
import CreateDistributor from './components/Create-Distributor';

// Layout component for pages with Sidebar and Navbar
const MainLayout = ({ children, isOpen, toggleSidebar }) => {
  const location = useLocation();
  console.log("MainLayout rendered, location:", location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 transition-all duration-500 ${
            isOpen ? 'ml-72' : 'ml-0'
          }`}
          style={{ marginTop: '64px' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // Toggle the sidebar state
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without Sidebar/Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/User-Registration" element={<Register />} />

        {/* Routes with Sidebar/Navbar wrapped in MainLayout */}
        <Route
          path="/User-Transaction-Success"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <TransactionSuccess />
            </MainLayout>
          }
        />
        <Route
          path="/Profile"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <ProfileWizard />
            </MainLayout>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/Products"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/create-user"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <UserFormPage />
            </MainLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <BankDetails />
            </MainLayout>
          }
        />
        <Route
          path="/create-distributor"
          element={
            <MainLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
              <CreateDistributor />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;