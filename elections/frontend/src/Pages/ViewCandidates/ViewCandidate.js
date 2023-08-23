import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ViewCandidate.css';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';

export default function ViewCandidate() {
    const navigate = useNavigate();
    const voterId = localStorage.getItem('voterId');
    const [candidates, setCandidates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleCandidates = async () => {
            try {
                const response = await axiosInstance.get(`/get/candidate/lists/${voterId}`);
                setCandidates(response.data.list);
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
            } finally {
                setIsLoading(false);
            }
        };
        handleCandidates();
    }, [voterId, navigate]);

    return (
        <div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='content'>
                {isLoading ? (
                    <div className='spinner-border text-success' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                ) : candidates.length > 0 ? (
                    <div>
                        <h2>Candidates from your constituency</h2>
                        {candidates.map((candidate) => (
                            <div className='options' key={candidate._id}>
                                <p className='cand_info'>
                                    <a href={`/candidate/profile/${candidate._id}`}>
                                        <b>&nbsp;&nbsp; {candidate.voter.name} , </b>
                                        {candidate.party}
                                    </a>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No candidates available for this constituency.</p>
                )}
            </div>
        </div>
    );
}
