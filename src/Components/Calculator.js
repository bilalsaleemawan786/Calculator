// import React from 'react'
// import { useState } from 'react';
// import { evaluate } from 'mathjs';
// const Calculator = () => {
//     const [input, setInput] = useState("");

//     const handleClick = (value) => {
//       setInput((prevInput) => prevInput+value);
//     };
  
//     const clearInput = () => {
//       setInput("");
//     };
  
//     const calculateResult = () => {
//       try {
//         setInput(evaluate(input).toString());
//       } catch {
//         setInput("Error");
//       }
//     };
  
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-blue-100">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//           <h1 className="text-center text-3xl font-bold text-blue-600 mb-4">OUTPUT</h1>
//           <input
//             type="text"
//             value={input}
//             readOnly
//             className="w-full h-12 text-right p-2 border rounded-lg mb-4 text-lg bg-gray-100"
//           />
//           <div className="grid grid-cols-4 gap-2">
//             <button
//               onClick={clearInput}
//               className="bg-red-500 text-white font-bold py-2 rounded-lg col-span-1"
//             >
//               C
//             </button>
//             <button
//               onClick={() => handleClick("/")}
//               className="bg-blue-500 text-white font-bold py-2 rounded-lg"
//             >
//               /
//             </button>
//             <button
//               onClick={() => handleClick("*")}
//               className="bg-blue-500 text-white font-bold py-2 rounded-lg"
//             >
//               *
//             </button>
//             <button
//               onClick={() => handleClick("-")}
//               className="bg-blue-500 text-white font-bold py-2 rounded-lg"
//             >
//               -
//             </button>
  
//             {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
//               <button
//                 key={num}
//                 onClick={() => handleClick(num.toString())}
//                 className="bg-gray-200 text-black font-bold py-2 rounded-lg"
//               >
//                 {num}
//               </button>
//             ))}
  
//             <button
//               onClick={() => handleClick("0")}
//               className="bg-gray-200 text-black font-bold py-2 rounded-lg col-span-1"
//             >
//               0
//             </button>
//             <button
//               onClick={() => handleClick(".")}
//               className="bg-gray-200 text-black font-bold py-2 rounded-lg"
//             >
//               .
//             </button>
//             <button
//               onClick={() => handleClick("+")}
//               className="bg-blue-500 text-white font-bold py-2 rounded-lg"
//             >
//               +
//             </button>
//             <button
//               onClick={calculateResult}
//               className="bg-green-500 text-white font-bold py-2 rounded-lg col-span-1"
//             >
//               =
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
// export default Calculator








// import React, { useState, useCallback, useEffect } from "react";
// import { evaluate } from "mathjs";

// // Define buttons outside component to prevent recreation
// const buttons = [
//   "7", "8", "9", "/",
//   "4", "5", "6", "*",
//   "1", "2", "3", "-",
//   "0", ".", "=", "+"
// ];

// const Calculator = () => {
//   const [input, setInput] = useState("");
//   const [history, setHistory] = useState([]);

//   // Handle number/operator input
//   const handleClick = useCallback((value) => {
//     setInput((prev) => {
//       if (prev === "Error") return value;
      
//       // Prevent multiple decimals in a number
//       if (value === ".") {
//         const parts = prev.split(/[+\-*/]/);
//         const lastPart = parts[parts.length - 1];
//         if (lastPart.includes(".")) return prev;
//       }

//       // Replace consecutive operators
//       if ("+-*/".includes(value)) {
//         const lastChar = prev.slice(-1);
//         if ("+-*/".includes(lastChar)) {
//           return prev.slice(0, -1) + value;
//         }
//       }

//       return prev + value;
//     });
//   }, []);

//   // Handle keyboard input
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "Enter") calculateResult();
//       else if (e.key === "Backspace") backspaceInput();
//       else if (e.key === "Escape") clearInput();
//       else if (buttons.includes(e.key)) handleClick(e.key);
//     };
    
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [handleClick]);

//   const clearInput = useCallback(() => setInput(""), []);
//   const backspaceInput = useCallback(() => {
//     setInput(prev => prev.slice(0, -1));
//   }, []);

//   const calculateResult = useCallback(() => {
//     try {
//       const result = evaluate(input).toString();
//       setHistory(prev => [...prev.slice(-3), `${input} = ${result}`]);
//       setInput(result);
//     } catch {
//       setInput("Error");
//       setTimeout(clearInput, 1500);
//     }
//   }, [input, clearInput]);

//   // Button styling helper
//   const getButtonStyle = (value) => {
//     if (value === "=") return "bg-gradient-to-b from-green-500 to-green-600 text-white";
//     if ("+-*/".includes(value)) return "bg-gradient-to-b from-blue-500 to-blue-600 text-white";
//     if (value === "0") return "col-span-2 bg-gray-100 hover:bg-gray-200";
//     return "bg-gray-100 hover:bg-gray-200";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
//             CalcPro
//           </span>
//         </h1>

//         {/* History */}
//         <div className="text-gray-500 text-right h-6">
//           {history[history.length - 1]}
//         </div>

