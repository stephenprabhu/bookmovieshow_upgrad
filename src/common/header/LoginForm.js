import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        alert("username: "+ username +" -- password: "+ password);
    }

    return (
        <div style={{textAlign:"center", margin:'20px auto'}}>
            <form onSubmit={onFormSubmit}>
                <div>
                    <TextField 
                        id="standard-basic" 
                        value={username} 
                        label="Username" 
                        variant="standard" 
                        onChange={(e)=> setUsername(e.currentTarget.value)}
                    />
                </div>
                <div style={{marginTop:"10px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={password} 
                        label="Password" 
                        type="password"

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