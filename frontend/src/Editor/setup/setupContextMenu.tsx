import { Editor } from "..";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";
import { Schemes } from "../../types";
import {
    ContextMenuPlugin,
    Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";

export function setupContextMenu() {
    const { render, area } = Editor.get()


    const contextMenu = new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresets.classic.setup([
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