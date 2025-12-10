import { useMingSing } from '../context/MingSingContext';
import { MingSingLogEntry } from '../types';

export function CSVExporter() {
    const { state, dispatch } = useMingSing();

    const handleDownload = () => {
        if (state.logs.length === 0) {
            alert("No logs to export.");
            return;
        }

        const headers = [
            "timestamp", "R_SPH", "R_CYL", "R_AXIS", "R_ADD",
            "L_SPH", "L_CYL", "L_AXIS", "L_ADD", "PD",
            "Chart_Number", "Occluder_State", "Chart_Display",
            "Speaker", "Utterance_Text", "Translation_in_En",
            "Speaker_Intent", "Detected_Language",
            "Patient_Confidence_Score\n(0 - no confidence; 10 - 100% conviction)",
            "Hesitation_Markers", "Requires_Verification"
        ];

        const csvContent = [
            headers.join(','),
            ...state.logs.map((log: MingSingLogEntry) => [
                log.timestamp,
                log.r_sph, log.r_cyl, log.r_axis, log.r_add,
                log.l_sph, log.l_cyl, log.l_axis, log.l_add,
                log.pd,
                log.chart_number,
                `"${log.occluder_state}"`, // Quote strings that might have spaces
                `"${log.chart_display}"`,
                log.speaker,
                log.utterance_text,
                log.translation_in_en,
                log.speaker_intent,
                log.detected_language,
                log.patient_confidence_score,
                log.hesitation_markers,
                log.requires_verification
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'mingsing_logs.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleClear = () => {
        if (confirm("Are you sure you want to clear the logs?")) {
            dispatch({ type: 'CLEAR_LOGS' });
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <div className="text-white text-sm font-medium">
                Logs: {state.logs ? state.logs.length : 0}
            </div>
            <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-bold shadow transition-colors"
                title="Download Logs as CSV"
            >
                Export CSV
            </button>
            {state.logs && state.logs.length > 0 && (
                <button
                    onClick={handleClear}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-bold shadow transition-colors"
                    title="Clear Logs"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
