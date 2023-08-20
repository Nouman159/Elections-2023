import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const handleInfo = async () => {
            try {
                const res = await axiosInstance('/admin/elections/dashboard/info');
                setInfo(res.data);
            } catch (error) {
                if (error.res) {
                    if (error.response.status === 400) {
                        return (
                            <div>
                                Try Later
                            </div>
                        )
                    }
                    if (error.response.status === 401) {
                        localStorage.removeItem('adminId');
                        navigate('/admin/login');
                    }
                }
            }
        }
        handleInfo();
    }, [])
    useEffect(() => {
        console.log(info);
    }, [info]);
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
                        hello
                    </div>
                </div>
                <div className="footer">

                    <footer className="bg-light text-center text-lg-start">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">About</h5>
                                    <p>
                                        Welcome to the Elections Management System Admin Dashboard! Our robust platform is designed to streamline the entire electoral process, providing administrators with powerful tools
                                    </p>
                                </div>
                                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Contact Us</h5>
                                    <p>
                                        <b>Email : </b>
                                        noumanarshad15926@gmail.com
                                    </p>
                                    <p>
                                        <b>Phone No : </b>
                                        0300-0012345
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            © 2020 Copyright:
                            <a className="text-dark" href="https://mdbootstrap.com/">Elections23.com</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
