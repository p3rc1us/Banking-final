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
                navigate('/dashboard');
            }, 100);
             
        }

    } catch (error){
        if(error.response.data.errors) {
            return alert("Invalid credentials");
        }
    }
}

return ( 
<div>
    {isLoginPage ? null : (
    <div className='subLogin overflow-hidden'>

    <div className='welcome'>
    <span className='mb-4 text-8xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] leading-none tracking-wider text-emerald-500'>LandBank</span>
    <span className='mb-6 text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] leading-none tracking-wide text-emerald-500'>Of The Philippines</span>
    <br />
    <h3 className='header3 font-normal'>Sign in to start</h3>
    </div>

    <form className='formLogin' onSubmit={handleSubmit}>
                <input 
                    className='h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600' 
                    type="email" 
                    onChange={(event) => setEmail(event.target.value)} 
                    placeholder='Email'
                >
                </input>
                <br />
                <input
                    className='h-12 min-w-[12rem] rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600'
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Password'
                >
                </input>
                <br />
                <button className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600" type="submit">Sign In</button>
                <br />        
    </form>
                <hr className='hr' />
                <div className='mb-4 mt-10 text-2xl font-light'>
                ✨ Your Savings today, will save you tomorrow
                </div>
                <span className='mt-60 text-xl font-light'>
                Privacy & Terms{'\u00A0'}{'\u00A0'}Contact Us{'\u00A0'}{'\u00A0'}🌐 Change Region
                </span>
    </div>
    )}
</div>
);
};

export default Login;
