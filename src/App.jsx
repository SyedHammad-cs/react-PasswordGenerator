import { useCallback, useEffect, useRef, useState } from "react";

// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // const passwordGenerator = () => {}\
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumbersAllowed) str += "0123456789";
    if (isCharAllowed) str += "~!@#$%^&*+-_/?";

    for (let i = 0; i < length; i++) {
      let newChar = Math.floor(Math.random() * str.length + 1);
      // password += str[newChar]
      pass += str.charAt(newChar);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, isNumbersAllowed, setIsCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharAllowed, isNumbersAllowed, passwordGenerator]);

  const passRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 font-mono">
      <h1 className="text-white text-center font-semibold text-2xl my-3">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyToClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-4">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNumbersAllowed}
            id="numberInput"
            onChange={() => {
              setIsNumbersAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="cursor-pointer">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isCharAllowed}
            id="characterInput"
            onChange={() => {
              setIsCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="cursor-pointer">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
