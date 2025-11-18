import React, { useEffect, useRef } from 'react';
import { History } from 'lucide-react';

interface DisplayProps {
  value: string;
  result: string;
  historyVisible: boolean;
  toggleHistory: () => void;
}

const Display: React.FC<DisplayProps> = ({ value, result, historyVisible, toggleHistory }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [value]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-inner mb-6 relative overflow-hidden border border-gray-200 dark:border-gray-800">
       <button 
         onClick={toggleHistory}
         className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${historyVisible ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
       >
         <History size={18} />
       </button>

      <div className="flex flex-col items-end justify-end h-24">
        <div className="w-full overflow-x-auto no-scrollbar text-right">
            <span className="text-gray-500 dark:text-gray-400 text-lg font-mono whitespace-nowrap">
              {result}
            </span>
        </div>
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={value}
          className="w-full bg-transparent text-right text-4xl font-bold text-gray-900 dark:text-white outline-none font-mono"
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default Display;
