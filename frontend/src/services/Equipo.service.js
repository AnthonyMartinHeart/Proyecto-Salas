import axios from './root.service.js';

export async function getServices(){
    try {
        const response = await axios.get("/Equipos/lista")
        return response
    } catch (error) {
        console.error("Error al obtener los servicios.", error);
    }
}

export const postService = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };
        const response = await axios.post('/Equipos/crear', data, config);
        return response.data;
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      throw error;
    }
  };

export async function putService(id, data) {
    try {
        const response = await axios.put(`/Equipos/actualizar/${id}`, data);
        return response;
    } catch (error) {
        console.error("Error al actualizar el equipo.", error);
    }
}

export async function delService(id) {
    try {
        const response = await axios.delete(`/Equipos/eliminar/${id}`);
        return response;
    } catch (error) {
        console.error("Error al eliminar el equipo:", error);
    }
}

export async function getServiceUno(id) {
    try {
        const response = await axios.get(`/Equipos/listarUno/${id}`);
        return response;
    } catch(error){
        console.error("Error al obtener los datos del objeto",error);
    }
}


