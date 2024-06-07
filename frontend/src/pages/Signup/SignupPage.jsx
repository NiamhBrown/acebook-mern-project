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
    // const { name, value } = event.target;

    // let error = "";
    // if (name === "password" && value.length < 8) {
    //     error = "Password must be at least 8 characters long.";
    //     console.log("Password must be at least 8 characters long.")
    // } else if (name === "password" && /^\d*$/.test(value)) {
    //     error = "Password must contain a special character.";
    //     console.log("Password must contain a special character.")
    // }

    // // setFormData({
    // //     ...formData,
    // //     [name]: value
    // // });

    // setErrors({
    //     ...errors,
    //     [name]: error
    // });
    setPassword(event.target.value);
  };



  return (
    <>
      <h1>Acebook</h1>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="forename">Forename:</label>
        <input
          id="forename"
          type="text"
          value={forename}
          onChange={(event) => setForename(event.target.value)}
        />
        <br />
        <label htmlFor="surname">Surname:</label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
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
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </>
  );
};
