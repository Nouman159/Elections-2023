import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios';
import './Voting.css'
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';

export default function Voting() {
    const navigate = useNavigate();
    const electInfo = useParams();
    const electionsId = electInfo.electionId;
    const [electionTime, setElectionTime] = useState({});
    const [electionStatus, setElectionStatus] = useState();
    const [election, setElection] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState();
    const [errors, setErrors] = useState({});
    const voterId = localStorage.getItem('voterId');

    useEffect(() => {
        const getData = async () => {
            try {

                const response = await axiosInstance.get(`/get/elections/candidates/${voterId}`);
                if (!response.status === 200) {
                    return (
                        <div>Try Later</div>
                    )
                }
                setCandidates(response.data.data);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');
                }
            }
        }
        getData();
    }, [voterId]);
    useEffect(() => {
        const getElection = async () => {
            try {

                const response = await axiosInstance.get(`/get/elections/info/${electionsId}`);
                if (response.status === 200) {
                    return (
                        <div>Try Later</div>
                    )
                }
                setElection(response.data.data);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');
                }
            }
        }
        getElection();
    }, [electionsId]);
    useEffect(() => {
        const getStatus = async () => {
            try {

                const response = await axiosInstance.get(`/get/elections/status/${electionsId}`);
                if (response.status === 200) {
                    setElectionStatus('success');
                }
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        localStorage.removeItem('voterId');
                        navigate('/voter/login');
                    }
                    if (err.response.data.completed) {
                        setElectionStatus('completed');
                    }
                    if (err.response.data.delay) {
                        setElectionStatus('wait');
                        setElectionTime(err.response.data.delay);
                    }
                }
            }
        }
        getStatus();
    }, []);
    const handleChange = (e) => {
        setSelectedCandidate({ ...selectedCandidate, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const frontErr = validate(selectedCandidate);
        setErrors(frontErr);
        if (Object.keys(frontErr).length !== 0) {
            return;
        }
        try {

            const response = await axiosInstance.post(`/elections/cast/vote/${electionsId}/${voterId}/${selectedCandidate.selectedCandidate}`);
            if (response.status === 200) {
                alert('Vote casted successfully');
            }
        } catch (err) {
            if (err.response) {
                const data = err.response.data;
                if (data.errors) {
                    const backendErrors = {};
                    data.errors.forEach((err) => {
                        backendErrors[err.path] = err.msg;
                    });
                    setErrors((prevErrors) => ({ ...prevErrors, ...backendErrors }));
                }
            }

        }
    }
    const validate = (values) => {
        const err = {};
        if (!values) {
            err.selectedCandidate = 'Select you candidate !';
        }
        return err;
    }


    return (
        <div>
            <div className='navbar'>
                <Navbar />
            </div>
            {
                electionStatus === 'completed' ? (
                    <div className='content'>
                        <h2>
                            Elections Time Over
                        </h2>
                        <div>Results will be announced soon</div>
                        <div className={`button`}>
                            <a href={`/elections/result/${electionsId}`}>
                                <button className='btn btn-primary'>
                                    View Result
                                </button>
                            </a>
                        </div>
                    </div>
                ) : (
                    electionStatus === 'success' ? (
                        <div className='content'>
                            <h1>{election.name}</h1>
                            <h4>Vote for your candidate</h4>
                            {candidates.map((candidate) => (
                                <div className='options' key={candidate._id}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="selectedCandidate"
                                        id={`radioNoLabel${candidate._id}`}
                                        value={candidate._id}
                                        aria-label="..."
                                        onChange={handleChange}
                                    />
                                    <p className='option'><b>&nbsp;&nbsp; {candidate.voter.name} , </b>{candidate.party}</p>
                                </div>
                            ))}
                            <p className='errors'>{errors.selectedCandidate}</p>
                            <p className='errors'>{errors.duplicate}</p>
                            <div className={`d-grid d_grid`}>
                                <button className='btn btn-primary' onClick={handleSubmit}>Vote</button>
                            </div>
                        </div>
                    ) : (
                        electionStatus === 'wait' ? (
                            <div className='content'>
                                <h2>
                                    Elections Coming Soon
                                </h2>
                                <div className='date_time'><b>Date Now : </b> {electionTime.currentDate}</div>
                                <div className='date_time'><b>Time Now : </b> {electionTime.currentTime}</div>
                                <div className='date_time'><b>ELection Date : </b> {electionTime.electionDate}</div>
                                <div className='date_time'><b>ELection start Time : </b> {electionTime.startTime}</div>
                                <div className='date_time'><b>ELection End Time : </b> {electionTime.endTime}</div>
                            </div>
                        ) : (
                            <div className='content'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )
                    )
                )
            }
        </div>
    );


}
