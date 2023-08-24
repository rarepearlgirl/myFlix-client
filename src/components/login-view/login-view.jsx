import "../login-view/login-view";
import { Register } from "../signup-view/signup-view";
import { useState } from "react";


export const LoginView = () => {
   const [userName, setUserName] = useState("");
   const [pass, setPass] = useState("");
   const [clicked, setClicked] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
         username: userName,
         password: pass
      };
      fetch("https://movie-api-uahq.onrender.com/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
      }).then((response) => response.json())
         .then((data) => {
            console.log(data);
            if (data.user) {
               localStorage.setItem("user", JSON.stringify(data.user.Name));
               localStorage.setItem("token", data.token);
               // onLoginSubmit(data.user.Name, data.token);
            }
            else {
               alert("Login failed");
            }
         });
   };

   if (!clicked) {
      console.log(clicked);

      return (<div className="login">
         <h1>Login</h1>
         <form className="form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
            <label>Password</label>
            <input type="password" name="password" placeholder="password" value={pass} onChange={(e) => setPass(e.target.value)} required></input>
            <button type="submit">Submit</button>
            <div className="signup">Create account<br />
               <div onClick={() => {
                  console.log("signup clicked");
                  setClicked(true);
               }}>Signup</div>
            </div>
         </form>
      </div>);
   }
   else {
      console.log(clicked);
      return(
      <div>
         <Register afterRegis={() => setClicked(false)} />
      </div>);
   }
}