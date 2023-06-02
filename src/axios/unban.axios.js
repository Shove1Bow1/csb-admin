import axios from "axios";
import { serverUrl,token } from "../constant/server.constant";
export async function getListUnban(page,limit){
    const data=await axios.get(serverUrl+'/phone-numbers/unban',{
        headers:{
            token
        },
        params:{
            page:page||0,
            limit:limit||25
        }
    });
    return data.data.result;
}
export async function unbanANumber(phoneNumber){
    const data=await axios.patch(serverUrl+'/phone-numbers/'+phoneNumber+'/unban/accept',{
    },{
        headers:{
            token
        }
    })
    return data.data.result;
}
export async function cancelAnUnban(phoneNumber){
    const data=await axios.patch(serverUrl+'/phone-numbers/'+phoneNumber+'/unban/cancel',{
    },{
        headers:{
            token
        }
    })
    return data;
}