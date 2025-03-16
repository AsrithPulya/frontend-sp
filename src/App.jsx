import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Registration';
import TransactionSuccess from './components/Transaction_Sucess';
import ProfileWizard from './components/Wizard/Profile_Wizard';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products';
import UserFormPage from './components/Create-User';
import Sidebar from './components/Shared/Sidebar';
import Navbar from './components/Shared/Navbar';

// Layout component for pages with Sidebar and Navbar
const MainLayout = ({ children }) => {
  const location = useLocation();
  console.log("MainLayout rendered, location:", location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={() => {}} />
      <div className="flex flex-1">
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
        <main className="flex-1 ml-80" style={{ marginTop: "64px" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
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
            <MainLayout>
              <TransactionSuccess />
            </MainLayout>
          }
        />
        <Route
          path="/Profile"
          element={
            <MainLayout>
              <ProfileWizard />
            </MainLayout>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/Products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/create-user"
          element={
            <MainLayout>
              <UserFormPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;