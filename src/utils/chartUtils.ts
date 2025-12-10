export const getChartInfo = (chartId: string) => {
    if (!chartId) return { number: '', display: '' };

    // Group mapping names (General Name for Chart Number column)
    const groupNameMap: Record<string, string> = {
        'E': 'E Chart',
        'C': 'C Chart',
        'letters': 'Letters Chart',
        'numbers': 'Number Chart',
        'children': 'Picture Chart',
        'special': 'General Test Chart',
        'mask': 'Mask Chart'
    };

    // Special/Specific mapping for display name
    const specialMap: Record<string, string> = {
        'dots': 'JCC Chart',
        'rg': 'Duochrome Chart',
        'cross': 'Cross Cylinder Chart',
        'clock': 'Astigmatic Chart',
        'stereo': 'Stereo Circles',
        'schober': 'Schober Test',
        'phoria': 'Phoria Lines',
        'horiz': 'Horizontal Mask',
        'vert': 'Vertical Mask',
        'single': 'Single Optotype',
        'rg_filter': 'R/G Filter'
    };

    // Helper to get group name
    const getGroup = (key: string) => groupNameMap[key] || key;

    // Direct match check (e.g. 'dots')? 
    // Wait, charts are now like 'special-dots'.

    const parts = chartId.split('-');
    if (parts.length === 2) {
        const [groupKey, value] = parts;

        // General Name
        const generalName = getGroup(groupKey);

        // Handle Mask group
        if (groupKey === 'mask') {
            const display = specialMap[value] || value;
            return { number: generalName, display: display };
        }

        // Handle Special group
        if (groupKey === 'special') {
            const display = specialMap[value] || value;
            if (value === 'rg') return { number: 'Duochrome Chart', display: display };
            if (value === 'dots') return { number: 'JCC Chart', display: display };
            if (value === 'cross') return { number: 'Cross Cylinder Chart', display: display };
            if (value === 'clock') return { number: 'Astigmatic Chart', display: display };
            return { number: generalName, display: display };
        }

        // Standard VA chart: Group + Value
        // Chart Number = "E Chart"
        // Chart Display = "0.5"
        return { number: generalName, display: value };
    }

    // Fallback if ID is simple string (e.g. old IDs)
    if (specialMap[chartId]) return { number: 'General Test Chart', display: specialMap[chartId] };

    return {
        number: chartId,
        display: chartId
    };
};
