import { Editor } from "..";
import { Presets } from "rete-react-plugin";
import { Schemes } from "../../types";
import {
    ContextMenuPlugin,
    Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";
import { StringNode } from "../presets/nodes/variables/string";
import { MakeStringNode } from "../presets/nodes/constructor/makeString";

export function setupContextMenu() {
    const { render, area } = Editor.get()


    const contextMenu = new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresets.classic.setup([
            ["string", () => new StringNode("")],
            ["make string", () => new MakeStringNode("")],
        ]),
    });

    render.addPreset(
        Presets.contextMenu.setup({
            customize: {
            },
        })
    );

    area.use(contextMenu);

}