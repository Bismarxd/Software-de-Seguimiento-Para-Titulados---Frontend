import axios from "axios";

const axiosInstance = axios.create({
  // Configura aquí la base URL de tu API, si es necesario
  baseURL: "http://localhost:3000/",
  // Puedes agregar configuraciones adicionales de Axios aquí
});

export default axiosInstance;
