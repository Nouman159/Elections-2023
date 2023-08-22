import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axiosInstance from '../../axios';

export default function HalkaVoters() {
    const candidateId = localStorage.getItem('candidateId');
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleVoters = async () => {
            try {
                const response = await axiosInstance.get(`/request/voters/list/${candidateId}`);
                setVoters(response.data.voters);
            } catch (err) {
                if (err.response?.status === 404) {
                    setVoters([]);
                }
                if (err.response?.status === 400) {
                    return (
                        <>Try Later</>
                    )
                }
            } finally {
                setLoading(false);
            }
        };

        handleVoters();
    }, [candidateId]);

    return (
        <div>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='content'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {voters.length > 0 ? (
                            <div>
                                <h2>
                                    Constituency Voters List
                                </h2>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voters.map((voter, index) => (
                                            <tr key={voter._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{voter.name}</td>
                                                <td>{voter.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>No Registered Voters Till Now</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
