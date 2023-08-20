import React from 'react';
import './AdminNavbar.css'

export default function AdminNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/elections/admin/dashboard">Election23
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/elections/admin/requests/management">Requests</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Create
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" href="create/party">Party</a></li>
                                <li><a className="dropdown-item" href="create/constituency">Constituency</a></li>
                                <li><a className="dropdown-item" href="create/election">Election</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="navbar-nav">

                        <li className="nav-item ">
                            <a className="nav-link active" href="/elections/admin/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div >
        </nav >
    );
}
