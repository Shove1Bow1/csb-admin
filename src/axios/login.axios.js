import axios from "axios";
import { serverUrl } from "../constant/server.constant";

export async function loginRequest(name, password) {
  console.log(serverUrl + "admin/login");
  const result = await axios.post("http://localhost:8000admin/login", {
    name,
    password,
  });
  console.log(result);
  // if(result.data){
  //     return result.data;
  // }
  // else{
  //     return result.data;
  // }
  // return result.data
}
