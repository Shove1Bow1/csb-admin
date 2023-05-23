export function CheckTokenJWT({children}){
    const token=localStorage.getItem("token");
    if(token)
        return children;
    else
        return window.location.replace('login');
}