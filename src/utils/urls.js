export const frontendUrls = 
{
    login: "/login",
    dashboard: "/",
    rawData: "/data",
    adminUsers: "/admin/users",
    adminWindturbines: "/admin/windturbines",
};

const backendUrl = "https://server-windturbines.onrender.com/api/";
export const backendUrls = 
{
    postLogin: backendUrl + "authentication",

    getLimitedWindTurbineHistories: (id) => backendUrl + "histories/windturbine/" + id + "?findTop18=true",
    getWindTurbineHistories: (id) => backendUrl + "histories/windturbine/" + id + "?findTop18=false",
    getWindTurbines: backendUrl + "windturbines",

    getUsers: backendUrl + "users",
    postUser: backendUrl + "users",
    putUser: (id) =>  backendUrl + "users/" + id,
    deleteUser: (id) =>  backendUrl + "users/" + id,
};