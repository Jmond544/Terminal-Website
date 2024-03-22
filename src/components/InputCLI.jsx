import { useEffect, useRef } from "react";
import { help, Jiso, secretCommands, whois } from "../utils/commands";
export default function InputCLI({
  command,
  setCommand,
  oldCommands,
  setOldCommands,
  elements,
  setElements,
}) {
  const actualPosition = useRef(oldCommands.length - 1);

  function commandDisplay({ cmd }) {
    if (cmd === "whois") {
      return whois;
    }
    if (cmd === "secret") {
      return secretCommands;
    }
    if (cmd === "clear") {
      return "";
    }
    if (cmd === "help") {
      return help;
    }
    if (cmd === "ls") {
      return "whois\nsecret\nclear\nhelp\nls";
    }
    if (cmd === "Jisoo") {
      return Jiso;
    }
    return "Command not found";
  }

  const handleKeysUp = (e) => {
    if (e.key === "Enter") {
      setOldCommands([...oldCommands, command]);
      if (command === "clear") {
        setElements([]);
      } else if (command === "exit") {
        window.location.href = "https://www.google.com";
      } else {
        setElements([
          ...elements,
          {
            type: "command",
            value: command,
          },
          {
            type: "response",
            value: commandDisplay({ cmd: command }),
          },
        ]);
      }
      setCommand("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (actualPosition.current > 0) {
        actualPosition.current = actualPosition.current - 1;
        setCommand(oldCommands[actualPosition.current]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (actualPosition.current < oldCommands.length - 1) {
        actualPosition.current = actualPosition.current + 1;
        setCommand(oldCommands[actualPosition.current]);
      } else {
        setCommand("");
      }
    }
  };
  useEffect(() => {
    actualPosition.current = oldCommands.length;
  }, [oldCommands]);

  return (
    <div className="flex flex-row items-center text-slate-100">
      <p className="text-amber-400 font-bold">jmond544@linux:~$ </p>
      <input
        autoFocus
        type="text"
        placeholder="Enter your command"
        onChange={(e) => setCommand(e.target.value)}
        className="bg-slate-950 outline-none w-full h-10 px-4 border-none"
        onKeyUp={handleKeysUp}
        onKeyDown={handleKeyDown}
        value={command}
      />
    </div>
  );
}
