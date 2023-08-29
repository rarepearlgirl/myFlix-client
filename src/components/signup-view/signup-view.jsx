import PropTypes from 'prop-types';
import { useState } from "react";

export const SignUp = ({onChangePage}) => {
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
    e.preventDefault()
         const data = {
            Name: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        console.log(33333, data)

        try{
       await fetch("https://movie-api-wbl0.onrender.com/users_add", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
        }).then((response) => {
            if(response.ok){
                alert("Signup successfull!");

            }
            else{
                alert("Signup failed!");
            }

        });} catch(error) {
            console.error(error)
        }
    };

    return (
        <div className="login">
           <h1>Register</h1>
           <form className="form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            <label >Birthdate</label>
            <input type="date" value={birthday} onChange={(e) => setBirthdate(e.target.value)}></input>
            <label >Username</label>
            <input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
            <label >Password</label>
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <label >Password repeat</label>
            <input placeholder="password" type="password" required></input>
            <button type="submit" >Register</button>
            </form>    
            <button onClick={onChangePage}>Login<br />
            </button>
        </div>
    );
}

SignUp.propTypes = {
    onChangePage: PropTypes.func.isRequired
}