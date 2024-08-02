// models/ResourceUsage.js
import mongoose from 'mongoose';

const ResourceUsageSchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: true
    },
    usageFrequency: {
        type: Number,
        required: true
    },
    peakHours: {
        type: [String],
        required: true
    },
    equipmentStatus: {
        type: String,
        required: true,
        enum: ['Ok', 'Necesita mantencion', 'Fuera de Uso']
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ResourceUsage', ResourceUsageSchema);
