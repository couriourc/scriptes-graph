import { AreaExtensions } from "rete-area-plugin";
import { Editor } from "..";

export function setupArea() {
    const { area } = Editor.get()

    AreaExtensions.simpleNodesOrder(area);
    AreaExtensions.showInputControl(area);
    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });


}