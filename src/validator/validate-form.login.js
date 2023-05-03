import { regexName } from "../constant/regex.constant";

export function validateName(name){
    if(!name){
        return 'Admin name need to be filled';
    }
    const nameLength=name.length;
    if(nameLength<3){
        return 'admin name is shorter than 3 characters';
    }
    if(nameLength>50){
        return 'admin name is longer than 50 characters';
    }
    if(!regexName.test(name)){
        return 'admin name contains only letters and numbers'; 
    }
}

export function validatePassword(password){
    if(!password){
        return 'Password need to be filled';
    }
    if(password.length<3){
        return 'Password is shorter than 3 characters'
    }
    if(password.length>50){
        return 'Password is longer than 50 characters'
    }
}

