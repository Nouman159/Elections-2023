import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import './CandidateProfile.css'
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';

export default function CandidateProfile() {
    const navigate = useNavigate();
    const candidateId = useParams();
    const id = candidateId.candidateId;
    const [profile, setProfile] = useState();
    useEffect(() => {
        const handleProfile = async () => {
            try {
                const response = await axiosInstance(`/candidate/profile/${id}`);
                setProfile(response.data.profile);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 400) {
                        alert('Try Later');
                    }
                    if (err.response.status === 401) {
                        localStorage.removeItem('voterId');
                        navigate('/voter/login');
                    }
                }
            }
        }
        handleProfile();
    }, [id, navigate])
    return (
        <div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='content cand_profile'>
                {profile ? (
                    <section>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{profile.voter.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{profile.voter.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Party</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{profile.party}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Constituency</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{profile.constituency}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Description</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{profile.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (<>
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </>)}
            </div>
        </div>
    );

}
