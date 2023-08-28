import "./login-page";
import { Register } from "../signup-view/signup-view";
import { useState } from "react";
import { SignUp } from "../signup-view/signup-view"


export const LoginPage = ({ onLoggedIn }) => {
   const [userName, setUserName] = useState("");
   const [pass, setPass] = useState("");
   const [isRegister, setIsRegister] = useState(false)

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
         Name: userName,
         Password: pass
      };

      fetch("http://localhost:8080/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
      }).then((response) => response.json())
         .then((data) => {
            if (data.user) {
               localStorage.setItem("user", JSON.stringify(data.user.Name));
               localStorage.setItem("token", data.token);
               onLoggedIn(data.user.Name);
               // onLoginSubmit(data.user.Name, data.token);
            }
            else {
               alert("Login failed");
            }
         });
   };

   const onChangePage = () => { 
     setIsRegister(!isRegister)
   };


   if(isRegister) {
     return <SignUp onChangePage={onChangePage}/> 
   }

      return (
      <div className="login">
         <h1>Login</h1>
         <form className="form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
            <label>Password</label>
            <input type="password" name="password" autoComplete="current password" placeholder="password" value={pass} onChange={(e) => setPass(e.target.value)} required></input>
            <button type="submit">Submit</button>
         </form>
         <button className="signup" onClick={onChangePage}>Create account 
            </button>
      </div>
      );
}
//<input type="password" name="password" autoComplete="off" ... />
