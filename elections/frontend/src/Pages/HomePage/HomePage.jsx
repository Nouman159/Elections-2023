import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import styles from './HomePage.module.css'
import logoImage from './logo.jpg'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();
    const adminId = localStorage.getItem('adminId');
    const voterId = localStorage.getItem('voterId');
    useEffect(() => {
        if (adminId) {
            navigate('/elections/admin/dashboard');
        }
        else if (voterId) {
            navigate('/elections/voter/home/page');
        }
    }, [adminId, voterId, navigate])
    return (
        <div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className={`${styles.home_container} ${styles.bg_home}`}>
                <div className={`${styles.content_left}`}>
                    <div className={`${styles.logo}`}>
                        <img src={logoImage} alt='Logo' />
                    </div>
                    <div className={`${styles.title}`}>
                        Election System 2023
                    </div>
                </div>
                <div className={`${styles.content_right}`}>
                    Welcome to our election website! Exercise your right to vote and make a difference in the political landscape. We provide a platform for voters to cast their ballots for various political parties, ensuring that your voice is heard in the upcoming elections. Engage in the democratic process and contribute to shaping the future of our nation. Join us today and participate in building a better tomorrow for everyone
                </div>
            </div>
        </div >
    )
}
