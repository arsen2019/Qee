import axios from "axios";

export const PUBLIC_API_URL_STRAPI = import.meta.env.PUBLIC_API_URL_STRAPI;
const PUBLIC_API_URL_BACKEND = import.meta.env.PUBLIC_API_URL_BACKEND;
export const apiStrapi = axios.create({
    baseURL: PUBLIC_API_URL_STRAPI,
    timeout: 10000,
});

export const apiBackend = axios.create({
    baseURL: PUBLIC_API_URL_BACKEND,
    timeout: 10000,
});
