import User from 'App/Models/User';


export const getRoleCodes = (user?: User) => {
    return user?.toJSON().roles.map(role => role.code) || [];
}

export const hashCode = function (s) {
    return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}

