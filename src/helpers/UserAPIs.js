import axios from 'axios';


export const APIRegisterUser = async(first_name, last_name, email, mobile_number, password) => {
    try {
        const res = await axios.post("http://localhost:8085/api/v1/signup", {
            "email_address": email,
            "first_name": first_name,
            "last_name": last_name,
            "mobile_number": mobile_number,
            "password": password
        }, {
            Accept: "application/json;charset=UTF-8",
            "Content-Type":"application/json"
        });
        if (res && res.data) {
            return res.data.id;
        }
      } catch (e) {
        console.log("ERROR: ", e);
      }
      return null;
}

export const APILoginUser = async(email, password)=> {
    const param = window.btoa(`${email}:${password}`);
    console.log(param);
    try{
        const res = await axios.post("http://localhost:8085/api/v1/auth/login", null, {
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Content-Type":"application/json",
                authorization: `Basic ${param}`
            }
        });
        if (res && res.data) {
            return res.data;
        }
    }catch(e){
        console.log("ERROR: ", e);
    }
    return null;
}

export const APILogoutUser = async(token)=> {
    try{
        const res = await axios.post("http://localhost:8085/api/v1/auth/logout", null, {
           
        });
        if (res && res.data) {
            return res.data.id;
        }
    }catch(e){
        console.log("ERROR: ", e);
    }
    return null;
}