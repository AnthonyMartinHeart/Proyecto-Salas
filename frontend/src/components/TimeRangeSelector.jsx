// TimeRangeSelector.jsx
import React, { useState } from 'react';

const TimeRangeSelector = ({ onAddTimeRange, onRemoveTimeRange, timeRanges }) => {
    const [newRange, setNewRange] = useState('');

    const handleAddRange = () => {
        if (newRange.trim() !== '') {
            onAddTimeRange(newRange);
            setNewRange('');
        }
    };

    const handleChange = (e) => {
        setNewRange(e.target.value);
    };

    if (!Array.isArray(timeRanges)) {
        console.error('timeRanges debe ser un arreglo');
        return null;
    }

    return (
        <div>
            <input
                type="text"
                value={newRange}
                onChange={handleChange}
                placeholder="Agregar rango de tiempo"
            />
            <button type="button" onClick={handleAddRange}>
                Agregar
            </button>
            {timeRanges.length > 0 && (
                <ul>
                    {timeRanges.map((range, index) => (
                        <li key={index}>
                            {range}
                            <button type="button" onClick={() => onRemoveTimeRange(index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TimeRangeSelector;
