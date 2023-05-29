import axios from "axios";
import { serverUrl } from "../constant/server.constant";
import { redirect } from "react-router-dom";

export async function loginRequest(name, password) {
  const dataServer = await axios.post(
    "https://api.call-spam-blocker.xyz/admin/login",
    {
      name,
      password,
    }
  );
  const { token } = dataServer.data.result;
  if (token) {
    localStorage.setItem("token", token);
    window.location.replace("/");
  } else {
    return dataServer.data.meta.error;
  }
}
