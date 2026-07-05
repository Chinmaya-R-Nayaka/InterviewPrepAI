import api from "./api";

export const getProblems = async (params = {}) => {
    const res = await api.get("/problems", {
        params,
    });

    return res.data;
};

export const addProblem = async (problem) => {
    const res = await api.post("/problems", problem);
    return res.data;
};

export const updateProblem = async (id, problem) => {
    const res = await api.put(`/problems/${id}`, problem);
    return res.data;
};

export const deleteProblem = async (id) => {
    const res = await api.delete(`/problems/${id}`);
    return res.data;
};