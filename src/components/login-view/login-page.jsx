import PropTypes from 'prop-types';
import "./login-page";
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
         username: userName,
         password: pass
      };

      fetch("https://movie-api-wbl0.onrender.com/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
      }).then((response) => response.json())
         .then((data) => {
            console.log(data);
            if (data.user) {
               localStorage.setItem("user", JSON.stringify(data.user.Name));
               localStorage.setItem("token", data.token);
               onLoggedIn(data.user.Name, data.token);
               onLoggedIn(data.user.Name, data.token);
            }
            else {
               alert("Login failed!");
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
      <div>
      <Form onSubmit={handleSubmit}>
         <Form.Group controlId="formUserName">
            <Form.Label>Username:</Form.Label>
            <Form.Control
               type="text"
               value={userName}
               onChange={(e) => setUserName(e.target.value)}
               required
               minLength="5"
            />
         </Form.Group>

         <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type="password"
               value={pass}
               onChange={(e) => setPass(e.target.value)}
               required
            />
         </Form.Group>
         <Button variant="primary" type="submit">
            Submit
         </Button>
         <p>or</p>
      </Form>
      <button type= "button" class="btn btn-success" onClick={onChangePage}>Create account 
      </button></div>
   );
}
LoginPage.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}