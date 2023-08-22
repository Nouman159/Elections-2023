import React from 'react';
import './Navbar.css'

export default function Navbar() {
    const id = localStorage.getItem('voterId');
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/elections/voter/home/page">Elections</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            {localStorage.getItem('voterId') ? (

                                <a className="nav-link active" href={`/get/candidate/lists/${id}`}>View Candidates</a>
                            ) : (<></>)}
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {(!localStorage.getItem('voterId') && !localStorage.getItem('adminId')) ? (
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        SignUp
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="/admin/signup">Admin</a></li>
                                        <li><a className="dropdown-item" href="/voter/signup">Voter</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="/admin/login">Admin</a></li>
                                        <li><a className="dropdown-item" href="/voter/login">Voter</a></li>                            </ul>
                                </li>
                            </>
                        ) :
                            (
                                (localStorage.getItem('voterId')) ? (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Others
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" href="/elections/voter/profile">Profile</a></li>
                                            <li><a className="dropdown-item" href={`/elections/candidate`}>Candidate Profile</a></li>
                                            <li><a className="dropdown-item" href='/logout/voter'>Logout</a></li>
                                        </ul>
                                    </li>
                                ) : (<></>
                                )
                            )
                        }
                    </ul>
                </div>
            </div >
        </nav >
    );
}
