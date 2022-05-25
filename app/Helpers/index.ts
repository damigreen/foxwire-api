import User from 'App/Models/User';


export const getRoleCodes = (user?: User) => {
    console.log(user);
    return user?.toJSON().roles.map(role => role.code) || [];
}

