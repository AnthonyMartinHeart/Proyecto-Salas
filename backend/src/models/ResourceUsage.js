// models/ResourceUsage.js
import mongoose from 'mongoose';

const ResourceUsageSchema = new mongoose.Schema({
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Resource'
    },
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
        enum: ['Good', 'Needs Maintenance', 'Out of Order']
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('ResourceUsage', ResourceUsageSchema);
