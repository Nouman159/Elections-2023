import React, { useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogout() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await axiosInstance.get('/admin/elections/logout');
        if (response.status === 200) {
            localStorage.removeItem('adminId');
            navigate('/admin/login');
        }
        else {
            alert('Try later !');
        }
    }
    handleLogout();
    return null;
}

