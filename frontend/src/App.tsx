import {useCallback,} from "react";
import "./App.css";

import {createEditor} from "./Editor";
import {useRete} from "rete-react-plugin";
import {Terminal} from "./Terminal/Terminal.tsx";
import {cx} from "@emotion/css";

function App() {
    const create = useCallback((el: HTMLElement) => {
        return createEditor(el);
    }, []);
    const [ref] = useRete(create);

    return (
        <div className="container">
            <div ref={ref} style={{position: 'fixed', top: 0, left: 0, height: "100vh", width: "100vw"}}/>
            <Terminal
                className={cx('fixed bottom-0 left-50% -translate-x-50% h-200px w-full m-auto shadow-lg rounded-lg ')}/>
        </div>
    );
}

export default App;
