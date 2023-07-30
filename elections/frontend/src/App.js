import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import UserLogin from './Pages/UserLogin/UserLogin';
import UserSignUp from './Pages/UserSignUp/UserSignUp';
import CreateConstituency from './Pages/CreateConstituency/CreateConstituency';
import HomePage from './Pages/HomePage/HomePage';
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/elections/admin/create/constituency' element={<CreateConstituency />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
