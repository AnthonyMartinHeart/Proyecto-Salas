import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service.js';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    const [isReservasOpen, setIsReservasOpen] = useState(false);
    const [isRecursosOpen, setIsRecursosOpen] = useState(false);

    const logoutSubmit = async () => {
        try {
            await logout(); // Asegúrate de que `logout` sea una función async
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Mostrar mensaje de error si es necesario
        }
    };

    const toggleReservasSubMenu = () => {
        setIsReservasOpen(true);
        setIsRecursosOpen(false);
    };

    const toggleRecursosSubMenu = () => {
        setIsRecursosOpen(true);
        setIsReservasOpen(false);
    };

    const resetMenu = () => {
        setIsReservasOpen(false);
        setIsRecursosOpen(false);
    };

    return (
        <nav className="navbar">
            <ul>
                {(!isReservasOpen && !isRecursosOpen) ? (
                    <>
                        <li>
                            <img src="/2997606.png" alt="Logo metodología de desarrollo" />
                        </li>
                        <li className={location.pathname === "/home" ? "active" : ""}>
                            <NavLink to="/home">Inicio</NavLink>
                        </li>
                        <li className={location.pathname.startsWith("/reservas") ? "active" : ""}>
                            <span onClick={toggleReservasSubMenu} style={{ color: "white" }}>
                                Reservas
                            </span>
                        </li>
                        <li className={location.pathname.startsWith("/recursos") ? "active" : ""}>
                            <span onClick={toggleRecursosSubMenu} style={{ color: "white" }}>
                                Recursos
                            </span>
                        </li>
                        {userRole === 'administrador' && (
                            <li className={location.pathname === "/users" ? "active" : ""}>
                                <NavLink to="/users">Usuarios</NavLink>
                            </li>
                        )}
                        <li className={location.pathname === "/profile" ? "active" : ""}>
                            <NavLink to="/profile">Perfil</NavLink>
                        </li>
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                        </li>
                    </>
                ) : isReservasOpen ? (
                    <>
                        <li className={location.pathname === "/home" ? "active" : ""}>
                            <NavLink to="/home" onClick={resetMenu}>Inicio</NavLink>
                        </li>
                        <li className={location.pathname === "/obtenerreservas" ? "active" : ""}>
                            <NavLink to="/obtenerreservas">Ver Reservas</NavLink>
                        </li>
                        <li className={location.pathname === "/crearreservas" ? "active" : ""}>
                            <NavLink to="/crearreservas">Crear Reserva</NavLink>
                        </li>
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={location.pathname === "/home" ? "active" : ""}>
                            <NavLink to="/home" onClick={resetMenu}>Inicio</NavLink>
                        </li>
                        <li className={location.pathname === "/obtenerrecursos" ? "active" : ""}>
                            <NavLink to="/obtenerrecursos">Ver Recursos</NavLink>
                        </li>
                        <li className={location.pathname === "/crearrecursos" ? "active" : ""}>
                            <NavLink to="/crearrecursos">Crear Recurso</NavLink>
                        </li>
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
