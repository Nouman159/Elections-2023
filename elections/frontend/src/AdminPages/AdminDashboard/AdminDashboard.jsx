import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './AdminDashboard.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import axiosInstance from '../../axios';

export default function AdminDashboard() {
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const handleInfo = async () => {
            try {
                const response = await axiosInstance.get('/admin/elections/dashboard/info');
                setInfo(response.data);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 400) {
                        alert('Try Later');
                    }
                    if (err.response.status === 401) {
                        localStorage.removeItem('adminId');
                        navigate('/admin/login');
                    }
                }
            }
        }
        handleInfo();
    }, [])
    return (
        <div>
            <div >
                <div className='navbar'>
                    <AdminNavbar />
                </div>
                <div className="main-content">
                    <div className="information">
                        {info ? (
                            <>
                                <div className="info">
                                    <h4>Total Candidates</h4>
                                    <div className="cont">{info.numCandidates}</div>
                                </div>
                                <div className="info">
                                    <h4>Total Constituencies</h4>
                                    <div className="cont">{info.numConstituencies}</div>
                                </div>
                                <div className="info">
                                    <h4>Total Parties</h4>
                                    <div className="cont">{info.numParties}</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="info">
                                    <h4>Total Candidates</h4>
                                    <div className="cont">---</div>
                                </div>
                                <div className="info">
                                    <h4>Total Constituencies</h4>
                                    <div className="cont">---</div>
                                </div>
                                <div className="info">
                                    <h4>Total Constituencies</h4>
                                    <div className="cont">---</div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="description">
                        <h3>Elections Management 2023</h3>
                        <div className="desc">
                            Streamline electoral processes with our Elections Management System's powerful admin dashboard. Access real-time data, manage candidates, and oversee voter registration effortlessly, ensuring smooth and secure elections. Simplify the complexity of managing elections and make informed decisions with our intuitive interface.
                        </div>

                    </div>
                </div>
                <div className="footer">
                    <footer className="bg-light text-center text-lg-start">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">About Us</h5>
                                    <p>
                                        Welcome to the Elections Management System Admin Dashboard! Our robust platform is designed to streamline the entire electoral process, providing administrators with powerful tools
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            © 2020 Copyright : &nbsp;
                            <a className="text-dark">Elections23.com</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
