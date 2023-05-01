import axios from "axios";
import { serverUrl } from "../constant/server.constant";

export async function loginRequest(name, password){
    const result=await axios.post(serverUrl+'admin/login',{
        name,
        password
    }); 
    // console.log(result.data);
    // if(result.data){
       
    //     return result.data;
    // }
    // else{
    //     return result.data;
    // }
    return result.data
}
