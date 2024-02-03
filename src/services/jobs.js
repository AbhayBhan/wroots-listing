import { axiosInstance } from "./axiosInstance";
import axios from "./axios";

export const fetchActiveJobs = () =>
  axiosInstance.get("/roleRouter/getActiveRoles");

export function getJobDetails(_data) {
  return axios.get(
    `https://ahypf5qicf.execute-api.us-east-1.amazonaws.com/Development/roles/${_data}`
  );
}
