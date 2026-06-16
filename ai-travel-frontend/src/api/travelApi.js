import axios from "axios";

const API = axios.create({

    baseURL: "https://tripnex-ai-sxdd.onrender.com",

});

export const createPlan = (data) => API.post("/plan", data);
export const getPlans = () => API.get("/plans");
export const deletePlan = (id) => API.delete(`/plan/${id}`);
