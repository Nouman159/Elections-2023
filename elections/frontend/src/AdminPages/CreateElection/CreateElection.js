import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import axiosInstance from '../../axios'
import './CreateElection.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'

export default function CreateElection() {
    const navigate = useNavigate();

    const [newElections, setNewElections] = useState({
        name: '', electionDate: '', startTime: '', endTime: ''
    })
    const [errors, setErrors] = useState({});
    const err = {};
    const handleChange = (e) => {
        setNewElections({ ...newElections, [e.target.name]: e.target.value })
    }
    const handleDate = (e) => {
        const newTime = e.target.value;
        const updatedTime = moment(newTime, 'h:mm A').format('HH:mm');
        setNewElections({ ...newElections, [e.target.name]: updatedTime });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const frontErr = validate(newElections);
        setErrors(frontErr);
        if (Object.keys(frontErr).length !== 0) {
            return;
        }
        try {
            const response = await axiosInstance(`/admin/elections/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    name: newElections.name,
                    electionDate: newElections.electionDate,
                    startTime: newElections.startTime,
                    endTime: newElections.endTime
                },
            });
            if (response.status === 200) {
                alert('Successful');
                navigate('/elections/admin/dashboard');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.removeItem('adminId');
                    navigate('/admin/login');
                }
                if (error.response.status === 400 && error.response.data) {
                    const data = error.response.data;
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
    }
    const validate = (values) => {
        if (!values.name) {
            err.name = 'Election Name required !';
        }
        else if (values.name.length < 5) {
            err.name = 'Name must be at least 5 characters';
        }
        if (!values.electionDate) {
            err.electionDate = 'Election Date required !';
        }
        if (!values.startTime) {
            err.startTime = 'Election start time required !';
        }
        if (!values.endTime) {
            err.endTime = 'Election end time required !';
        }

        return err;
    }
    return (
        <div>
            <div className='mt-2'>
                <AdminNavbar />
            </div>
            <div className='body login template d-flex justify-content-center vh-100 bg-prmary'>
                <div className={`px-5 py-3 rounded bgwhite form_container`}>
                    <form encType='multipart/form-data'>
                        <h3 className='text-center'>Create Election</h3>
                        <div className="form-controller">
                            <div className='mb-2 form-inp'>
                                <label htmlFor='name'>Name</label>
                                <input type='name' name='name' placeholder='Enter election name' value={newElections.name} className='form-control' onChange={handleChange} />
                                <p className='error'>{errors.name}</p>
                            </div>
                            <div className='mb-2 form-inp'>
                                <label htmlFor='electionDate'>Election Date (UTC)</label>
                                <input type='date' name='electionDate' placeholder='Enter election date' value={newElections.electionDate} className='form-control' onChange={handleChange} />
                                <p className='error'>{errors.electionDate}</p>
                            </div>
                            <div className='mb-2 form-inp'>
                                <label htmlFor='startTime'>Start Time (UTC)</label>
                                <input type='time' name='startTime' placeholder='Enter start time' value={newElections.startTime} className='form-control' onChange={handleDate} />
                                <p className='error'>{errors.startTime}</p>
                            </div>
                            <div className='mb-2 form-inp'>
                                <label htmlFor='endTime'>End Date (UTC)</label>
                                <input type='time' name='endTime' placeholder='Enter end time' value={newElections.endTime} className='form-control' onChange={handleDate} />
                                <p className='error'>{errors.endTime}</p>
                            </div>
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-primary' onClick={handleSubmit}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}