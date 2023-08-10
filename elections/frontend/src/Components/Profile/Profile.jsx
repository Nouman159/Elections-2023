import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axiosInstance from '../../axios'
import styles from './Profile.module.css'
// import url from '../../../../backend/images'
export default function Profile() {
    const id = localStorage.getItem('voterId');
    const [data, setData] = useState(null);
    useEffect(() => {

        const handleProfile = async (e) => {
            try {
                const response = await axiosInstance(`/elections/voter/profile/${id}`);
                const info = response.data.voter;
                console.log(info.pic);
                setData(info);
            } catch (err) {
                if (err.response.status === 404) {
                    alert('try later');
                }
            }
        }
        handleProfile();
    }, [id])
    if (data === null) {
        return <div class="text-center ">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <>
            <div className="navbar">
                <Navbar />
            </div>
            <div className={`${styles.content}`}>
                <section className={`vh-100`} style={{ backgroundColor: '#f4f5f7' }}>
                    <div className="container py-5 h-100">
                        <div className={`row d-flex justify-content-center align-items-center ${styles.margin_top} h-100`}>
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                    <div className="row g-0">
                                        <div className={`col-md-4 ${styles.gradient_custom} text-center text-white`} style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                            <img src={`http://localhost:5000/images/${data.pic}`} alt="Profile Pic" className="img-fluid my-5" style={{ width: '120px', height: '120px' }} />
                                            <h5>{data.name}</h5>
                                            <p>Voter</p>
                                            <i className="far fa-edit mb-5"></i>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Profile</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">{data.email}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>CNIC</h6>
                                                        <p className="text-muted">{data.cnic
                                                        }</p>
                                                    </div>
                                                </div>
                                                <h6>Others</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Constituency</h6>
                                                        <p className="text-muted">{data.constituency}</p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Status</h6>
                                                        <p className="text-muted">Voter</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
