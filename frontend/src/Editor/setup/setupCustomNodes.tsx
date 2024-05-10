import { Presets } from "rete-react-plugin";
import { Editor } from "..";

export function setupCustomNodes() {
    const { render } = Editor.get();
    render.addPreset(Presets.classic.setup({
        customize: {
            node() {
                return function CustomizeNode(props: { data: any }) {
                    const Component = props.data.Component ?? Presets.classic.Node;
                    return <Component {...props} />
                }
            }
        }
    }))
}