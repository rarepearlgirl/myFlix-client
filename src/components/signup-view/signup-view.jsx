import PropTypes from 'prop-types';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignUp = ({onChangePage}) => {
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {

         e.preventDefault()
        const data = {
            Email: email,
            Birthday: birthday,
            Name: username,
            Password: password
        };

        try {
            await fetch("https://movie-api-wbl0.onrender.com/users_add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok) {
                    alert("Signup successfull!");
                    // window.location.reload();   
                }
                else {
                    alert("Signup failed! Reason: " + error.message);
                }
            });
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
        <Form onSubmit={handleSubmit}>
                <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>



            <Button className="signup" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
            <p>or</p>
            <button type= "button" className="btn btn-success" onClick={onChangePage}> Login 
            </button>
        </div>
    );
}

 SignUp.propTypes = {
    onChangePage: PropTypes.func.isRequired
}