//         {/* Display */}
//         <div className="bg-gray-50 rounded-lg p-4 text-right shadow-inner">
//           <div className="text-gray-500 text-sm h-6">
//             {input.length > 20 ? "..." : ""}
//           </div>
//           <div className="text-3xl font-semibold text-gray-800 truncate">
//             {input || "0"}
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="grid grid-cols-4 gap-3">
//           <button
//             onClick={clearInput}
//             className="col-span-2 bg-gradient-to-b from-red-500 to-red-600 text-white p-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
//           >
//             Clear
//           </button>
//           <button
//             onClick={backspaceInput}
//             className="col-span-2 bg-gradient-to-b from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
//           >
//             ⌫ Backspace
//           </button>

//           {buttons.map((btn) => (
//             <button
//               key={btn}
//               onClick={() => btn === "=" ? calculateResult() : handleClick(btn)}
//               className={`p-4 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all text-xl font-medium ${getButtonStyle(btn)}`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calculator;






import React, { useState, useCallback, useEffect } from "react";
import { evaluate } from "mathjs";

const buttons = [
  "π", "e", "√", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "⌫", "="
];

const SCIENTIFIC_BUTTONS = [
  "sin", "cos", "tan", "log",
  "asin", "acos", "atan", "ln",
  "(", ")", "^", "!"
];

const Calculator = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isScientific, setIsScientific] = useState(false);
  const [theme, setTheme] = useState("light");

  // Memoized core functions
  const clearInput = useCallback(() => setInput(""), []);
  
  const backspaceInput = useCallback(() => {
    setInput(prev => {
      if (prev.endsWith("sqrt(")) return prev.slice(0, -5);
      if (prev.endsWith("asin(") || prev.endsWith("acos(") || prev.endsWith("atan(")) 
        return prev.slice(0, -5);
      if (["sin(", "cos(", "tan(", "log(", "ln("].some(s => prev.endsWith(s)))
        return prev.slice(0, -4);
      return prev.slice(0, -1);
    });
  }, []);

  const calculateResult = useCallback(() => {
    try {
      const sanitizedInput = input
        .replace(/√/g, 'sqrt')
        .replace(/!/g, 'factorial');
      const result = evaluate(sanitizedInput).toString();
      setHistory(prev => [...prev.slice(-3), `${input} = ${result}`]);
      setInput(result);
    } catch (error) {
      setInput("Error");
      setTimeout(clearInput, 1500);
    }
  }, [input, clearInput]);

  // Helper functions
  const handleScientificValue = useCallback((value) => {
    if (["π", "e", "√"].includes(value)) {
      return value === "√" ? "sqrt(" : value === "π" ? Math.PI : Math.E;
    }
    return value;
  }, []);

  const handleInputRules = useCallback((prev, value) => {
    // Prevent invalid input patterns
    if (value === "." && /\.\d*$/.test(prev)) return prev;
    if (["+", "-", "*", "/"].includes(value) && /[+\-*/]$/.test(prev)) {
      return prev.slice(0, -1) + value;
    }
    
    // Handle special operations
    if (value === "√") return prev + "sqrt(";
    if (value === "^") return prev + "^";
    if (value === "!") return prev + "!";
    
    return prev + value;
  }, []);

  // Main click handler
  const handleClick = useCallback((value) => {
    setInput(prev => {
      if (prev === "Error") return handleScientificValue(value);
      
      if (["π", "e"].includes(value)) {
        return prev + (value === "π" ? Math.PI : Math.E);
      }

      if (["sin", "cos", "tan", "log", "ln", "asin", "acos", "atan"].includes(value)) {
        return prev + `${value}(`;
      }

      return handleInputRules(prev, value);
    });
  }, [handleInputRules, handleScientificValue]);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const keyActions = {
        Enter: calculateResult,
        Backspace: backspaceInput,
        Escape: clearInput,
      };

      if (keyActions[e.key]) {
        keyActions[e.key]();
      } else if (buttons.concat(SCIENTIFIC_BUTTONS).includes(e.key)) {
        handleClick(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleClick, calculateResult, backspaceInput, clearInput]);

  // Theme management
  const themes = {
    light: "from-gray-100 to-gray-300",
    dark: "from-gray-800 to-gray-900",
    cyber: "from-cyan-500 to-blue-800",
    nature: "from-green-400 to-emerald-800"
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[theme]} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className={`bg-${theme === 'dark' ? 'gray-700' : 'white'} rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 transition-all`}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
            CalcPro+
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {isScientific ? "Basic" : "Scientific"}
            </button>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="bg-gray-100 rounded-lg px-2"
            >
              {Object.keys(themes).map(theme => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* History & Display */}
        <div className="space-y-2">
          <div className="text-gray-500 text-right h-6 italic">
            {history.join(" → ")}
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'} rounded-lg p-4 shadow-inner`}>
            <div className="text-3xl font-mono truncate">
              {input || "0"}
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-4 gap-3">
          {[clearInput, backspaceInput].map((fn, i) => (
            <button
              key={i}
              onClick={fn}
              className={`col-span-2 p-4 rounded-xl text-white ${
                i === 0 ? 'bg-red-500 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {i === 0 ? "Clear" : "⌫ Backspace"}
            </button>
          ))}
          
          {(isScientific ? SCIENTIFIC_BUTTONS : buttons).map((btn) => (
            <button
              key={btn}
              onClick={() => btn === "=" ? calculateResult() : handleClick(btn)}
              className={`p-4 rounded-xl transition-all ${
                ["="].includes(btn) ? "bg-green-500 text-white" :
                ["/", "*", "-", "+", "^", "!"].includes(btn) ? "bg-blue-500 text-white" :
                theme === 'dark' ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;