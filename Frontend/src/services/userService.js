import api from "./api";

export const getProfile=async()=>{

    const res=await api.get("/user/profile");

    return res.data.user;

};


export const updateProfile=async(data)=>{

    const res=await api.put(

        "/user/profile",

        data

    );

    return res.data.user;

};


export const getUserStats=async()=>{
    const res=await api.get("/user/stats");
    return res.data.stats;
};