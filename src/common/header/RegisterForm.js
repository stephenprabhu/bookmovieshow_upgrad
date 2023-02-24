import React, { useState} from 'react'
import { Button, TextField } from '@material-ui/core';
import { APIRegisterUser } from '../../helpers/UserAPIs';


const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [message, setMessage]= useState(null);
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);


    const onFormSubmit = async(e) => {
        e.preventDefault();
        if(!firstName || !lastName || !email || !contact || !password){
            setError(true);
            return;
        }
        const data = await APIRegisterUser(firstName, lastName, email, contact, password);
        if(data && data.id){
            setStatus(true);
            setMessage("Registration Successful. Please Login!")
        }else{
            setStatus(false);
            if(data && data.error){
                setMessage(data.error);
            }else{
                setMessage("There was an unknown error creating your account");
            }
        }
    }



    return (
        <div style={{textAlign:"center", margin:'20px auto'}}>
            {message ? <span style={{color:status ? "green" : "red", fontSize:"14px"}}>{message}</span> :""}
            <form onSubmit={onFormSubmit}>
                <div style={{marginTop:"5px"}}>
                    <TextField
                        error={error && firstName === ""}
                        id="standard-basic" 
                        value={firstName} 
                        label="First Name" 
                        variant="standard" 
                        onChange={(e)=> setFirstName(e.currentTarget.value)}
                        helperText={firstName === "" ? "required" :""}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField
                        error={error && lastName === ""}
                        id="standard-basic" 
                        value={lastName} 
                        label="Last Name" 
                        variant="standard" 
                        onChange={(e)=> setLastName(e.currentTarget.value)}
                        helperText={lastName === "" ? "required" :""}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField
                        error={error && email === ""}
                        id="standard-basic" 
                        value={email} 
                        label="Email" 
                        variant="standard" 
                        onChange={(e)=> setEmail(e.currentTarget.value)}
                        helperText={email === "" ? "required" :""}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField
                        error={error && password === "" ? true : false}
                        id="standard-basic" 
                        value={password} 
                        type="password"
                        label="Password" 
                        variant="standard" 
                        onChange={(e)=> setPassword(e.currentTarget.value)}
                        helperText={password === "" ? "required" :""}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        error={error && contact === ""}
                        id="standard-basic" 
                        value={contact} 
                        label="Contact Number" 
                        variant="standard" 
                        onChange={(e)=> setContact(e.currentTarget.value)}
                        helperText={contact === "" ? "required" :""}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{marginTop:"15px"}}>Register</Button>
            </form> 
        </div>
    )
}


export default RegisterForm