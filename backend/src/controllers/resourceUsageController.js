//CREADO POR PATRICIO ESPARZA

import ResourceUsage from '../models/ResourceUsage.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

// Obtener todos los reportes de uso de recursos
export const getAllReports = async (req, res) => {
    try {
        const reports = await ResourceUsage.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo reporte de uso de recursos
export const createReport = async (req, res) => {
    // Verifica si req.body.resourceId es un ObjectId válido
    if (!ObjectId.isValid(req.body.resourceId)) {
        return res.status(400).json({ message: 'Id Del Recurso Invalido.' });
    }

    const report = new ResourceUsage({
        resourceId: req.body.resourceId,
        resourceName: req.body.resourceName,
        usageFrequency: req.body.usageFrequency,
        peakHours: req.body.peakHours,
        equipmentStatus: req.body.equipmentStatus
    });

    try {
        const newReport = await report.save();
        res.status(201).json({ message: 'Reporte creado exitosamente.', report: newReport });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo crear el reporte.', error: error.message });
    }
};

// Obtener un reporte específico por ID
export const getReportById = async (req, res) => {
    try {
        const report = await ResourceUsage.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Reporte No Encontrado.' });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Hola
// Actualizar un reporte por ID
export const updateReport = async (req, res) => {
    try {
        const report = await ResourceUsage.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Reporte No Encontrado' });

        // Actualiza solo los campos que se proporcionan en req.body
        if (req.body.resourceId) report.resourceId = req.body.resourceId;
        if (req.body.resourceName) report.resourceName = req.body.resourceName;
        if (req.body.usageFrequency) report.usageFrequency = req.body.usageFrequency;
        if (req.body.peakHours) report.peakHours = req.body.peakHours;
        if (req.body.equipmentStatus) report.equipmentStatus = req.body.equipmentStatus;

        const updatedReport = await report.save();
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un reporte por ID
export const deleteReport = async (req, res) => {
    try {
        const report = await ResourceUsage.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Reporte No encontrado' });

        await ResourceUsage.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Reporte Borrado.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

