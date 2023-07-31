import React from 'react'
import Navbar from '../../Components/Navbar'
import styles from './VoterHomePage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios'

export default function VoterHomePage() {
  const navigate = useNavigate();
  const handleValidation = async () => {
    const response = await axiosInstance('/validate/voter');
    console.log(response);
    console.log(response.data.authenticated);
    if (!response.data.authenticated) {
      navigate('/login');
    }
  }
  handleValidation();
  return (
    <div>
      <Navbar />
      <div className={`${styles.home_content} ${styles.max_width_1} ${styles.m_auto}`}>
        <h1>Welcome to election system</h1>
        <div className={`${styles.present_event}`}>
          <h3>Present Events</h3>
          <div className={`col-sm-6 ${styles.card_container}`}>
            <div className="card">
              <div className="card-body">

                <p className="card-text">Vote for your favourite candidate and help him win the contest</p>
                <Link to="/" className="btn btn-primary">Vote Now</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.upcoming_event}`}>
          <h3>Upcoming Events</h3>
          <div className={`col-sm-6 ${styles.card_container}`}>
            <div className="card">
              <div className="card-body">

                <p className="card-text">Contest Coming soon to elect the candidates</p>
                <Link href="/" className="btn btn-primary">Details</Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.past_event}`}></div>
        <h3>Past Events</h3>
        <div className={`col-sm-6 ${styles.card_container}`}>
          <div className="card">
            <div className="card-body">
              <p className="card-text">View the results of the elections </p>
              <Link href="/" className="btn btn-primary">View</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
