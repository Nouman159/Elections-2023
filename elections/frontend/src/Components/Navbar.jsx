import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <div className={`${styles.nav_container} ${styles.max_width_1} ${styles.m_auto}`}>
                <div className={`${styles.nav_left}`}>
                    <ul>
                        <li className={`${styles.links}`}><Link className={`${styles.t_dec}`} to='/'>Home</Link></li>
                        <li className={`${styles.links}`}><Link className={`${styles.t_dec}`} to='/about'>About</Link></li>
                        <li className={`${styles.links}`}><Link className={`${styles.t_dec}`} to='/contact'>Contact Us</Link></li>
                    </ul>
                </div>
                <div className={`${styles.nav_right}`}>
                    <ul>
                        <li className={`${styles.links}`}><Link className={`${styles.t_dec}`} to='/signup'>SignUp</Link></li>
                        <li className={`${styles.links}`}><Link className={`${styles.t_dec}`} to='/login'>Login</Link></li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
