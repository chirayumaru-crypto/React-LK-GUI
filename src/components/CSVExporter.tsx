import { useState } from 'react';
import { useEyeData } from '../hooks/useEyeData';
import { LogEntry } from '../types';

export function CSVExporter() {
    const { state, dispatch } = useEyeData();
    const [downloadStatus, setDownloadStatus] = useState<string>('');

    const exportToCSV = () => {
        console.log('[CSVExporter] Export button clicked');
        console.log('[CSVExporter] Number of logs:', state.logs.length);

        if (state.logs.length === 0) {
            setDownloadStatus('No data to export!');
            setTimeout(() => setDownloadStatus(''), 3000);
            return;
        }

        try {
            console.log('[CSVExporter] Creating CSV content...');

            // CSV headers - using tab delimiter for better Excel compatibility
            const headers = [
                'timestamp',
                'R_SPH',
                'R_CYL',
                'R_AXIS',
                'R_ADD',
                'L_SPH',
                'L_CYL',
                'L_AXIS',
                'L_ADD',
                'PD',
                'Chart_Number',
                'Occluder_State',
                'Chart_Display',
                'Speaker',
                'Utterance_Text',
                'Translation_in_En',
                'Speaker_Intent',
                'Detected_Language',
                '"Patient_Confidence_Score\n(0 - no confidence; 10 - 100% conviction)"',
                'Hesitation_Markers',
                'Requires_Verification',
            ];

            const csvContent = [
                headers.join('\t'),
                ...state.logs.map((log: LogEntry) => [
                    log.timestamp,
                    log.R_SPH,
                    log.R_CYL,
                    log.R_AXIS,
                    log.R_ADD,
                    log.L_SPH,
                    log.L_CYL,
                    log.L_AXIS,
                    log.L_ADD,
                    log.PD,
                    log.Chart_Number,
                    log.Occluder_State,
                    log.Chart_Display,
                    log.Speaker,
                    log.Utterance_Text,
                    log.Translation_in_En,
                    log.Speaker_Intent,
                    log.Detected_Language,
                    log.Patient_Confidence_Score,
                    log.Hesitation_Markers,
                    log.Requires_Verification,
                ].join('\t'))
            ].join('\n');

            console.log('[CSVExporter] CSV content created, length:', csvContent.length);

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            console.log('[CSVExporter] Blob created, size:', blob.size);

            const url = URL.createObjectURL(blob);
            console.log('[CSVExporter] Blob URL created:', url);

            const link = document.createElement('a');
            const filename = `refraction_log_${new Date().toISOString().split('T')[0]}.csv`;

            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);

            console.log('[CSVExporter] Triggering download...');
            link.click();

            console.log('[CSVExporter] Cleaning up...');
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            console.log('[CSVExporter] Download completed successfully!');
            setDownloadStatus(`✅ Downloaded: ${filename}`);
            setTimeout(() => setDownloadStatus(''), 5000);
        } catch (error) {
            console.error('[CSVExporter] Error exporting CSV:', error);
            setDownloadStatus('❌ Export failed - check console');
            setTimeout(() => setDownloadStatus(''), 5000);
        }
    };

    const clearLogs = () => {
        if (window.confirm(`Are you sure you want to clear all ${state.logs.length} log entries?`)) {
            dispatch({ type: 'CLEAR_LOGS' });
            setDownloadStatus('Logs cleared');
            setTimeout(() => setDownloadStatus(''), 3000);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <span>Logs:</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{state.logs.length}</span>
            </div>
            {downloadStatus && (
                <div className="text-xs font-bold px-2 py-1 bg-yellow-100 border border-yellow-400 rounded">
                    {downloadStatus}
                </div>
            )}
            <button
                onClick={exportToCSV}
                disabled={state.logs.length === 0}
                className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                title="Export all logs to CSV file"
            >
                📥 Export CSV
            </button>
            <button
                onClick={clearLogs}
                disabled={state.logs.length === 0}
                className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                title="Clear all logged data"
            >
                🗑️ Clear
            </button>
        </div>
    );
}
