import React from 'react'
import Profile from '../../Components/Profile/Profile'
import Navbar from '../../Components/Navbar/Navbar'

export default function UserProfile() {
    return (
        <div>
            <div className='mt-2 mb-2'>
                <Navbar />
            </div>
            <Profile />
        </div>
    )
}
