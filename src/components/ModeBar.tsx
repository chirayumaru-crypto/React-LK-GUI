import { useMingSing } from "../context/MingSingContext";
import { OperationMode } from "../types";

export function ModeBar() {
    const { state, dispatch } = useMingSing();
    const modes: OperationMode[] = ['FAR', 'NC', 'CV', 'FINAL'];

    return (
        <div className="flex gap-1 h-10 mt-2">
            {modes.map(mode => (
                <button
                    key={mode}
                    onClick={() => dispatch({ type: 'SET_MODE', payload: mode })}
                    className={`
            flex-1 font-bold text-white text-sm
            ${state.mode === mode ? 'bg-ms-dark' : 'bg-ms-medium hover:bg-blue-600'}
          `}
                >
                    {mode}
                </button>
            ))}
            <button className="flex-1 bg-ms-medium text-white font-bold text-sm">BACK</button>
            <button className="flex-1 bg-ms-medium text-white font-bold text-sm">NEXT</button>
        </div>
    );
}
