import axios from "axios";
const serverSideBaseURL = "http://localhost:3000/api";
const clientSideBaseURL = "http://localhost:3000/api";

const requestInstance = axios.create({
	baseURL: serverSideBaseURL
});

export const clientRequestInstance = axios.create({
	baseURL: clientSideBaseURL
});
