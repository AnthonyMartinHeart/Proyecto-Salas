import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import CrearReserva from './pages/CrearReserva';
import ObtenerReserva from './pages/ObtenerReserva';
import EditReserva from './pages/EditReserva';
import CrearRecurso from './pages/CrearRecurso';
import ObtenerRecurso from './pages/ObtenerRecurso';
import EditRecurso from './pages/EditRecurso';
import CrearSolicitud from './pages/CrearSolicitud';
import ObtenerSolicitud from './pages/ObtenerSolicitud';
import EditSolicitud from './pages/EditSolicitud';
import CrearReporte from './pages/CrearReporte';
import ObtenerReporte from './pages/ObtenerReporte';
import EditReporte from './pages/EditReporte';
import Listar from './pages/ListarEquipo';
import Eliminar from './pages/EliminarEquipo';
import Crear from './pages/CrearEquipo';
import Actualizar from './pages/ActualizarEquipo';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />



      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        } 
      />

        <Route 
        path="/obtenerreservas" 
        element={
          
            <ObtenerReserva />
          
        } 
      />

      <Route 
        path="/crearreservas" 
        element={
          
            <CrearReserva />
          
        } 
      />
            <Route 
        path="/edit-reserva/:id" 
        element={
          
            <EditReserva  />
          
        } 
      />
      
      <Route 
        path="/obtenerrecursos" 
        element={
          
            <ObtenerRecurso  />
          
        } 
      />
      
      <Route 
        path="/crearrecursos" 
        element={
          
            <CrearRecurso />
          
        } 
      />

      <Route 
        path="/edit-recurso/:id" 
        element={
          
            <EditRecurso />
          
        } 
      />

      <Route 
        path="/crearsolicitud" 
        element={
          
            <CrearSolicitud />
          
        } 
      />
      
      <Route 
        path="/obtenersolicitudes" 
        element={
          
            <ObtenerSolicitud />
          
        } 
      />

      <Route 
        path="edit-solicitud/:id" 
        element={
          
            <EditSolicitud />
          
        } 
      />
      
      <Route path = "/Equipo/listar" element={<Listar/>}/>
      <Route path = "/Equipo/crear" element={<Crear/>}/>
      <Route path = "/Equipo/actualizar/:id" element = {<Actualizar/>}/>
      <Route path = "/Equipo/eliminar" element = {<Eliminar/>}/>

      <Route 
        path="/crearreportes" 
        element={
          
            <CrearReporte />
          
        } 
      />
      
      <Route 
        path="/obtenerreportes" 
        element={
          
            <ObtenerReporte />
          
        } 
      />

      <Route 
        path="edit-reporte/:id" 
        element={
          
            <EditReporte />
          
        } 
      />
      
      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-user/:rut" 
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
