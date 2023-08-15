import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios'
import './CreateParty.module.css'

export default function CreateParty() {
    const navigate = useNavigate();

    const [newParty, setNewParty] = useState({
        partyname: '', leadername: '', abbreviation: '', ideology: '', symbol: '', description: '', foundedYear: ''
    })
    const [errors, setErrors] = useState({});
    const err = {};
    const handleChange = (e) => {
        setNewParty({ ...newParty, [e.target.name]: e.target.value })
    }
    const handlePhoto = (e) => {
        setNewParty({ ...newParty, symbol: e.target.files[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const frontErr = validate(newParty);
        setErrors(frontErr);
        if (Object.keys(frontErr).length !== 0) {
            return;
        }

        const formData = new FormData();
        formData.append('partyname', newParty.partyname);
        formData.append('leadername', newParty.leadername);
        formData.append('abbreviation', newParty.abbreviation);
        formData.append('ideology', newParty.ideology);
        formData.append('symbol', newParty.symbol);
        formData.append('description', newParty.description);
        formData.append('foundedYear', newParty.foundedYear);
        try {
            const response = await axiosInstance.post(`/elections/admin/create/party`, formData);
            if (response.status === 200) {
                navigate('/elections/admin/dashboard');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const data = error.response.data;
                    if (data.abbreviationError) {
                        const err = { ...errors };
                        err.abbreviation = 'abbreviation already exists';
                        setErrors(err);
                    }
                    if (data.partynameError) {
                        const err = { ...errors };
                        err.partyname = 'partyname already exists';
                        setErrors(err);
                    }
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
        if (!values.description) {
            err.description = 'Description required !';
        } else if (values.description.length < 3) {
            err.description = 'description should be at least 3 char';
        }
        if (!values.partyname) {
            err.partyname = 'partyname required !';
        }
        if (!values.foundedYear) {
            err.partyname = 'partyname required !';
        }
        if (!values.leadername) {
            err.leadername = 'leadername required !';
        } else if (values.leadername.length < 8) {
            err.leadername = 'leadername must be at least 8 characters';
        }
        if (!values.ideology) {
            err.ideology = 'ideology required !';
        }
        if (!values.abbreviation) {
            err.abbreviation = 'abbreviation required !';
        }
        if (!values.symbol) {
            err.symbol = 'symbol  is required !';
        }
        return err;
    }

    return (
        <div className='body login template d-flex justify-content-center vh-100 bg-prmary'>
            <div className={`px-5 py-3 rounded bgwhite form_container`}>
                <form encType='multipart/form-data'>
                    <h3 className='text-center'>Create Party</h3>
                    <div className="form-controller">
                        <div className='mb-2 form-inp'>
                            <label htmlFor='partyname'>partyname</label>
                            <input type='text' name='partyname' placeholder='Enter partyname' value={newParty.partyname} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.partyname}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='leadername'>leadername</label>
                            <input type='leadername' name='leadername' placeholder='Enter leadername' value={newParty.leadername} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.leadername}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='abbreviation'>abbreviation</label>
                            <input type='text' name='abbreviation' placeholder='Enter your abbreviation' value={newParty.abbreviation} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.abbreviation}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='conctituency'>ideology</label>
                            <input type='text' name='ideology' placeholder='Enter your ideology' value={newParty.ideology} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.ideology}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='foundedYear'>Founded Year</label>
                            <input
                                type='number' name='foundedYear' placeholder='Enter the founded year' value={newParty.foundedYear} className='form-control' onChange={handleChange}
                            />
                            <p className='error'>{errors.foundedYear}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='description'>description</label>
                            <input type='textarea' name='description' placeholder='Enter your description' value={newParty.name} className='form-control' onChange={handleChange} />
                            <p className='error'>{errors.description}</p>
                        </div>
                        <div className='mb-2 form-inp'>
                            <label htmlFor='symbol'>Upload symbol</label>
                            <input type='file' name='symbol' accept='.png, .jpg , .jpeg' className='form-control' onChange={handlePhoto} />
                            <p className='error'>{errors.symbol}</p>
                        </div>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary' onClick={handleSubmit}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
