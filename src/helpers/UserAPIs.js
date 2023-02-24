import axios from 'axios';

//API FOR REGISTERING USER
//PASS USER DATA. GET USER ID OR ERROR AS RESPONSE
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
            console.log(res.data);
            return res.data;
        }
      } catch (e) {
        if(e.response && e.response.data && e.response.data.message){
            return {
                error: e.response.data.message
            };
        }
      }
      return null;
}

//API FOR LOGGING IN USER
//PASS EMAIL AND PASSWORD
//GET ERROR OR FULL USER OBJECT + ACCESS TOKEN AS RESPONSE
export const APILoginUser = async(email, password)=> {
    const param = window.btoa(`${email}:${password}`);

    try{
        const res = await axios.post("http://localhost:8085/api/v1/auth/login", null, {
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Content-Type":"application/json",
                authorization: `Basic ${param}`
            }
        });
        if (res && res.data) {
            return {
                accessToken: res.headers['access-token'],
                user: res.data
            }
        }
    }catch(e){

        if(e.response && e.response.data && e.response.data.message){
            return {
                error: e.response.data.message
            };
        }
    }
    return null;
}

//API TO LOG OUT USER
//PASS ACCESS TOKEN
//LOGS OUT USER FROM SERVER
export const APILogoutUser = async(token)=> {
    try{
        const res = await axios.post("http://localhost:8085/api/v1/auth/logout", null, {
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Content-Type":"application/json",
                authorization: `Bearer ${token}`
            }
        });
        if (res && res.data) {
            console.log(res.data)
        }
    }catch(e){
        console.log("ERROR: ", e);
    }
    return null;
}