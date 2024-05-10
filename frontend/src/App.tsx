import { useCallback, } from "react";
import "./App.css";

import { createEditor } from "./Editor";
import { useRete } from "rete-react-plugin";
import { AppProvider } from "./providers";

function App() {
  const create = useCallback((el: HTMLElement) => { return createEditor(el); }, []);
  const [ref] = useRete(create);

  return (
    <div className="container">
      <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, height: "100vh", width: "100vw" }} />
    </div>
  );
}

export default App;
