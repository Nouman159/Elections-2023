import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import axiosInstance from '../../axios'
import AdminNavbar from '../../AdminPages/AdminNavbar/AdminNavbar'
import styles from './ManageElectionStatus.module.css'

export default function ManageElectionStatus() {
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleGetEvents = async () => {
            try {
                const response = await axiosInstance.get('/admin/elections/past/events');
                console.log(response.data.data);
                setElections(response.data.data);
            } catch (err) {
                if (err.response.status === 400) {
                    return (
                        <div className='content'>Try Later</div>
                    )
                }
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');
                }
            } finally {
                setIsLoading(false);
            }
        }
        handleGetEvents();
    }, [navigate])

    const handleEnd = async (requestId) => {
        try {
            const response = await axiosInstance.put(`/admin/elections/end/${requestId}`);
            if (response.status === 200) {
                setElections(prevRequests => prevRequests.filter(request => request._id !== requestId));
                alert('Election Marked Completed');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    localStorage.removeItem('adminId');
                    navigate('/admin/login');
                }
                if (err.response.status === 404) {
                    alert('No such request found');
                }
                if (err.response.status === 400) {
                    alert('Try Later');
                }
            }
        }
    };
    return (
        <div>
            <div className="navbar">
                <AdminNavbar />
            </div>
            <div className={`${styles.home_content} ${styles.max_width_1} ${styles.m_auto}`}>
                <div className={`${styles.present_event}`}>
                    <h3>Completed Events</h3>

                    {isLoading ? (
                        <div className="text-center mt-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : elections.length > 0 ? (
                        <div className={`col-sm-6 ${styles.card_container}`}>
                            <div className="col-sm-6 ">
                                {elections
                                    .filter((election) => election.status === 'past')
                                    .map((filteredElection) => (
                                        <div className="card mt-3" key={filteredElection._id}>
                                            <div className="card-body">
                                                <h3>{filteredElection.name}</h3>
                                                <p className="card-text">
                                                    <b>Date : </b>
                                                    {moment(filteredElection.electionDate).format('YYYY-MM-DD')}
                                                </p>
                                                <p className="card-text">
                                                    <b>Start Time : </b>
                                                    {filteredElection.startTime} (UTC)
                                                </p>
                                                <p className="card-text">
                                                    <b>End Time : </b>
                                                    {filteredElection.endTime} (UTC)
                                                </p>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleEnd(filteredElection._id)}
                                                >
                                                    Mark as End
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <p>No Completed Events Yet</p>


                    )}
                </div>
            </div>
        </div>
    )
}
