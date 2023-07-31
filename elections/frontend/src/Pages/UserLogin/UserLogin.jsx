import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axiosInstance from '../../axios';
import styles from './UserLogin.module.css'

export default function UserLogin() {
    const navigate = useNavigate();

    const [newUserLogin, setNewUserLogin] = useState({
        email: '', password: '',
    })

    const [errorsLogin, setErrorsLogin] = useState({});

    const handleChange = (e) => {
        setNewUserLogin({ ...newUserLogin, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorsLogin(validate(newUserLogin));
        if (!errorsLogin.length === 0) {
            return;
        }
        try {
            const response = await axiosInstance(`/elections/voter/login`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                data: {
                    email: newUserLogin.email,
                    password: newUserLogin.password
                }
            });
            if (response.status === 200) {
                navigate('/voter/home/page')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const data = error.response.data;
                    if (data.errorsLogin) {
                        const backendErrorsLogin = {};
                        data.errorsLogin.forEach((error) => {
                            backendErrorsLogin[error.path] = error.msg;
                            setErrorsLogin(prevErrorsLogin => ({ ...prevErrorsLogin, ...backendErrorsLogin }));
                        });
                    }
                    else if (data.message) {
                        const error = {};
                        error.user = 'No such User !';
                        setErrorsLogin(prev => ({ ...prev, ...error }));
                    }
                    else if (data.error) {
                        const error = {};
                        error.password = 'Enter correct password !';
                        setErrorsLogin(prev => ({ ...prev, ...error }));
                    }
                }
            }

        }
    }

    const validate = (values) => {
        const regex = /^[\w.-]+@gmail\.com$/i;
        const err = {};
        if (!values.email) {
            err.email = 'Email required !';
        } else if (!regex.test(values.email)) {
            err.email = 'Invalid email !';
        }
        if (!values.password) {
            err.password = 'Password required !';
        } else if (values.password.length < 8) {
            err.password = 'Password must be at least 8 characters';
        }
        return err;
    }

    return (
        <div className={`${styles.body} login template d-flex justify-content-center vh-100 bg-prmary`}>
            <div className={`px-5 py-3 rounded bgwhite ${styles.form_container}`}>
                <form encType='multipart/form-data'>
                    <h3 className='text-center'>Log In</h3>
                    <p className={`${styles.error}`}>{errorsLogin.user}</p>
                    <div className={`${styles.form_controller}`}>
                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' placeholder='Enter email' value={newUserLogin.email} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errorsLogin.email}</p>
                        </div>
                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' placeholder='Enter Password' value={newUserLogin.password} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errorsLogin.password}</p>
                        </div>
                    </div>
                    <div className={`${styles.d_grid}`}>
                        <button className='btn btn-primary' onClick={handleSubmit}>LogIn</button>
                        <Link to="/signup">
                            <button className="btn btn-secondary">
                                SignUp
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
