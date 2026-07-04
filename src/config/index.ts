import axios, { AxiosInstance } from "axios";

import { UMMAH_BASE_URL } from "@/constants";

export const UMMAH_INSTANCE: AxiosInstance = axios.create({
  baseURL: UMMAH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
