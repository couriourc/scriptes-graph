import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { Nodes } from "../nodes";

class Connection<
    A = Nodes,
    B = Nodes
> extends ClassicPreset.Connection<A, B> { }

export type Connections = Connection;