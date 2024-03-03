import { useEffect, useState } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.100.17:8000/api",
  params: {
    token: null,
  },
});

const useClient = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    setToken(tokenFromLocalStorage);
  }, []);

  useEffect(() => {
    client.defaults.params.token = token;
  }, [token]);

  return client;
};

export default useClient;
