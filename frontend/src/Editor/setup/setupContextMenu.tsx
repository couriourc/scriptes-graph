import { Editor } from "..";
import { Presets } from "rete-react-plugin";
import { Schemes } from "../../types";
import {
    ContextMenuPlugin,
    Presets as ContextMenuPresets,
} from "rete-context-menu-plugin";
import { StringNode } from "../presets/nodes/variables/string";
import { MakeStringNode } from "../presets/nodes/constructor/makeString";
import { styled } from "styled-components";
import { OperatorNode } from "../presets/nodes/operator";
import { AddNode } from "../presets/nodes/operator/add";

export function setupContextMenu() {
    const { render, area } = Editor.get()

    console.log(

    )
    const { Menu, Common, Search, Item, Subitems } = Presets.contextMenu;

    const contextMenu = new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresets.classic.setup(
            [
                ["string", () => new StringNode("")],

                ["make string", () => new MakeStringNode("")],

                ["add", () => new AddNode("")]
            ]
        ),
    });

    const CustomMenu = styled(Menu)`
    width: 320px;
  `
    const CustomItem = styled(Item)`
    background: grey;
  `

    render.addPreset(
        Presets.contextMenu.setup({
            customize: {
                main: () => CustomMenu,
                item: () => CustomItem,
                common: () => Common,
                search: () => Search,
                subitems: () => Subitems
            },
        })
    );

    area.use(contextMenu);

}