import { AreaExtensions } from "rete-area-plugin";
import { Editor } from "..";

export function setupArea() {
    const { area } = Editor.get()

    AreaExtensions.simpleNodesOrder(area);
    AreaExtensions.showInputControl(area);


    const selector = AreaExtensions.selector();
    const accumulating = AreaExtensions.accumulateOnCtrl();
    AreaExtensions.selectableNodes(area, selector, { accumulating });


}