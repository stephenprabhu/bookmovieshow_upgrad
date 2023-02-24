import axios from 'axios';


//GET MOVIE BY ID
//RETURNS ERROR OR MOVIE OBJECT
export const APIGetMovie = async(moveiId) => {

    try{
        const res = await axios.get("http://localhost:8085/api/v1/movies/"+moveiId,{
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Content-Type":"application/json",
            }
        });
        if (res && res.data) {
            return {
                movie: res.data
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