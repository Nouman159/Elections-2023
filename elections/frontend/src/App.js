import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import { NotifyProvider } from './AdminPages/UseContext/UseContext';

import UserLogin from './Pages/UserLogin/UserLogin';
import UserSignUp from './Pages/UserSignUp/UserSignUp';
import CreateConstituency from './Pages/CreateConstituency/CreateConstituency';
import HomePage from './Pages/HomePage/HomePage';
import VoterHomePage from './Pages/VoterHomePage/VoterHomePage';
import Profile from './Components/Profile/Profile';
import AdminSignUp from './AdminPages/AdminSignUp/AdminSignUp';
import AdminLogin from './AdminPages/AdminLogin/AdminLogin';
import CreateParty from './Pages/CreateParty/CreateParty';
import AdminDashboard from './AdminPages/AdminDashboard/AdminDashboard';
import AdminLogout from './AdminPages/AdminLogout/AdminLogout';
import CandidateRequest from './Pages/RequestCandidate/RequestCandidate';
import CandidateRequests from './AdminPages/CandidateRequests/CandidateRequests';

function App() {

  return (
    <NotifyProvider>

      <BrowserRouter >
        <Routes>
          <Route path='voter/login' element={<UserLogin />} />
          <Route path='voter/signup' element={<UserSignUp />} />
          <Route path='elections/voter/profile' element={< Profile />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/elections/voter/home/page' element={<VoterHomePage />} />
          <Route path='/elections/request/candidate/:id' element={<CandidateRequest />} />

          <Route path='/elections/admin/create/constituency' element={<CreateConstituency />} />
          <Route path='/elections/admin/create/party' element={<CreateParty />} />

          <Route path='/admin/signup' element={< AdminSignUp />} />
          <Route path='/admin/login' element={< AdminLogin />} />
          <Route path='/elections/admin/dashboard' element={< AdminDashboard />} />
          <Route path='/elections/admin/requests/management' element={< CandidateRequests />} />
          <Route path='/elections/admin/logout' element={< AdminLogout />} />

        </Routes>
      </BrowserRouter>
    </NotifyProvider>
  );
}

export default App;
