import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axiosInstance from '../../axios'
import './AdminSignUp.module.css'
import Navbar from '../../Components/Navbar/Navbar'

export default function AdminSignUp() {
    const navigate = useNavigate();
    const [newAdmin, setNewAdmin] = useState({
        username: '', email: '', password: ''
    })
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate(newAdmin);
        setErrors(err);
        if (Object.keys(err).length !== 0) {
            return;
        }
        try {
            const response = await axiosInstance(`/admin/elections/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username: newAdmin.username,
                    email: newAdmin.email,
                    password: newAdmin.password
                }
            }
            );
            if (response.status === 200) {
                navigate('/admin/login');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
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
        const err = {};
        const regex = /^[\w.-]+@gmail\.com$/i;
        if (!values.username) {
            err.username = 'Username required !';
            console.log('errors');
        } else if (values.username.length < 3) {
            err.username = 'Username should be at least 3 char';
        }
        if (!values.email) {
            err.email = 'Email required !';
        } else if (!regex.test(values.email)) {
            console.log('errors');
            err.email = 'Invalid email !';
        }
        if (!values.password) {
            err.password = 'Password required !';
        } else if (values.password.length < 8) {
            console.log('errors');
            err.password = 'Password must be at least 8 characters';
        }
        return err;
    }
    return (
        <div>
            <div className='mt-2'>
                <Navbar />
            </div>
            <div className='body login template d-flex justify-content-center vh-100 bg-prmary'>
                <div className={`px-5 py-3 rounded bgwhite form_container`}>
                    <form encType='multipart/form-data'>
                        <h3 className='text-center'>Admin SignUp</h3>
                        <div className="form-controller">
                            <div className='mb-2 form-inp'>
                                <label htmlFor='username'>Username</label>
                                <input type='text' name='username' placeholder='Enter username' value={newAdmin.username} className='form-control' onChange={handleChange} />
                                <p className='error'>{errors.username}</p>
                            </div>
                            <div className='mb-2 form-inp'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' name='email' placeholder='Enter email' value={newAdmin.email} className='form-control' onChange={handleChange} />
                                <p className='error'>{errors.email}</p>
                            </div>
                            <div className='mb-2 form-inp'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' name='password' placeholder='Enter Password' value={newAdmin.password} className='form-control' onChange={handleChange} />
                                <p className='error'>{errors.password}</p>
                            </div>
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-primary' onClick={handleSubmit}>SignUp</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
