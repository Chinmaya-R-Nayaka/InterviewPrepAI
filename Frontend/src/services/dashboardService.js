import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export const getDashboard = async () => {

    const res = await axios.get(

        `${API}/api/dashboard`,

        {
            withCredentials: true,
        }

    );

    return res.data;

};