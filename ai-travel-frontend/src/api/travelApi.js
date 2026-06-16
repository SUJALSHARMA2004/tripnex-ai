import axios from "axios";

const API = axios.create({

    baseURL: "https://tripnex-ai.onrender.com/api/travel",

});

export const createPlan = (data) => API.post("/plan", data);
export const getPlans = () => API.get("/plans");
export const deletePlan = (id) => API.delete(`/plan/${id}`);
