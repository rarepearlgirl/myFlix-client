import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "../movie-card/movie-card.css"; 
import { MovieCard } from "..//movie-card/movie-card"; 

export const ProfileView = ({ user, movies, token, updateUser, handleLogout }) => {  

    // const [username, setUsername] = useState(user);
    const [username, setUsername] = useState(user ? user.Name : "");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user ? user.Email : "");
    const [birthday, setBirthdate] = useState(user ? user.Birthday : "");
    const [show, setShow] = useState(false);
    const [deregister, setDeregister] = useState(false);
    const favoriteMovies = user && user.FavoriteMovies;

    useEffect(() => {
  if (user) {
    setUsername(user.Name);
    setEmail(user.Email);
    setBirthdate(user.Birthday);
  }
}, [user]);



    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const updateCurrentUser = () => {
       

        const data = {
            Email: email,
            Birthday: birthday,
            Name: username,
            Password: password
        };

        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((res) => {
                if (res.message === "success") {
                    localStorage.setItem("user", JSON.stringify(res.username));
                    updateUser(user);
                    alert("Updated Succesfully");
                }
                else {
                    alert("Update failed");
                } 
            }).catch((error) => console.error("User update error:", error)
            );
        setShow(false);
    };

    deleteUser = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                if (response.ok) {
                    return response;
                }
            })
            .then((data) => {
                console.log(data);
                localStorage.clear()
                alert("Account deleted successfully!");
                window.location.reload();
            });
    };
    handleDeregister = () => setDeregister(true);
    handleCloseDeregister = () => setDeregister(false);

    if (username !== null) {
        return (<>
            <Row>
                <Col md={6} className="mx-auto">
                    <Card border="primary" className="movieCard">
                        <Card.Img className="card-image" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010" />
                        <Card.Body>
                            <Card.Title className="text-center fs-4">Profile<br /></Card.Title>
                            <Card.Text>
                                Username: {username}<br />
                                Email: {email}<br />
                                Birthday: {birthday}<br />
                            </Card.Text>

                            <Button variant="primary" data-inline="true" className="m-4 float-end" onClick={handleShow}>Update profile</Button>
                            <Button variant="primary" data-inline="true" className="m-4 float-end" onClick={deleteUser}>Deregister your account</Button>


                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <h2 className="text-center mb-5 mt-5">Favorite Movies</h2>
                {favoriteMovies && favoriteMovies.map((movieTitle) => {
                    const currentMovie = movies.find(item => item.Title === movieTitle)
                    if (!currentMovie) {
                        return
                    }
                    return (
                        <Col className="mb-5 d-flex" key={movieTitle} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={currentMovie} user={user} token={token} setuser={updateUser} />
                    </Col>
                )})}
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your new password" onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" value={birthday} onChange={(e) => setBirthdate(e.target.value)} required />
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateCurrentUser}>
                        Update User
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deregister} onHide={handleCloseDeregister}>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Deregister</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to delete your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeregister}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteUser}>
                        Delete account
                    </Button>
                </Modal.Footer>
            </Modal>

        </>

        );
    }


};