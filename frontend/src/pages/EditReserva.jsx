import Form from "../components/Form.jsx"; // Importa el componente de formulario
import Navbar from "../components/Navbar.jsx"; // Importa el componente de barra de navegación
import { updateReserva } from "../services/reserva.service.js"; // Importa la función para actualizar reservas
import { useLocation, useNavigate } from "react-router-dom"; // Importa hooks de react-router-dom


const EditReserva = () => {
  
    const location = useLocation();   // Hook para obtener la ubicación actual (estado de navegación)
    const navigate = useNavigate();  // Hook para navegar a otras rutas

    // Obtén los datos de reserva desde la ubicación
    const reserva = location.state?.reserva;

    // Maneja el caso en que no se pasa la reserva correctamente
    if (!reserva) {
        return (
            <div className="main-container">
                <Navbar />
                <div className="form-wrapper">
                    <p>No se encontraron datos de reserva. Por favor, inténtalo de nuevo.</p>
                </div>
            </div>
        );
    }

     // Función para manejar la actualización de la reserva
    const modReserva = (data) => {
        console.log("Datos enviados para actualizar la reserva:", data); // Log para los datos que se envían

        updateReserva(reserva._id, data) // Llama a la función de servicio para actualizar la reserva
            .then(response => {
                console.log("Reserva actualizada exitosamente:", response); // Log para la respuesta del servidor
                navigate('/obtenerreservas'); // Redirige a la página de reservas o donde desees
            })
            .catch(error => {
                console.error("Error al actualizar la reserva:", error); // Log de error
            });
    };

    return (
        <div className="main-container">
            <Navbar />
<<<<<<< HEAD
            <div className="form-wrapper">
                <Form
                    title="Editar reserva"
                    fields={[
                        {
                            label: "Nombre",
                            name: "nombre",
                            placeholder: reserva.nombre || "Nombre de la reserva",
                            type: "text",
                            value: reserva.nombre
                        },
                        {
                            label: "Tipo",
                            name: "tipo",
                            placeholder: reserva.tipo || "Tipo de reserva",
                            type: "text",
                            value: reserva.tipo
                        },
                        {
                            label: "Capacidad",
                            name: "capacidad",
                            placeholder: reserva.capacidad || "Capacidad",
                            type: "number",
                            value: reserva.capacidad
                        },
                        {
                            label: "Horario",
                            name: "horario",
                            placeholder: reserva.horario || "Horario",
                            type: "text",
                            value: reserva.horario
                        },
                        {
                            label: "Código Asignatura",
                            name: "codigoAsignatura",
                            placeholder: reserva.codigoAsignatura || "Código Asignatura",
                            type: "text",
                            value: reserva.codigoAsignatura
                        },
                        {
                            label: "Código Clase",
                            name: "codigoClase",
                            placeholder: reserva.codigoClase || "Código Clase",
                            type: "text",
                            value: reserva.codigoClase
                        },
                        {
                            label: "Nombre Asignatura",
                            name: "nombreAsignatura",
                            placeholder: reserva.nombreAsignatura || "Nombre Asignatura",
                            type: "text",
                            value: reserva.nombreAsignatura
                        },
                        {
                            label: "Nombre Profesor",
                            name: "nombreProfesor",
                            placeholder: reserva.nombreProfesor || "Nombre Profesor",
                            type: "text",
                            value: reserva.nombreProfesor
                        },
                        {
                            label: "Cantidad",
                            name: "cantidad",
                            placeholder: reserva.cantidad || "Cantidad",
                            type: "number",
                            value: reserva.cantidad
                        },
                        {
                            label: "Patrimonio",
                            name: "patrimonio",
                            placeholder: reserva.patrimonio || "Patrimonio",
                            type: "text",
                            value: reserva.patrimonio
                        },
                    ]}
                    buttonText="Guardar cambios"
                    onSubmit={modReserva}
                />
=======
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar reserva" // Título del formulario
                        fields={[
                            {
                                label: "Nombre", // Etiqueta del campo
                                name: "nombre", // Nombre del campo (clave del objeto de datos)
                                placeholder: reserva.nombre || "Nombre de la reserva", // Placeholder del campo
                                type: "text", // Tipo de input
                                value: reserva.nombre // Valor inicial del campo
                            },
                            {
                                label: "Tipo",
                                name: "tipo",
                                placeholder: reserva.tipo || "Tipo de reserva",
                                type: "text",
                                value: reserva.tipo
                            },
                            {
                                label: "Capacidad",
                                name: "capacidad",
                                placeholder: reserva.capacidad || "Capacidad",
                                type: "number",
                                value: reserva.capacidad
                            },
                            {
                                label: "Horario",
                                name: "horario",
                                placeholder: reserva.horario || "Horario",
                                type: "text",
                                value: reserva.horario
                            },
                            {
                                label: "Código Asignatura",
                                name: "codigoAsignatura",
                                placeholder: reserva.codigoAsignatura || "Código Asignatura",
                                type: "text",
                                value: reserva.codigoAsignatura
                            },
                            {
                                label: "Código Clase",
                                name: "codigoClase",
                                placeholder: reserva.codigoClase || "Código Clase",
                                type: "text",
                                value: reserva.codigoClase
                            },
                            {
                                label: "Nombre Asignatura",
                                name: "nombreAsignatura",
                                placeholder: reserva.nombreAsignatura || "Nombre Asignatura",
                                type: "text",
                                value: reserva.nombreAsignatura
                            },
                            {
                                label: "Nombre Profesor",
                                name: "nombreProfesor",
                                placeholder: reserva.nombreProfesor || "Nombre Profesor",
                                type: "text",
                                value: reserva.nombreProfesor
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",
                                placeholder: reserva.cantidad || "Cantidad",
                                type: "number",
                                value: reserva.cantidad
                            },
                            {
                                label: "Patrimonio",
                                name: "patrimonio",
                                placeholder: reserva.patrimonio || "Patrimonio",
                                type: "text",
                                value: reserva.patrimonio
                            },
                        ]}
                        buttonText="Guardar cambios" // Texto del botón de envío
                        onSubmit={modReserva} // Función a ejecutar en el envío del formulario
                    />
                </div>
>>>>>>> 2a0b04d73577641c973c27e4d08ef615dcf109a7
            </div>
        </div>
    );
};

export default EditReserva;
