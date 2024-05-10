import { CommentPlugin } from "rete-comment-plugin";
import { CommentExtensions } from "rete-comment-plugin";
import { Editor } from "..";
import { AreaExtensions } from "rete-area-plugin";
export function setupComment() {
    const { area } = Editor.get();
    const comment = new CommentPlugin<Schemes, AreaExtra>();

    const selector = AreaExtensions.selector();
    const accumulating = AreaExtensions.accumulateOnCtrl();

    CommentExtensions.selectable(comment, selector, accumulating);

    area.use(comment);
}