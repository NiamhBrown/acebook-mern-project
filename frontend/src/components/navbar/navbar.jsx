// import React from "react";
import "./navbar.css";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { SearchBar } from "./searchbar/SearchBar";
import { SearchResultsList } from "./searchbar/SearchResultsList";
import logo from "../../assets/Mountain-logo.png";

const Navbar =  (token) => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login")
        };

    return (
        <nav className="navbar" id="navbar">
            <div className = "container">
                <img src={logo} alt="page logo" id="logo_img"/>
                <div>
                    <Link to="/posts">
                        <div id="logo">Acebook</div>
                    </Link>
                </div>
            </div>
            <div className = "navbar-left">
                <div>
                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} token={token}/>}
                </div>
            </div>
            <div className= "navbar-right">
                <Link to = {"/requests"}>Friend Requests</Link>
                <Link to = {"/friends"}>Friends</Link>
                <Link to = {"/profile"}>Profile</Link>
                <button onClick={handleLogout} id="button1">
                    Log out 
                </button>
            </div>
        </nav>
    )        
};

export default Navbar;

