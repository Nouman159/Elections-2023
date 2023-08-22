import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios';
import CandidateRequest from '../RequestCandidate/RequestCandidate';
import Navbar from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function ViewCandidateShip() {
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
                    return (
                        <div className='content'>Try Later</div>
                    )
                }
            }
        }
        handleCandidate();
    }, [id]);
    return (
        <div>
            <Navbar />
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
                                        <button type="button" class="btn btn-primary">
                                            <Link className='text-black text-decoration-none' to={`/voters/halka/${candidateId}`}>
                                                View
                                            </Link>
                                        </button>
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
