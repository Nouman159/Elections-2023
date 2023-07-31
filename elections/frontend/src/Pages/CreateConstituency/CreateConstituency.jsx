import React, { useState } from 'react'
import styles from './CreateConstituency.module.css'
import axiosInstance from '../../axios';

export default function CreateConstituency() {

    const [newConstituency, setNewConstituency] = useState({
        name: '', city: '', area: ''
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setNewConstituency({ ...newConstituency, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(newConstituency));
        if (!errors.length === 0) {
            return;
        }
        const response = await axiosInstance(`/elections/admin/create/constituency`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: newConstituency.name,
                city: newConstituency.city,
                area: newConstituency.area
            },
        });
        console.log(response);
    }

    const validate = (values) => {
        const err = {};
        if (!values.name) {
            err.name = 'Name required !';
        } else if (values.name.length < 3) {
            err.name = 'Name should be at least 3 char';
        }
        if (!values.city) {
            err.city = 'City required !';
        } else if (values.city.length < 3) {
            err.city = 'City must be at least 3 characters';
        }
        if (!values.area) {
            err.area = 'Area required !';
        }
        return err;
    }

    return (
        <div className={`${styles.body} login template d-flex justify-content-center vh-100 bg-prmary`}>
            <div className={`px-5 py-3 rounded bgwhite ${styles.form_container}`}>
                <form encType='multipart/form-data'>
                    <h3 className='text-center'>Create Constituency</h3>
                    <div className={`${styles.form_controller}`}>
                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='name'>Name</label>
                            <input type='text' name='name' placeholder='Enter name' value={newConstituency.name} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errors.name}</p>
                        </div>
                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='text'>City</label>
                            <input type='city' name='city' placeholder='Enter city' value={newConstituency.city} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errors.city}</p>
                        </div>
                        <div className={`mb-2 ${styles.form_inp}`}>
                            <label htmlFor='area'>area</label>
                            <input type='text' name='area' placeholder='Enter your area' value={newConstituency.area} className='form-control' onChange={handleChange} />
                            <p className={`${styles.error}`}>{errors.area}</p>
                        </div>
                    </div>
                    <div className={`d-grid ${styles.d_grid}`}>
                        <button className='btn btn-primary' onClick={handleSubmit}>Create</button>
                    </div>
                    {/* <p className='text-end mt-2'>
                        Forgot <Link href='/' id='pass'>Password?</Link>
                    </p> */}
                </form>
            </div>
        </div>
    )
}
