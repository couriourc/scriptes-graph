import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaPlugin } from "rete-area-plugin";
import { ConnectionPlugin } from "rete-connection-plugin";
import { ReactPlugin } from "rete-react-plugin";
import {
    AutoArrangePlugin,
} from "rete-auto-arrange-plugin";
import { Singleton } from "@couriourc/design-patterns";
import { AreaExtra, Schemes } from "../types";
import {
    setupContextMenu,
    setupCustomBackground,
    setupArea,
    setupConnection,
    setupArranges,
} from "./setup"

export const Editor = new Singleton<{
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>,
    connection: ConnectionPlugin<Schemes, AreaExtra>,
    render: ReactPlugin<Schemes, AreaExtra>,
    arrange: AutoArrangePlugin<Schemes, AreaExtra>,
}>();

export async function createEditor(container: HTMLElement) {
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const arrange = new AutoArrangePlugin<Schemes, AreaExtra>();

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(arrange);

    Editor.set({
        editor,
        area,
        render,
        arrange,
        connection,
    });

    setupArea();
    setupArranges();
    setupConnection();
    setupCustomBackground();
    setupContextMenu();

    return {
        destroy: () => area.destroy(),
    };
}
