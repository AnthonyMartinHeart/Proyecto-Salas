import axios from './root.service.js'; // Asegúrate de que la ruta sea correcta

export const createSolicitud = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.post('/solicitud/create', data, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al crear la solicitud');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

export const getSolicitudes = async () => {
    try {
        const response = await axios.get('/solicitud/get'); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al obtener las solicitudes');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

export const updateSolicitud = async (id, data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        console.log("ID de la solicitud:", id); // Log del ID de la solicitud
        console.log("Datos enviados para actualizar la solicitud:", data); // Log de los datos que se envían

        // Verifica que los datos no estén vacíos
        if (Object.keys(data).length === 0) {
            console.warn("Los datos enviados están vacíos"); // Advertencia si los datos están vacíos
        } else {
            console.log("Datos disponibles para enviar:", data); // Log de los datos si no están vacíos
        }

        const response = await axios.put(`/solicitud/update/${id}`, data, config); // Asegúrate de que la ruta sea correcta

        console.log("Respuesta del servidor:", response.data); // Log de la respuesta del servidor
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            console.error("Error de respuesta del servidor:", error.response.data.message || 'Error al actualizar la solicitud'); // Log del error de respuesta
            throw new Error(error.response.data.message || 'Error al actualizar la solicitud');
        } else if (error.request) {
            console.error("No se recibió respuesta del servidor"); // Log del error de solicitud
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error("Error al configurar la solicitud:", error.message); // Log del error de configuración
            throw new Error(error.message);
        }
    }
};

export const deleteSolicitud = async (id) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.delete(`/solicitud/delete/${id}`, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al eliminar la solicitud');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};
