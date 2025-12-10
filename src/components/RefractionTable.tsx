import { useMingSing } from '../context/MingSingContext';
import { RefractionParam } from '../types';

export function RefractionTable() {
    const { state, dispatch } = useMingSing();

    const formatValue = (num: number, isAxis: boolean = false) => {
        if (isAxis) return Math.round(num).toString();
        const val = Math.abs(num).toFixed(2);
        const finalSign = num >= 0 ? '+' : '-';
        return `${finalSign}${val}`;
    };

    const handleSelect = (field: RefractionParam, eye: 'RIGHT' | 'LEFT' | 'BOTH') => {
        dispatch({ type: 'SET_SELECTION', field, eye });
    };

    const Row = ({
        label,
        step,
        rVal,
        lVal,
        field,
        isAxis = false
    }: {
        label: string,
        step?: string,
        rVal: number,
        lVal: number,
        field: RefractionParam,
        isAxis?: boolean
    }) => {
        // Base Styling
        const baseClass = "flex items-center justify-center font-bold text-xl h-12 border-b border-white last:border-b-0 cursor-pointer transition-colors";
        const inactiveClass = "bg-[#bae6fd] text-black hover:bg-blue-300";
        const activeClass = "bg-[#1e3a8a] text-white"; // Deep Royal Blue

        // Determine activity per cell
        const isFieldActive = state.activeField === field;

        const isRightActive = isFieldActive && (state.activeEye === 'RIGHT' || state.activeEye === 'BOTH');
        const isLeftActive = isFieldActive && (state.activeEye === 'LEFT' || state.activeEye === 'BOTH');
        // Label is active if either is active (or maybe just if field is active?)
        // Let's match the visual style: if the row is "focused", the label is usually highlighted.
        const isLabelActive = isFieldActive;

        return (
            <div className="grid grid-cols-[1fr_120px_1fr]">
                {/* Right Eye Value */}
                <div
                    onClick={() => handleSelect(field, 'RIGHT')}
                    className={`${baseClass} ${isRightActive ? activeClass : inactiveClass} border-r border-white`}
                >
                    {/* Show Occluded State? Or just value? User said disable EDIT, not hide. */}
                    {state.occlusion.right ? <span className="opacity-50">CLOSED</span> : formatValue(rVal, isAxis)}
                </div>

                {/* Label / Step */}
                <div
                    onClick={() => handleSelect(field, 'BOTH')}
                    className={`${baseClass} ${isLabelActive ? activeClass : inactiveClass} text-sm font-medium`}
                >
                    {label}{step ? `(${step})` : ''}
                </div>

                {/* Left Eye Value */}
                <div
                    onClick={() => handleSelect(field, 'LEFT')}
                    className={`${baseClass} ${isLeftActive ? activeClass : inactiveClass} border-l border-white`}
                >
                    {state.occlusion.left ? <span className="opacity-50">CLOSED</span> : formatValue(lVal, isAxis)}
                </div>
            </div>
        );
    };

    return (
        <div className="flex select-none">
            {/* Vertical Label Left (Right Eye Header) */}
            <div className="w-8 flex items-center justify-center">
                <span className="transform -rotate-90 text-2xl tracking-widest font-bold text-gray-800 whitespace-nowrap font-sans">
                    RIGHTEYE
                </span>
            </div>

            {/* Main Table */}
            <div className="flex-1 flex flex-col">
                {/* Rows container */}
                <div className="flex flex-col border border-white">
                    <Row field="sph" label="S" step="0.25" rVal={state.eyes.right.sph} lVal={state.eyes.left.sph} />
                    <Row field="cyl" label="C" step="-0.25" rVal={state.eyes.right.cyl} lVal={state.eyes.left.cyl} />
                    <Row field="axis" label="A" step="5" rVal={state.eyes.right.axis} lVal={state.eyes.left.axis} isAxis />
                    <Row field="hPrism" label="H" step="0.1" rVal={state.eyes.right.hPrism} lVal={state.eyes.left.hPrism} />
                    <Row field="vPrism" label="V" step="0.1" rVal={state.eyes.right.vPrism} lVal={state.eyes.left.vPrism} />
                    <Row field="add" label="ADD" rVal={state.eyes.right.add} lVal={state.eyes.left.add} />
                </div>
            </div>

            {/* Vertical Label Right (Left Eye Header) */}
            <div className="w-8 flex items-center justify-center">
                <span className="transform rotate-90 text-2xl tracking-widest font-bold text-gray-800 whitespace-nowrap font-sans">
                    LEFTEYE
                </span>
            </div>
        </div>
    );
}
