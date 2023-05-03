
export function CheckTokenJWT({children}){
    const token=localStorage.getItem("token");
    console.log(children);
    if(token)
        return children;
    else
        return window.location.replace('login');
}