export function logOut(){
    localStorage.removeItem('token');
    window.location.href='/login';
}