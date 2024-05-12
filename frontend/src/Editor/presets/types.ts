import { BaseSchemes, GetSchemes } from "rete";
import { ReactArea2D } from "rete-react-plugin";
import { ContextMenuExtra } from "rete-context-menu-plugin";
import { Nodes } from "./nodes";
import { Connections } from "./connections";

export type AreaExtra = ReactArea2D<any> | ContextMenuExtra;

export type Schemes = GetSchemes<Nodes, Connections>;
