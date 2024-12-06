import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterOwner from './pages/RegisterOwner';
import Owners from './pages/Owners';
import OwnerProperties from './components/Properties for owner/OwnersProperties';
import AllProperties from './components/Properties for client/AllProperties';
import Forum from './components/Forum/Forum';
import MyProfile from './components/Profile/MyProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Footer from './components/Footer';
import ApproveReservations from './components/Properties for owner/ApproveReservations';
import Reserved from './components/Properties for owner/Reserved';
import MyReservations from './components/Properties for client/MyReservations';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addOwner' element={<RegisterOwner />} /> 
            <Route path='/owners' element={<Owners />} /> 
            <Route path='/ownersProperties' element={<OwnerProperties />} /> 
            <Route path='/allProperties' element={<AllProperties />} /> 
            <Route path='/forum' element={<Forum />} />
            <Route path='/myProfile' element={<MyProfile />} />
            <Route path='/changePassword' element={<ChangePassword />} />
            <Route path='/approveReservations' element={<ApproveReservations />} />
            <Route path='/reserved' element={<Reserved />} />
            <Route path='/myReservations' element={<MyReservations />} />
          </Routes>
        </div>
      </Router>
      
      <ToastContainer/>
    </>
  );
}

export default App;
