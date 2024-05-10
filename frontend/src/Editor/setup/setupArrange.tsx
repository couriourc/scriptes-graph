import { Editor } from "..";
import {
    Presets as ArrangePresets,
} from "rete-auto-arrange-plugin";

export function setupArranges() {
    const { arrange } = Editor.get();
    arrange.addPreset(ArrangePresets.classic.setup());
}