import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

import axiosInstance from '../../axios'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './VoterHomePage.module.css'

export default function VoterHomePage() {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();
  const handleGetEvents = async () => {
    try {
      const response = await axiosInstance.get('/get/upcoming/elections');
      setElections(response.data.data);
    } catch (err) {
      if (err.response.status === 400) {
        return (
          <div>Try Later</div>
        )
      }
      if (err.response.status === 401) {
        localStorage.removeItem('voterId');
        navigate('/voter/login');
      }
    }
  }
  useEffect(() => {
    handleGetEvents();
  }, [])
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className={`${styles.home_content} ${styles.max_width_1} ${styles.m_auto}`}>
        <h1>Welcome to election system</h1>
        <div className={`${styles.present_event}`}>
          <h3>Present Events</h3>
          <div className={`col-sm-6 ${styles.card_container}`} >
            {elections.filter(election => election.status === 'future').map(filteredElection => (
              <div className={`card ${styles.card}`} key={filteredElection._id}>
                <div className="card-body">
                  <h3>{filteredElection.name}</h3>
                  <p className="card-text"><b>Date : </b>  {moment(filteredElection.electionDate).format('YYYY-MM-DD')}</p>
                  <p className="card-text"><b>Start Time : </b>{filteredElection.startTime} UTC</p>
                  <p className="card-text"><b>End Time : </b>{filteredElection.endTime} UTC</p>
                  <Link to={`/elections/vote/${filteredElection._id}`} className="btn btn-primary ">Vote Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
