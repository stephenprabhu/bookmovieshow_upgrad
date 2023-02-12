import React, {useState} from 'react'
import { Button, TextField } from '@material-ui/core';


const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        console.log(contact);
    }


    return (
        <div style={{textAlign:"center", margin:'20px auto'}}>
            <form onSubmit={onFormSubmit}>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={firstName} 
                        label="First Name" 
                        variant="standard" 
                        onChange={(e)=> setFirstName(e.currentTarget.value)}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={lastName} 
                        label="Last Name" 
                        variant="standard" 
                        onChange={(e)=> setLastName(e.currentTarget.value)}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={email} 
                        label="Email" 
                        variant="standard" 
                        onChange={(e)=> setEmail(e.currentTarget.value)}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={password} 
                        type="password"
                        label="Password" 
                        variant="standard" 
                        onChange={(e)=> setPassword(e.currentTarget.value)}
                    />
                </div>
                <div style={{marginTop:"5px"}}>
                    <TextField 
                        id="standard-basic" 
                        value={contact} 
                        label="Contact Number" 
                        variant="standard" 
                        onChange={(e)=> setContact(e.currentTarget.value)}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{marginTop:"15px"}}>Register</Button>
            </form> 
        </div>
    )
}


export default RegisterForm