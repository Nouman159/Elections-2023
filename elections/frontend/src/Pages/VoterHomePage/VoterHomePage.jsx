import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

import axiosInstance from '../../axios'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './VoterHomePage.module.css'

export default function VoterHomePage() {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetEvents = async () => {
      try {
        const response = await axiosInstance.get('/get/upcoming/elections');
        setElections(response.data.data);
      } catch (err) {
        if (err.response.status === 400) {
          <div className='content'>Try Later</div>
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

  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className={`${styles.home_content} ${styles.max_width_1} ${styles.m_auto}`}>
        <h1>Welcome to the election system</h1>
        <div className={`${styles.present_event}`}>
          <h3>Present Events</h3>
          {(elections.length > 0) ? (<></>) : (<p>
            No upcoming elections at the moment.
          </p>)}
          {isLoading ? (
            <div className="text-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (elections.length > 0 ? (
            <div className={`col-sm-6 ${styles.card_container}`}>
              <div className={`col-sm-6 ${styles.card_container}`} >
                <div className="col-sm-6 ">
                  {elections
                    .filter(election => election.status === 'future' || election.status === 'present' || election.status === 'past')
                    .map(filteredElection => (
                      <div className="card mt-3" key={filteredElection._id}>
                        <div className="card-body">
                          <h3>{filteredElection.name}</h3>
                          <p className="card-text"><b>Date : </b>{moment(filteredElection.electionDate).format('YYYY-MM-DD')}</p>
                          <p className="card-text"><b>Start Time : </b>{filteredElection.startTime} (UTC)</p>
                          <p className="card-text"><b>End Time : </b>{filteredElection.endTime} (UTC)</p>
                          <Link to={`/elections/vote/${filteredElection._id}`} className="btn btn-primary">View Status</Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          ))}
        </div>
      </div>
    </div>
  )
}
