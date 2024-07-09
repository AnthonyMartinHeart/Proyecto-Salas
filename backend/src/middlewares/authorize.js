export default function authorize(req, res, next) {
    // Aquí podrías comprobar si el usuario está autenticado y tiene permisos
    // Puedes usar req.user si tienes un sistema de autenticación configurado
    if (req.user && req.user.role === 'encargado_bodega') {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden: unauthorized' });
    }
};