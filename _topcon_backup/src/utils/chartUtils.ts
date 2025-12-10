import { ChartType } from '../types';

// Map chart IDs to their position in the grid (1-based index)
export const CHART_DEFINITIONS = [
    // Row 1 - Charts 1-7 (Rotated E chart)
    'landolt-c-500',       // Chart 1
    'landolt-c-400',       // Chart 2
    'landolt-c-200',       // Chart 3
    'landolt-c-150',       // Chart 4
    'landolt-c-split-1',   // Chart 5
    'landolt-c-split-2',   // Chart 6
    'landolt-c-split-3',   // Chart 7

    // Row 2 - Charts 8-14 (Snellen Chart)
    'letters-multi-20',    // Chart 8
    'landolt-c-400-2',     // Chart 9
    'letters-enh-200',     // Chart 10
    'letters-hbv-100',     // Chart 11
    'letters-vlnea-70',    // Chart 12
    'letters-fzbde-40',    // Chart 13
    'letters-tzvec-20',    // Chart 14

    // Row 3 - Charts 15-21 (Mixed)
    'letters-evotl-20',    // Chart 15 (Snellen Chart)
    'letters-aplbk-25',    // Chart 16 (Snellen Chart)
    'red-green',           // Chart 17 (Duochrome Chart)
    'astigmatism',         // Chart 18 (Astigmatic fan chart)
    'dots',                // Chart 19 (JCC Chart)
    'red-green-lines',     // Chart 20 (Binocular Balance Chart)
    'fixation-dot',        // Chart 21 (Pinhole Chart)
] as const;

export function getChartNumber(chartId: ChartType): number {
    const index = CHART_DEFINITIONS.indexOf(chartId as any);
    return index !== -1 ? index + 1 : 0;
}

export function getChartName(chartId: ChartType): string {
    const chartNumber = getChartNumber(chartId);

    if (chartNumber >= 1 && chartNumber <= 7) {
        return 'Rotated E chart';
    } else if (chartNumber >= 8 && chartNumber <= 16) {
        return 'Snellen Chart';
    } else if (chartNumber === 17) {
        return 'Duochrome Chart';
    } else if (chartNumber === 18) {
        return 'Astigmatic fan chart';
    } else if (chartNumber === 19) {
        return 'JCC Chart';
    } else if (chartNumber === 20) {
        return 'Binocular Balance Chart';
    } else if (chartNumber === 21) {
        return 'Pinhole Chart';
    }

    return 'Unknown Chart';
}

export function getChartInfo(chartId: ChartType): { number: number; name: string } {
    return {
        number: getChartNumber(chartId),
        name: getChartName(chartId),
    };
}
