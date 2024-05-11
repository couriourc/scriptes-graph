import {BaseSchemes} from "rete";
import {ReactArea2D} from "rete-react-plugin";
import {ContextMenuExtra} from "rete-context-menu-plugin";

export interface Schemes extends BaseSchemes {

}

export type AreaExtra = ReactArea2D<any> | ContextMenuExtra;
