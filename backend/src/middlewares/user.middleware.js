/**
 * Middleware para verificar si el usuario tiene permisos de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función de middleware
 */
async function isUser(req, res, next) {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'No estás autenticado' });
      }
      const userRole = req.session.user.rolName;
      if (userRole === 'usuario' || userRole === 'administrador') {
        next();
      } else {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
      }
    } catch (error) {
      console.log("Error en auth.middleware.js -> isUser(): ", error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  
  
  export { isUser };
  