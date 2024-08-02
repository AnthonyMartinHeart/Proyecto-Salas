import axios from './root.service.js'; // Asegúrate de que la ruta sea correcta

// Obtener todos los reportes de uso de recursos
export const getAllReports = async () => {
    try {
        const response = await axios.get('/Reportes/get'); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al obtener los reportes');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

// Crear un nuevo reporte de uso de recursos
export const createReport = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.post('/Reportes/create', data, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al crear el reporte');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

// Obtener un reporte específico por ID
export const getReportById = async (id) => {
    try {
        const response = await axios.get(`/Reportes/${id}`); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al obtener el reporte');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

// Actualizar un reporte por ID
export const updateReport = async (id, data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.put(`/Reportes/update/${id}`, data, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al actualizar el reporte');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

// Eliminar un reporte por ID
export const deleteReport = async (id) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.delete(`/Reportes/delete/${id}`, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al eliminar el reporte');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};
