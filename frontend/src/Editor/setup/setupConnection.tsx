// @ts-nocheck

import { ClassicFlow } from "rete-connection-plugin";
import { Editor } from "..";
import { getSourceTarget } from 'rete-connection-plugin'
import {
    useMagneticConnection,
    MagneticConnection
} from "./magnetic-connection/index";
import { ClassicPreset } from "rete";
import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";

export function setupConnection() {
    const { connection, editor, render } = Editor.get();
    render.addPreset(
        Presets.classic.setup({
            customize: {
                connection(data) {
                    if (data.payload.isMagnetic) return MagneticConnection;
                    return Presets.classic.Connection;
                }
            }
        })
    );
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMagneticConnection(connection, {
        async createConnection(from, to) {
            if (from.side === to.side) return;
            const [source, target] = from.side === "output" ? [from, to] : [to, from];
            const sourceNode = editor.getNode(source.nodeId);
            const targetNode = editor.getNode(target.nodeId);

            await editor.addConnection(
                new ClassicPreset.Connection(
                    sourceNode,
                    source.key as never,
                    targetNode,
                    target.key as never
                )
            );
        },
        display(from, to) {
            return from.side !== to.side;
        },
        offset(socket, position) {
            const socketRadius = 10;

            return {
                x:
                    position.x + (socket.side === "input" ? -socketRadius : socketRadius),
                y: position.y
            };
        }
    });
}