import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

const registerAdminUrl = "http://localhost:1969/api/adminRegistration"


const AdminSignUp = () => {

    const [ name, setName ] = useState(""); 
    const [ pwd, setPwd ] = useState("");

    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value)
        // /* Test: */ console.log('name: ' + e.target.value);
    };

    const handlePassword = (e) => {
        setPwd(e.target.value);
        // /* Test: */ console.log('Password: ' + e.target.value);
    };


    // LOGIN ADMINSTRATOR
    // const loginAdmin = async(e) => {
    //     e.preventDefault();

    //     const currentAdmin = {
    //         user: name,
    //         pwd: pwd
    //     }

    //     const response = await axios.post( currentAdmin )

    //     const data = response.data

    //     if(data.user){
    //         localStorage.setItem('token', data.user )
    //         alert("Welcome")
    //         navigate("/dashboard")
    //     } else {
    //         alert("Double check your login credentials")
    //     }
    // }

    // REGISTER ADMINISTRATOR
    const registerAdmin = async(e) => {
        e.preventDefault();

        const response = await fetch(registerAdminUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                pwd
            })
        })

        const data = await response.json();

        if(data.status === "ok"){
           alert("Registration Successful")
           navigate("/admin")
        } else {
            console.error('error')
        }
    }


    return(
        <div>
            <h1>welcome</h1>

            <form onSubmit={registerAdmin}>
                <div>
                   <div className="input-box">
                        <label htmlFor="user">Name: 
                            <input onChange={handleName}
                            value={name}
                            id="user" type={"text"}
                            placeholder="Enter the Users Name"
                            />
                        </label>
                    </div>
                    <div className="input-box">
                        <label htmlFor="pwd">Password:
                            <input onChange={handlePassword}
                            value={pwd}
                            id="pwd" type={"text"}
                            placeholder="Enter a secure Password"
                            />
                        </label>
                    </div> 
                </div>
                <button className="btn btn-outline-warning">Register Adminstrator</button>
            </form>
        </div>
    )
};

export default AdminSignUp;

