import React, { useContext, useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { APILoginUser } from '../../helpers/UserAPIs';
import UserContext from '../../helpers/context/user-context';

const LoginForm = ({closeModal}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage]= useState("");
    const ctx = useContext(UserContext);
    const [error, setError] = useState(false);


    const onFormSubmit = async(e) => {
        e.preventDefault();
        if(!username || !password){
            setError(true);
            return;
        }
        const res = await APILoginUser(username, password);
        if(res && res.user){
            //SUCCESS RESPONSE.  SET TOKEN TO SESSION STORAGE AND CONTEXT
            ctx.setUser(res.user);
            ctx.setAuth(res.accessToken);
            window.sessionStorage.setItem("access-token", res.accessToken);
            closeModal();
        }else{
            //ERROR RESPONSE. SHOW MESSAGE
            if(res && res.error){
                setMessage(res.error);
            }else{
                setMessage("There was an error logging into the website");
            }
        }
    }

    return (
        <div style={{textAlign:"center", margin:'20px auto'}}>
            <form onSubmit={onFormSubmit}>
                {message ? <span style={{color: "red", fontSize:"14px"}}>{message}</span> :""}
                <div>
                    <TextField 
                        id="standard-basic" 
                        error={error && username === ""}
                        value={username} 
                        label="Username" 
                        variant="standard" 
                        onChange={(e)=> setUsername(e.currentTarget.value)}
                        helperText="required"
                    />
                </div>
                <div style={{marginTop:"10px"}}>
                    <TextField 
                        id="standard-basic" 
                        error={error && password === ""}
                        value={password} 
                        label="Password" 
                        type="password"
                        helperText="required"
                        variant="standard" 
                        onChange={(e)=> setPassword(e.currentTarget.value)}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{marginTop:"10px"}}>Log In</Button>
            </form> 
        </div>
    )
}

export default LoginForm