
import { ReroutePlugin, RerouteExtensions, } from "rete-connection-reroute-plugin";
import { Editor } from "..";
import { Presets } from "rete-react-plugin";
import { AreaExtensions } from "rete-area-plugin";

export function setupReroute() {
    const { render, area } = Editor.get();
    const reroutePlugin = new ReroutePlugin<Schemes>();


    render.addPreset(Presets.reroute.setup({
        contextMenu(id) {
            reroutePlugin.remove(id);
        },
        translate(id, dx, dy) {
            reroutePlugin.translate(id, dx, dy);
        }
    }));


    const selector = AreaExtensions.selector();
    const accumulating = AreaExtensions.accumulateOnCtrl();

    AreaExtensions.selectableNodes(area, selector, { accumulating });
    RerouteExtensions.selectablePins(reroutePlugin, selector, accumulating);

    render.use(reroutePlugin);
} 
