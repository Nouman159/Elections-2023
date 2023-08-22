import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import UserLogin from './Pages/UserLogin/UserLogin';
import UserSignUp from './Pages/UserSignUp/UserSignUp';
import CreateConstituency from './Pages/CreateConstituency/CreateConstituency';
import HomePage from './Pages/HomePage/HomePage';
import VoterHomePage from './Pages/VoterHomePage/VoterHomePage';
import Profile from './Components/Profile/Profile';
import AdminLogin from './AdminPages/AdminLogin/AdminLogin';
import CreateParty from './Pages/CreateParty/CreateParty';
import AdminDashboard from './AdminPages/AdminDashboard/AdminDashboard';
import AdminLogout from './AdminPages/AdminLogout/AdminLogout';
import CandidateRequests from './AdminPages/CandidateRequests/CandidateRequests';
import CreateElection from './AdminPages/CreateElection/CreateElection';
import Voting from './Pages/Voting/Voting';
import ViewCandidate from './Pages/ViewCandidates/ViewCandidate';
import CandidateProfile from './Pages/CandidateProfile/CandidateProfile';
import VoterLogout from './Pages/VoterLogout/VoterLogout';
import ViewCandidateShip from './Pages/ViewCandidateShip/ViewCandidateShip';
import HalkaVoters from './Pages/HalkaVoters/HalkaVoters';
import Result from './Pages/Result/Result';

function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path='voter/login' element={<UserLogin />} />
        <Route path='voter/signup' element={<UserSignUp />} />
        <Route path='elections/voter/profile' element={< Profile />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/elections/voter/home/page' element={<VoterHomePage />} />
        {/* <Route path='/elections/request/candidate/:id' element={<CandidateRequest />} /> */}
        <Route path='/elections/candidate' element={<ViewCandidateShip />} />
        <Route path='/get/candidate/lists/:id' element={<ViewCandidate />} />
        <Route path='/candidate/profile/:candidateId' element={<CandidateProfile />} />
        <Route path='/voters/halka/:candidateId' element={< HalkaVoters />} />
        <Route path='/elections/vote/:electionId' element={<Voting />} />
        <Route path='/elections/result/:electionId' element={<Result />} />
        <Route path='/logout/voter' element={< VoterLogout />} />

        <Route path='/elections/admin/create/constituency' element={<CreateConstituency />} />
        <Route path='/elections/admin/create/party' element={<CreateParty />} />
        <Route path='/elections/admin/create/election' element={<CreateElection />} />

        <Route path='/admin/login' element={< AdminLogin />} />
        <Route path='/elections/admin/dashboard' element={< AdminDashboard />} />
        <Route path='/elections/admin/requests/management' element={< CandidateRequests />} />
        <Route path='/elections/admin/logout' element={< AdminLogout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
