import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function VoterLogout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await axiosInstance.get('/logout/voter');
        if (response.status === 200) {
            localStorage.removeItem('voterId');
            navigate('/voter/login');
        }
        else {
            alert('Try later !');
        }
    }
    handleLogout();
    return null;
}

