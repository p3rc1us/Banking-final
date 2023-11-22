import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { useLocation } from 'react-router-dom';
import '../Styles/Login.css';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [user, setUser] = useState(
      () => JSON.parse(localStorage.getItem("user") || null)
  );
  
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname !== '/';

  useEffect(() => {
    
    if(user){localStorage.setItem("user", JSON.stringify(user))}
    }, [user]);
    
    async function handleSubmit(event){
      event.preventDefault();

      if(!email || !password){
          return alert("Invalid credentials");
        }
      try {
        
        const loginCredentials = {
            email,
            password
        }
        const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials)
        const { data, headers } = response;

        if(data && headers){
            const accessToken = headers["access-token"];
            const expiry = headers["expiry"];
            const client = headers["client"];
            const uid = headers["uid"];

            setUser({
                accessToken,
                expiry,
                client,
                uid,
                id: data.data.id
            });

            setTimeout(() => {
                navigate('/Main');
            }, 100);
             
        }

    } catch (error){
        if(error.response.data.errors) {
            return alert("Invalid credentials");
        }
    }
}

return ( 
<fieldset className='mainLogin'>
    {isLoginPage ? null : (
    <fieldset className='subLogin'>

    <fieldset className='welcome'>
    <span className='header2'>Welcome to your Bank</span>
    <br />
    <span className='header3'>Sign in to start</span>
    </fieldset>

    <form className='App' onSubmit={handleSubmit}>
                <input 
                    className='input' 
                    type="email" 
                    onChange={(event) => setEmail(event.target.value)} 
                    placeholder='Email'
                >
                </input>
                <br />
                <input
                    className='input'
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Password'
                >
                </input>
                <br />
                <button className="login" type="submit">Sign In With Email</button>
                <br />
                <hr className='hr' />
                <fieldset className='info'>
                ✨ We'll email you a magic code for a password-free sign in. Or you can sign in manually instead.
                </fieldset>
                <span className='footer'>
                Privacy & Terms{'\u00A0'}{'\u00A0'}Contact Us{'\u00A0'}{'\u00A0'}🌐 Change Region
                </span>
    </form>
    </fieldset>
    )}
</fieldset>
);
};

export default Login;
