import React, { useState, useCallback } from 'react';
import { Calculator as CalcIcon, Sparkles, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { create, all } from 'mathjs';

import ThemeToggle from './components/ThemeToggle';
import Display from './components/Display';
import ScientificPad from './components/ScientificPad';
import AIPanel from './components/AIPanel';
import { CalculatorMode, HistoryItem } from './types';

// Configure mathjs instance
const math = create(all);

function App() {
  const [mode, setMode] = useState<CalculatorMode>(CalculatorMode.STANDARD);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Calculator Logic
  const handleInput = useCallback((val: string) => {
    setExpression(prev => prev + val);
  }, []);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('');
  }, []);

  const handleDelete = useCallback(() => {
    setExpression(prev => prev.slice(0, -1));
  }, []);

  const handleFunction = useCallback((func: string) => {
    setExpression(prev => prev + func);
  }, []);

  const handleEqual = useCallback(() => {
    if (!expression) return;
    try {
      // Sanitize input slightly, though mathjs is relatively safe for expression parsing
      // Note: In a real app, you might want stricter validation
      const finalResult = math.evaluate(expression);
      
      // Format logic
      let formattedResult = String(finalResult);
      if (typeof finalResult === 'number') {
          // Round to reasonable decimal places if it's a float
          formattedResult = parseFloat(finalResult.toFixed(10)).toString();
      }

      setResult(formattedResult);
      
      setHistory(prev => [
        { expression, result: formattedResult, timestamp: Date.now() },
        ...prev.slice(0, 9) // Keep last 10
      ]);
      
      // Optional: update expression to result for continuous calculation
      // setExpression(formattedResult); 
    } catch (error) {
      setResult('Error');
    }
  }, [expression]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-4xl flex flex-col md:flex-row gap-6">
        
        {/* Navigation & Mode Switcher (Mobile: Top, Desktop: Side if needed, but kept simple) */}
        
        {/* Main Calculator Container */}
        <div className="flex-1 w-full max-w-md mx-auto md:mx-0 flex flex-col">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                 <CalcIcon size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Calc<span className="text-blue-600">AI</span></h1>
            </div>
            <ThemeToggle />
          </header>

          {/* Mode Toggle Tabs */}
          <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-xl flex mb-6 relative">
            <button
              onClick={() => setMode(CalculatorMode.STANDARD)}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2",
                mode === CalculatorMode.STANDARD 
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              )}
            >
              <CalcIcon size={16} />
              Calculator
            </button>
            <button
              onClick={() => setMode(CalculatorMode.AI)}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2",
                mode === CalculatorMode.AI 
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              )}
            >
              <Sparkles size={16} />
              AI Mode
            </button>
          </div>

          {mode === CalculatorMode.STANDARD ? (
            <div className="relative">
              <Display 
                value={expression} 
                result={result} 
                historyVisible={showHistory}
                toggleHistory={() => setShowHistory(!showHistory)}
              />
              
              {showHistory && (
                 <div className="absolute top-[110px] left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-20 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4 max-h-64 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-500 text-sm uppercase">History</h3>
                        <button onClick={() => setHistory([])} className="text-xs text-red-500 hover:underline">Clear</button>
                    </div>
                    {history.length === 0 ? (
                        <p className="text-center text-gray-400 py-4 text-sm">No calculations yet</p>
                    ) : (
                        history.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 dark:border-gray-800 py-2 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 rounded"
                                 onClick={() => {
                                     setExpression(item.expression);
                                     setResult(item.result);
                                     setShowHistory(false);
                                 }}>
                                <div className="text-gray-400 text-xs mb-1">{item.expression} =</div>
                                <div className="text-gray-800 dark:text-gray-200 font-mono text-lg">{item.result}</div>
                            </div>
                        ))
                    )}
                 </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-950/50 p-6 rounded-3xl border border-gray-200 dark:border-gray-800/50 shadow-xl">
                <ScientificPad
                  onInput={handleInput}
                  onClear={handleClear}
                  onDelete={handleDelete}
                  onEqual={handleEqual}
                  onFunction={handleFunction}
                />
              </div>
            </div>
          ) : (
            <div className="h-full">
              <AIPanel />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl text-sm text-blue-800 dark:text-blue-300">
                 <p className="flex items-start gap-2">
                   <Sparkles size={16} className="mt-0.5 flex-shrink-0" />
                   <span><strong>Tip:</strong> Try asking "Calculate the volume of a sphere with radius 5" or "Simplify (2x + 3)^2".</span>
                 </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop Sidebar Info (Optional aesthetic filler to balance layout on large screens) */}
        <div className="hidden md:flex flex-col justify-center w-64 text-gray-400 dark:text-gray-600 p-4">
           <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-gray-200 mb-2">Shortcuts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>Enter</span> <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">=</span></li>
                <li className="flex justify-between"><span>Esc</span> <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">Clear</span></li>
                <li className="flex justify-between"><span>Backspace</span> <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">Del</span></li>
              </ul>
           </div>
           <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
             <p className="text-xs leading-relaxed">
               This app uses <strong>Gemini 2.5 Flash</strong> to understand natural language math queries. The standard mode runs locally using mathjs.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}

export default App;
