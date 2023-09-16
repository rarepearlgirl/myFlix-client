import PropTypes from 'prop-types';
import "./login-page.jsx";
import { useState } from "react";
import { SignUp } from '../signup-view/signup-view';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


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

      fetch("https://movie-api-wbl0.onrender.com/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok");
            }
            return response.json();
         })
         .then((data) => {
            if (data.user) {
               localStorage.setItem("user", JSON.stringify(data.user.username));
               localStorage.setItem("token", data.token);
               localStorage.setItem("userObject", JSON.stringify(data.user.username));
               onLoggedIn(data.user, data.token);
            } else {
               alert(data.message || "Login failed");
            }
         })
         .catch((error) => {
            console.error("There was a problem with the fetch operation:", error.message);
            alert("Failed to connect. Please try again later.");
         });
   };

   const onChangePage = () => {
      setIsRegister(!isRegister)
   };

   if (isRegister) {
      return <SignUp onChangePage={onChangePage} />
   }

   return (
      <div>
         <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserName">
               <Form.Label>Username:</Form.Label>
               <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  autoComplete="username"
               />
            </Form.Group>

            <Form.Group controlId="formPassword">
               <Form.Label>Password:</Form.Label>
               <Form.Control
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  autoComplete="current-password"
               />
            </Form.Group>
            <Button variant="primary" type="submit">
               Submit
            </Button>
            <p>or</p>
         </Form>
         <button type="button" className="btn btn-success" onClick={onChangePage}>Create account
         </button></div>
   );
}

LoginPage.propTypes = {
   onLoggedIn: PropTypes.func.isRequired
}