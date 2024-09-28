import React, { useState } from "react";

function App() {
  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomColors = () => {
    return Array.from({ length: 5 }, () => randomColor());
  };

  const [colors, setColors] = useState(generateRandomColors());
  const [lockedColors, setLockedColors] = useState([]);


  const generatePalette = () => {
    const newColors = colors.map((color, index) =>
      lockedColors.includes(index) ? color : randomColor()
    );
    setColors(newColors);
  };


  const toggleLockColor = (index) => {
    if (lockedColors.includes(index)) {
      setLockedColors(lockedColors.filter((i) => i !== index));
    } else {
      setLockedColors([...lockedColors, index]);
    }
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };
  return (
    <>
      <div className="App min-h-screen bg-gradient-to-r from-blue-900  to-black   flex flex-col items-center">
          <h1 className="text-4xl text-white font-semibold my-14 ">Random Color Palette Generator</h1>
          <div className="Palette  justify-center space-x-2 grid p-24 grid-cols-5 place-items-center ">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`relative w-48 h-48 flex flex-col justify-center items-center border-2 
            ${lockedColors.includes(index) ? 'border-green-500' : 'border-gray-300'} 
            transition duration-300 ease-in-out rounded-lg`}
                style={{ backgroundColor: color }}
                onClick={() => copyToClipboard(color)}
              >
                <p className="text-white font-semibold">{color}</p>
                <button
                  className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded bg-purple-800 hover:bg-purple-900 text-white border-2`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLockColor(index);
                  }}
                >
                  {lockedColors.includes(index) ? "unlock" : "lock"}
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center m-5">
          <button className="px-5  py-4 bg-[#1BFFFF] hover:bg-sky-600 rounded-lg text-2xl font-semibold border border-black hover:border-2" onClick={generatePalette}>Generate new Palette</button>
          </div>
      </div>
    </>
  );
}

export default App;
