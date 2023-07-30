import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'

import './UserSignUp.css'

export default function UserSignUp() {

    const [newUser, setNewUser] = useState({
        name: '', email: '', password: '', cnic: '', constituency: '', pic: ''
    })
    const [errors, setErrors] = useState({});
    const err = {};
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
        console.log(newUser);
    }
    const handlePhoto = (e) => {
        setNewUser({ ...newUser, pic: e.target.files[0] });
        console.log(newUser.pic);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(newUser));
        if (!errors.length === 0) {
            return;
        }
        const formData = new FormData();
        formData.append('name', newUser.name);
        formData.append('email', newUser.email);
        formData.append('password', newUser.password);
        formData.append('cnic', newUser.cnic);
        formData.append('constituency', newUser.constituency);
        formData.append('pic', newUser.pic);
        const response = await fetch('http://localhost:5000/elections/voter/signup',
            {
                method: 'POST',
                body: formData
            }
        );
        const data = await response.json();
        // console.log(data.errors);
        console.log(data);
        if (data.cnicError) {
            err.cnic = 'cnic already exists';
            setErrors(err);
        }
        if (data.emailError) {
            err.email = 'email already exists';
            setErrors(err);
        }
        if (data.errors) {
            const backendErrors = {};
            data.errors.forEach((error) => {
                backendErrors[error.path] = error.msg;
                setErrors(prevErrors => ({ ...prevErrors, ...backendErrors }));
            });
        }
    }
    // useEffect(() => {
    //     console.log(errors);
    // }, [errors]);
    const validate = (values) => {
        const regex = /^[\w.-]+@gmail\.com$/i;
        const regexCnic = /^\d{5}-\d{7}-\d{1}$/;
        const regexCnic2 = /^\d{13}$/;
        // if (!values.name) {
        //     err.name = 'Name required !';
        // } else if (values.name.length < 3) {
        //     err.name = 'Name should be at least 3 char';
        // }
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
        if (!values.constituency) {
            err.constituency = 'Constituency required !';
        }
        if (!values.cnic) {
            err.cnic = 'CNIC required !';
        } else if (!regexCnic.test(values.cnic) && !regexCnic2.test(values.cnic)) {
            err.cnic = 'Enter valid cnic !';
        }
        if (!values.pic) {
            err.pic = 'pic  is required !';
        }
        // console.log(err);
        return err;
    }

    return (
        <div className='body login template d-flex justify-content-center vh-100 bg-prmary'>
            <div className={`px-5 py-3 rounded bgwhite form_container`}>
                <form encType='multipart/form-data'>
                    <h3 className='text-center'>Sign Up</h3>
                    <div className="form-controller">
                        <div className='mb-2 form-inp'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' placeholder='Enter your name' value={newUser.name} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.name}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' placeholder='Enter email' value={newUser.email} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.email}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' placeholder='Enter Password' value={newUser.password} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.password}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='cnic'>CNIC</label>
                            <input type='text' name='cnic' placeholder='Enter your cnic' value={newUser.cnic} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.cnic}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='conctituency'>Constituency</label>
                            <input type='text' name='constituency' placeholder='Enter your constituency' value={newUser.constituency} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.constituency}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='pic'>Upload pic</label>
                            <input type='file' name='pic' accept='.png, .jpg , .jpeg' className='form-control' onChange={handlePhoto} />
                            <p className='error'>{errors.pic}</p>
                        </div>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Sign In</button>
                    </div>
                    <p className='text-end mt-2'>
                        Forgot <Link href='/' id='pass'>Password?</Link><Link href='/' className='ms-2'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
