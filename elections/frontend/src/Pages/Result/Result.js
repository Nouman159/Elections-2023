import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';

export default function Result() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [constituencies, setConstituencies] = useState([]);
    const Id = useParams();
    const electionId = Id.electionId;
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handleConstituencies = async () => {
            try {
                const response = await axiosInstance(`/get/constituencies`);
                setConstituencies(response.data.constituencies);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('voterId');
                    navigate('/voter/login');
                }
                if (err.response.status === 400) {
                    console.log('Try Later');
                }
            } finally {
                setIsLoading(false);
            }
        };
        handleConstituencies();
    }, [navigate]);

    useEffect(() => {
        const handleGetResult = async () => {
            try {
                const response = await axiosInstance(`/get/elections/result/${electionId}`);
                setResults(response.data.result);
            } catch (err) {
                console.log(err);
            }
        };
        handleGetResult();
    }, [electionId]);

    const filteredConstituencies = constituencies.filter(constituency =>
        constituency.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className='navbar'>
                <Navbar />
            </div>

            <div className='content'>
                <div className='d-flex justify-content-center'>
                    <div className="input-group">
                        <div className="form-outline">
                            <input
                                type="search"
                                id="form1"
                                className="form-control"
                                placeholder="Search By Name"
                                aria-label="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='content cont'>
                <div>
                    {isLoading ? (
                        <div className="text-center mt-4">Loading...</div>
                    ) : (
                        <>
                            {filteredConstituencies.length === 0 && (
                                <div className="text-center mt-4">No such constituency found.</div>
                            )}
                            {filteredConstituencies.map(constituency => (
                                <div key={constituency._id}>
                                    {results[constituency.name] && results[constituency.name].length > 0 && (
                                        <>
                                            <h2>{constituency.name}</h2>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Party</th>
                                                        <th scope="col">Votes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {results[constituency.name].map((candidateResult, candidateIndex) => (
                                                        <tr
                                                            key={candidateResult._id}
                                                            className={candidateResult.isWinner === "true" ? "table-success" : ""}
                                                        >
                                                            <th scope="row">{candidateIndex + 1}</th>
                                                            <td>{candidateResult.candidaterequests.voter.name}</td>
                                                            {candidateResult.candidaterequests.party ? (
                                                                <>
                                                                    <td>{candidateResult.candidaterequests.party}</td>
                                                                    <td>{candidateResult.voterCount}</td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <td></td>
                                                                    <td></td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
