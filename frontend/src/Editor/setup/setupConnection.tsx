import { ClassicFlow } from "rete-connection-plugin";
import { Editor } from "..";

export function setupConnection() {
    const { connection } = Editor.get();
    connection.addPreset(
        () =>
            new ClassicFlow({
                canMakeConnection(from, to) {
                    return true;
                },
                makeConnection(from, to, context) {

                    return true;
                },
            })
    );

    // editor.addPipe((context) => {
    //     // if (context.type === "connectioncreate") {
    //     //     const { data } = context;
    //     //     const { source, target } = getConnectionSockets(editor, data);

    //     //     if (!source.isCompatibleWith(target)) {
    //     //         log("Sockets are not compatible", "error");
    //     //         return;
    //     //     }
    //     // }
    //     return context;
    // });
}