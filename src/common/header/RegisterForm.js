import React, {useContext, useState} from 'react'
import { Button, TextField } from '@material-ui/core';
import { APIRegisterUser } from '../../helpers/UserAPIs';
import UserContext from '../../helpers/context/user-context';


const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError]= useState(null);

    const ctx = useContext(UserContext);

    const onFormSubmit = async(e) => {
        e.preventDefault();
        const authToken = await APIRegisterUser(firstName, lastName, email, contact, password);
        if(authToken){
            localStorage.setItem('auth', authToken);
            ctx.setAuth(authToken);
        }else{
            setError("There was an error logging into the website");
        }
    }



    return (
        <div style={{textAlign:"center", margin:'20px auto'}}>
            {error ? <span style={{color:"red"}}>{error}</span> :""}
            <form onSubmit={onFormSubmit}>
                <div style={{marginTop:"5px"}}>
                    <TextField
                        error={firstName === "" ? true : false}
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
                        error={lastName === "" ? true : false}
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
                        error={email === "" ? true : false}
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
                        error={password === "" ? true : false}
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
                        error={contact === "" ? true : false}
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