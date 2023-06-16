import axios from "axios";
import { serverUrl } from "../constant/server.constant";
import { redirect } from "react-router-dom";

export async function loginRequest(name, password) {
  const dataServer = await axios.post(
    serverUrl + '/admin/login',
    {
      name,
      password,
    }
  );
  if (dataServer.data.result) {
    const { token } = await dataServer.data.result;
    return {token};
  }
  else{
    const {error} =await dataServer.data.meta;
    return {error};
  }

}
