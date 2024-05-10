import { ClassicFlow } from "rete-connection-plugin";
import { Editor } from "..";
import { getSourceTarget } from 'rete-connection-plugin'

export function setupConnection() {
    const { connection, editor } = Editor.get();
    connection.addPreset(
        () =>
            new ClassicFlow({
                canMakeConnection(from, to) {
                    console.log(from.payload.isCompatibleWith(to))
                    return from.payload.isCompatibleWith(to.payload);
                },
                makeConnection(from, to, context) {
                    const [source, target] = getSourceTarget(from, to) || [null, null];
                    if (source && target) {
                        // editor.addConnection(
                        //     new MyConnection(
                        //         editor.getNode(source.nodeId),
                        //         source.key,
                        //         editor.getNode(target.nodeId),
                        //         target.key
                        //     )
                        // );
                    }
                    return true;
                },
            })
    );
}