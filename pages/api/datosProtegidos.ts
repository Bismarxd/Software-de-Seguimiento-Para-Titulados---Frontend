import apiClient from "@/api/apiClient";

const datosProtegidos = async () => {
  try {
    const response = await apiClient.get('/administrador');
    console.log('Datos protegidos:', response.data);
  } catch (error) {
    console.error('Error al acceder a datos protegidos:', error);
  }
};