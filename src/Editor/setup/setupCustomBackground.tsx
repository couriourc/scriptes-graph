import { Editor } from "..";
import { css, cx } from "@emotion/css"
const fillArea = css` 
    display: table;
    z-index: -1;
    position: absolute;
    top: -320000px;
    left: -320000px;
    width: 640000px;
    height: 640000px;
  `

const backgroundStyle = css`
  background-color: #f7f6ff;
  opacity: 1;
  background-image: radial-gradient(#7b81ff 1.55px, transparent 1.55px),
    radial-gradient(#7b81ff 1.55px, #f7f6ff 1.55px);
  background-size: 62px 62px;
  background-position: 0 0, 31px 31px;
  point-events: none; 
  `

export function setupCustomBackground() {
    const { area } = Editor.get();
    const background = document.createElement("div");

    background.classList.add(cx(fillArea, backgroundStyle));

    area.area.content.add(background);
}

