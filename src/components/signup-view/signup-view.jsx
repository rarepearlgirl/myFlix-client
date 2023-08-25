import { useState } from "react";

export const SignUp = ({onChangePage}) => {
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {

        console.log(333)
         const data = {
            username,
            password,
            email,
            birthday
        };

        fetch("https://movie-api-uahq.onrender.com/users", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(data)
            
        }).then((response) => {
            if(response.ok){
                alert("Signup successfull!");

                window.location.reload();
            }
            else{
                alert("Signup failed!");
            }

        });
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