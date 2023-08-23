import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../../axios';
import CandidateRequest from '../RequestCandidate/RequestCandidate';
import Navbar from '../../Components/Navbar/Navbar';

export default function ViewCandidateShip() {
    const navigate = useNavigate();
    const id = localStorage.getItem('voterId');
    const candidateId = localStorage.getItem('candidateId');
    const [isCandidate, setIsCandidate] = useState();
    useEffect(() => {
        const handleCandidate = async () => {
            try {
                const response = await axiosInstance.get(`/check/status/${id}`);
                if (response.data.data.status)
                    setIsCandidate(response.data.data.status)
                localStorage.setItem('candidateId', response.data.data._id)
            }
            catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem('voterId');
                        navigate('/voter/login');
                    }
                    return (
                        <div className='content'>Try Later</div>
                    )
                }
            }
        }
        handleCandidate();
    }, [id, navigate]);
    return (
        <div>
            <div className='mt-2'>
                <Navbar />
            </div>
            <div className='content'>

                {isCandidate ? (

                    <div>
                        {isCandidate === 'voter' ? (<div>
                            <CandidateRequest />
                        </div>) : (<div>
                            {isCandidate === 'pending' ? (<div className='content'>
                                Application is processing
                            </div>) : (
                                <div>
                                    <h2>
                                        View Your Halka's Voters List
                                    </h2>
                                    <div>
                                        <Link className='text-black text-decoration-none' to={`/voters/halka/${candidateId}`}>
                                            <button type="button" className="btn btn-primary">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>)}
                    </div>
                ) : (<div>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
