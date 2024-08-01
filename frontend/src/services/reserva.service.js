import axios from './root.service.js'; // Asegúrate de que la ruta sea correcta

export const createReserva = async (data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.post('/Reservas/new', data, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al crear la reserva');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};

export const getAllReservas = async () => {
    try {
        const response = await axios.get('/Reservas/get'); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al obtener las reservas');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};


// Función para actualizar una reserva desde el frontend
export const updateReserva = async (id, data) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        console.log("ID de la reserva:", id); // Log del ID de la reserva
        console.log("Datos enviados para actualizar la reserva:", data); // Log de los datos que se envían

        // Añadimos un log para verificar la existencia de datos
        if (Object.keys(data).length === 0) {
            console.warn("Los datos enviados están vacíos"); // Advertencia si los datos están vacíos
        } else {
            console.log("Datos disponibles para enviar:", data); // Log de los datos si no están vacíos
        }

        const response = await axios.put(`/Reservas/update/${id}`, data, config); // Asegúrate de que la ruta sea correcta

        console.log("Respuesta del servidor:", response.data); // Log de la respuesta del servidor
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            console.error("Error de respuesta del servidor:", error.response.data.message || 'Error al actualizar la reserva'); // Log del error de respuesta
            throw new Error(error.response.data.message || 'Error al actualizar la reserva');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            console.error("No se recibió respuesta del servidor"); // Log del error de solicitud
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            console.error("Error al configurar la solicitud:", error.message); // Log del error de configuración
            throw new Error(error.message);
        }
    }
};

// Función para eliminar una reserva desde el frontend
export const deleteReserva = async (id) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        };

        const response = await axios.delete(`/Reservas/delete/${id}`, config); // Asegúrate de que la ruta sea correcta
        return response.data; // Devolvemos los datos de la respuesta
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado distinto de 2xx
            throw new Error(error.response.data.message || 'Error al eliminar la reserva');
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            throw new Error('No se recibió respuesta del servidor');
        } else {
            // Algo pasó al configurar la solicitud que provocó un error
            throw new Error(error.message);
        }
    }
};