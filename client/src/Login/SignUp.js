import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const backEndUserRegister = `http://localhost:1969/api/register`;

const SignUp = () => {

    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ mobileNumber, setMobileNumber ] = useState("");
 
    const handleName = (e) => {
        setName(e.target.value);
        // /* Test: */ console.log('name: ' + e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        // /* Test: */ console.log('email: ' + e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        // /* Test: */ console.log('Password: ' + e.target.value);
    }

    const handleNumber = (e) => {
        setMobileNumber(e.target.value);
        // /* Test: */ console.log('Mobile: ' + e.target.value);
    }

    const registerUser = async(e) => {
        e.preventDefault();
      
          const response = await fetch(backEndUserRegister, {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json"
            }, 
            body: JSON.stringify({
              name,
              email,
              password,
              mobileNumber
            }),
          })

          const data = await response.json();

          console.log(data) 
          if(data.status === "ok"){
            navigate("/login")
          } else {
            console.error('error')
          }
    }

    return(
        <div className='create-user-div'>
        <h1>Register</h1>

        <form onSubmit={registerUser}>
          <div>
            <div className='input-box'>
              <label htmlFor='name'>Name:
                <input onChange={handleName}
                value={name}
                id="name" type="text"
                placeholder="Enter Your Full Name"
                />
              </label>
            </div>
            <div className='input-box'>
              <label htmlFor='email'>Email:
                <input onChange={handleEmail}
                value={email}
                id="email" type="text"
                placeholder="Enter Your Email Address"
                />
              </label>
            </div>
            <div  className='input-box'>
              <label htmlFor='mobile-number'>Phone Number:
                <input onChange={handleNumber}
                value={mobileNumber}
                id="mobile-number" type="text"
                placeholder="Enter Mobile Number"
                />
              </label>
            </div>
            <div className='input-box'>
              <label htmlFor='password'>Password:
                <input onChange={handlePassword}
                value={password}
                id="password" type="text"
                placeholder="Enter a Password"
                />
              </label>
            </div>
          </div>
          <button className='btn btn-outline-success'>Register</button>
        </form>

        <Link to="/" className="btn btn-outline-success">Home</Link>

      </div>
    )
}

export default SignUp