import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios';
import './Voting.css'
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

export default function Voting() {
    const electInfo = useParams();
    const electionsId = electInfo.electionId;
    const [electionStatus, setElectionStatus] = useState();
    const [election, setElection] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState();
    const [errors, setErrors] = useState({});
    const voterId = localStorage.getItem('voterId');

    useEffect(() => {
        const getData = async () => {
            const response = await axiosInstance.get(`/get/elections/candidates/${voterId}`);
            if (!response.status === 200) {
                return (
                    <div>Try Later</div>
                )
            }
            setCandidates(response.data.data);
        }
        getData();
    }, []);
    useEffect(() => {
        const getElection = async () => {
            const response = await axiosInstance.get(`/get/elections/info/${electionsId}`);
            if (!response.status === 200) {
                return (
                    <div>Try Later</div>
                )
            }
            setElection(response.data.data);
        }
        getElection();
    }, []);

    const handleChange = (e) => {
        setSelectedCandidate({ ...selectedCandidate, [e.target.name]: e.target.value })
        console.log(selectedCandidate);
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
                if (data.completed) {
                    setElectionStatus('completed');
                }
                if (data.delay) {
                    setElectionStatus('coming');
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
                electionStatus === 'completed' ? (<div>Elections Time Over</div>) :
                    (

                        <div className='content'>
                            <h1>{election.name}</h1>
                            <h4>Vote for your candidate</h4>
                            {candidates.map((candidate) => (
                                <div className='options' >
                                    <input
                                        className="form-check-input"
                                        key={candidate._id}
                                        type="radio"
                                        name="selectedCandidate"
                                        id={`radioNoLabel${candidate._id}`}
                                        value={candidate._id}
                                        aria-label="..."
                                        onChange={handleChange}
                                    />

                                    <p className='option'><b> &nbsp;&nbsp; {candidate.voter.name} , </b>{candidate.party} </p>
                                </div>
                            ))}
                            <p className='errors'>{errors.selectedCandidate}</p>
                            <p className='errors'>{errors.duplicate}</p>
                            <div className={`d-grid d_grid`}>
                                <button className='btn btn-primary' onClick={handleSubmit}>Vote</button>
                            </div>
                        </div>
                    )}
        </div>
    )
}
