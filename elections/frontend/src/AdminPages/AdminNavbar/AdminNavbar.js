import React, { useEffect, useState } from 'react';
import './AdminNavbar.css'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
    const [requests, setRequests] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const handlePendingRequests = async () => {
            try {

                const response = await axiosInstance.get('/admin/pending/requests')
                setRequests(response.data.count);
            } catch (err) {
                if (err.response.status === 401) {
                    console.log('Unauthorized user');
                    localStorage.removeItem('adminId');
                    navigate('/admin/login');
                }
            }
        };
        handlePendingRequests();
    }, [])
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/elections/admin/dashboard">Election23
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item item-align-center">
                            <a className="nav-link text-white text-decoration-none d-flex align-items-center" href='/elections/admin/requests/management'>
                                Requests
                                {(requests !== 0) ? (
                                    <span class="badge rounded-pill top-0 start-100 translate-middle  bg-danger ms-2">
                                        {requests}
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                ) : (<></>)
                                }
                            </a>
                        </li>
                        <li className="nav-item dropdown item">
                            <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Create
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="create/party">Party</a></li>
                                <li><a className="dropdown-item" href="create/constituency">Constituency</a></li>
                                <li><a className="dropdown-item" href="create/election">Election</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="navbar-nav">

                        <li className="nav-item ">
                            <a className="nav-link active" href="/elections/admin/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div >
        </nav >
    );
}
