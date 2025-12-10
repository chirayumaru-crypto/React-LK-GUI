import React from 'react';
import { useRefraction, RefractionKey, EyeSide } from '../../context/RefractionContext';

// Common row labels
const ROW_LABELS: Exclude<RefractionKey, 'PD'>[] = ['SPH', 'CYL', 'AXIS', 'ADD'];

export const RefractionTable: React.FC = () => {
    const { data, activeField, activeEye, setField, setEye, pd, formatValue, toggleOcclusion } = useRefraction();

    const getCellClass = (field: RefractionKey, side: 'OD' | 'OS') => {
        const isFieldActive = activeField === field;
        const isSideActive = activeEye === side || activeEye === 'BOTH';
        return `
      bg-white flex items-center justify-center font-mono text-lg text-blue-900 
      cursor-pointer transition-colors select-none
      ${isFieldActive && isSideActive ? 'bg-ms-active font-bold' : 'hover:bg-yellow-50'}
      ${data[side].isOccluded ? 'bg-gray-800 text-gray-500' : ''}
    `;
    };

    const handleCellClick = (field: RefractionKey, side: 'OD' | 'OS') => {
        setField(field);
        setEye(side);
    };

    const handlePDClick = () => {
        setField('PD');
        setEye('BOTH');
    }

    const renderOcclusionCircle = (side: EyeSide) => {
        const isOccluded = data[side].isOccluded;
        return (
            <button
                onClick={(e) => { e.stopPropagation(); toggleOcclusion(side); }}
                className={`w-4 h-4 rounded-full border border-white ml-2 flex items-center justify-center transition-colors
                ${isOccluded ? 'bg-red-500' : 'bg-green-500'}
            `}
                title={isOccluded ? "Un-occlude" : "Occlude"}
            />
        )
    }

    return (
        <div className="bg-white border border-gray-300 rounded shadow-sm flex flex-col overflow-hidden text-sm sm:text-base">
            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_1fr] bg-ms-dark text-white font-bold h-10 items-center">
                <div className="text-center text-xs">DATA</div>
                <div
                    className={`flex items-center justify-center border-l border-white/20 cursor-pointer h-full ${activeEye === 'OD' ? 'bg-white/20' : ''}`}
                    onClick={() => setEye('OD')}
                >
                    R (OD)
                    {renderOcclusionCircle('OD')}
                </div>
                <div
                    className={`flex items-center justify-center border-l border-white/20 cursor-pointer h-full ${activeEye === 'OS' ? 'bg-white/20' : ''}`}
                    onClick={() => setEye('OS')}
                >
                    L (OS)
                    {renderOcclusionCircle('OS')}
                </div>
            </div>

            {/* Table Content */}
            <div className="grid grid-cols-[60px_1fr_1fr] divide-y divide-gray-200">
                {ROW_LABELS.map((label) => (
                    <React.Fragment key={label}>
                        {/* Label Column */}
                        <div className="bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs py-3 border-r border-gray-200">
                            {label}
                        </div>

                        {/* Right Eye Data */}
                        <div
                            className={getCellClass(label, 'OD')}
                            onClick={() => handleCellClick(label, 'OD')}
                        >
                            {formatValue(data.OD[label], label)}
                        </div>

                        {/* Left Eye Data */}
                        <div
                            className={getCellClass(label, 'OS')}
                            onClick={() => handleCellClick(label, 'OS')}
                        >
                            {formatValue(data.OS[label], label)}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* PD Section */}
            <div
                className={`grid grid-cols-[60px_1fr] border-t-2 border-gray-300 mt-auto cursor-pointer ${activeField === 'PD' ? 'bg-ms-active' : ''}`}
                onClick={handlePDClick}
            >
                <div className="bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-xs py-4">PD</div>
                <div className="bg-blue-50 flex items-center justify-center font-mono text-lg text-blue-900 py-2">
                    {pd.toFixed(1)} mm
                </div>
            </div>
        </div>
    );
};
