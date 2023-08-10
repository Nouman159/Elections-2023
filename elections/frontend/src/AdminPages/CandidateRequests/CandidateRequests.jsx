import React, { useEffect, useState } from 'react';
// import addNotification from 'react-push-notification';
import axiosInstance from '../../axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './CandidateRequest.css';

export default function CandidateRequests() {
    const [requests, setRequests] = useState([]);

    const getData = async () => {
        try {
            const response = await axiosInstance.get('/get/candidate/requests');
            setRequests(response.data.requests);
        } catch (err) {
            if (err.response) {

                if (err.response.status === 404) {
                    alert('No requests yet');
                }
                if (err.response.status === 400) {
                    alert('Try Later');
                }
            }
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className="content">
                <div className="row">
                    <div className="col-md-4">
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <div key={request._id} className="card mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">{request.party}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{request.constituency}</h6>
                                        <p className="card-text">{request.description}</p>
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-success">Approve</button>
                                            <button className="btn btn-danger">Reject</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No requests</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
