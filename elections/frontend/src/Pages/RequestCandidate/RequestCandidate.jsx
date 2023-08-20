import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios';
import styles from './RequestCandidate.module.css'


export default function CandidateRequest() {
    const navigate = useNavigate();
    const id = localStorage.getItem('voterId');
    const [constituencies, setConstituencies] = useState([]);
    const [parties, setParties] = useState([]);

    const [newCandidateRequest, setNewCandidateRequest] = useState({
        party: '', constituency: '', description: '',
    })

    const [errorsRequest, setErrorsRequest] = useState({});
    const handleChange = (e) => {
        setNewCandidateRequest({ ...newCandidateRequest, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const getData = async () => {
            try {

                const response = await axiosInstance.get(`/request/candidate/data`);

                if (!response.status === 200) {
                    setErrorsRequest((prevErrors) => ({ ...prevErrors, tryagain: 'Try Later !' }));
                    return;
                }
                setConstituencies(response.data.constituencies);
                setParties(response.data.parties);
            }
            catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');

                }
            }
        }
        getData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate(newCandidateRequest);
        setErrorsRequest(err);
        if (Object.keys(err).length !== 0) {
            return;
        }
        try {
            const response = await axiosInstance(`/request/candidate/${id}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: {
                    party: newCandidateRequest.party,
                    constituency: newCandidateRequest.constituency,
                    description: newCandidateRequest.description
                }
            })
            if (response.status === 200) {
                alert('Request sent');
                navigate('/elections/voter/home/page');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert('Your request is already in queue');
                    return;
                }
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');
                }
                if (error.response.status === 400) {
                    const data = error.response.data;
                    if (data.errors) {
                        const backendErrorsRequest = {};
                        data.errors.forEach((error) => {
                            backendErrorsRequest[error.path] = error.msg;
                            setErrorsRequest(prevErrorsRequest => ({ ...prevErrorsRequest, ...backendErrorsRequest }));
                        });
                    }
                    else if (data.error) {
                        const error = {};
                        error.user = 'Request already in queue !';
                        setErrorsRequest(prev => ({ ...prev, ...error }));
                    }
                    else if (data.msessage === 'failed') {
                        const error = {};
                        error.user = 'Request failed . Try later!';
                        setErrorsRequest(prev => ({ ...prev, ...error }));
                    }
                }
            }
        }
    }

    const validate = (values) => {
        const err = {};
        if (!values.description) {
            err.description = 'description required !';
        }
        if (!values.party) {
            err.party = 'party required!';
        }
        if (!values.constituency) {
            err.constituency = 'constituency required !';
        }
        else if (values.description.length < 8) {
            err.description = 'description must be at least 8 characters';
        }
        return err;
    }

    return (
        <div className={`${styles.body} login template d-flex justify-content-center vh-100 bg-prmary`}>
            <div className={`px-5 py-3 rounded bgwhite ${styles.form_container}`}>
                <form encType='multipart/form-data'>
                    <h3 className='text-center'>Request Candidate</h3>
                    <p className={`${styles.error}`}>{errorsRequest.tryagain}</p>
                    <div className={`${styles.form_controller}`}>
                        <div className={`${styles.form_inp}`}>
                            <label htmlFor='party'>Party</label>
                            <select
                                name='party'
                                value={newCandidateRequest.party}
                                className='form-select'
                                onChange={handleChange}
                            >
                                <option value='' disabled>Select a party</option>
                                {parties.map((party) => (
                                    <option
                                        key={party._id}
                                        value={party.partyname}
                                    >
                                        {party.partyname}
                                    </option>
                                ))}
                            </select>
                            <p className={`${styles.error}`}>{errorsRequest.party}</p>
                        </div>

                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='constituency'>Constituency</label>
                            <select
                                name='constituency'
                                value={newCandidateRequest.constituency}
                                className='form-select'
                                onChange={handleChange}
                            >
                                <option value='' disabled>Select a constituency</option>
                                {constituencies.map((constituency) => (
                                    <option
                                        key={constituency._id}
                                        value={constituency.name}
                                    >
                                        {constituency.name}
                                    </option>
                                ))}
                            </select>
                            <p className={`${styles.error}`}>{errorsRequest.constituency}</p>
                        </div>

                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='description'>Why Applying?</label>
                            <input type='description' name='description' placeholder='Enter description' value={newCandidateRequest.description} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errorsRequest.description}</p>
                        </div>
                    </div>
                    <div className={`${styles.d_grid}`}>
                        <button className='btn btn-primary' onClick={handleSubmit}>Request</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
