import InputCLI from "./InputCLI";
import { useState } from "react";

export default function Terminal() {
  const [oldCommands, setOldCommands] = useState([]); // [""]
  const [command, setCommand] = useState("");
  const [elements, setElements] = useState([]);
    console.log(elements)
  return (
    <div className="w-screen min-h-screen bg-slate-950">
      <h1>Terminal</h1>
      {elements.map((element, index) => {
        if (element.type === "command") {
          return (
            <p key={index} className="text-amber-100 font-bold">
              {`> ${element.value}`}
            </p>
          );
        }
        if (element.type === "response") {
          return (
            <p key={index} className="text-green-400">
              {Array.isArray(element.value) ? (
                element.value.map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))
              ) : (
                <span>{element.value}</span>
              )}
            </p>
          );
        }
        return null;
      })}
      <InputCLI
        command={command}
        setCommand={setCommand}
        oldCommands={oldCommands}
        setOldCommands={setOldCommands}
        elements={elements}
        setElements={setElements}
      />
    </div>
  );
}
