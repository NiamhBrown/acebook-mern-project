import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [error, setError] = useState([])
  const [errors, setErrors] = useState({
    username: "",
    password: "",
});

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errors.password){
    try {
      await signup(forename, surname, username, email, password);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }}
  };

  useEffect(()=>{
    const capitalLetterRegex = /[A-Z]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let error = ""; 
      const validatePassword = () => {
        if (password.length < 8){
          console.log("length")
          error = 'Password must be at least 8 characters.';
        } 
        else if(!capitalLetterRegex.test(password)) {
          console.log("Cap")
          error = 'Password must have at least one captial letter.';
        }  
        else if(!specialCharacterRegex.test(password)){
          console.log("special")
          error = 'Password must contain a special character.'
        }  
      setErrors((prevErrors)=> ({
        ...prevErrors,
        password:error,
      }
    
    )
    
    
    )
    console.log('errors',errors)
      }
      validatePassword()
    } 
  , [password]
)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  return (
    <>
      <h1 className="heading">Acebook</h1>
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="forename">Forename:</label>
        <input
          id="forename"
          type="text"
          value={forename}
          autoComplete="off"
          onChange={(event) => setForename(event.target.value)}
        />
        <br />
        <label htmlFor="surname">Surname:</label>
        <input
          id="surname"
          type="text"
          value={surname}
          autoComplete="off"
          onChange={(event) => setSurname(event.target.value)}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          autoComplete="off"
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          autoComplete="off"
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          <br />
        <input className="login-button" role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
      <span>Already have an account? <a className="hyperlink" href="/login">Log in</a></span>
      </div>
    </>
  );
};
