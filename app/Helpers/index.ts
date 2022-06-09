import User from 'App/Models/User';


export const getRoleCodes = (user?: User) => {
    console.log(user?.toJSON());
    return user?.toJSON().roles.map(role => role.code) || [];
}

export const hashCode = function (length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

