import {Terminal as XtermTerminal} from "xterm";
import {ComponentProps, useEffect, useRef} from "react";

import {CanvasAddon} from '@xterm/addon-canvas';
import {FitAddon} from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import {css, cx} from "@emotion/css";
import {BaseComponentProps} from "../types.ts";

import {SearchAddon} from '@xterm/addon-search';
import {Unicode11Addon} from '@xterm/addon-unicode11';

import {LigaturesAddon} from '@xterm/addon-ligatures';

import {ImageAddon, IImageAddonOptions} from '@xterm/addon-image';

import {SerializeAddon} from "@xterm/addon-serialize";

import {WebLinksAddon} from '@xterm/addon-web-links';


const customSettings: IImageAddonOptions = {
    enableSizeReports: true,    // whether to enable CSI t reports (see below)
    pixelLimit: 16777216,       // max. pixel size of a single image
    sixelSupport: true,         // enable sixel support
    sixelScrolling: true,       // whether to scroll on image output
    sixelPaletteLimit: 256,     // initial sixel palette size
    sixelSizeLimit: 25000000,   // size limit of a single sixel sequence
    storageLimit: 128,          // FIFO storage limit in MB
    showPlaceholder: true,      // whether to show a placeholder for evicted images
    iipSupport: true,           // enable iTerm IIP support
    iipSizeLimit: 20000000      // size limit of a single IIP sequence
};

export function Terminal(props: BaseComponentProps) {
    const el = useRef<HTMLDivElement>();
    const terminal = new XtermTerminal({
        cursorBlink: true,
        disableStdin: false,
        //   启用时光标将设置为下一行的开头
        convertEol: true,

        // 光标闪烁
        theme: {
            foreground: '#333333',
            cursor: 'gray',
            background: '#f1f2f6',
        },
        allowProposedApi: true
    });

    const fitAddon = new FitAddon();
    const unicode11Addon = new Unicode11Addon();
    const searchAddon = new SearchAddon();
    const ligaturesAddon = new LigaturesAddon();
    const imageAddon = new ImageAddon(customSettings);
    const serializeAddon = new SerializeAddon();


    // activate the new version
    const keyAction = () => {
        const terminalTitleTemplate = '';
// 定义变量获取整行数据
        let currentLineData = '';
// 历史行输入数据
        let historyLineData = [];
        let last = 0;
        // 使其能够输入汉字
        terminal.onKey(async ({key}) => {
            console.log(key);
            //enter键
            if (key.charCodeAt(0) === 13) {
                // 将行数据进行添加进去
                if (currentLineData !== '') {
                    //将当前行数据传入历史命令数组中存储
                    historyLineData.push(currentLineData);
                    //定义当前行命令在整个数组中的位置
                    last = historyLineData.length - 1;
                }
                //当输入clear时清空终端内容
                if (currentLineData === 'clear') {
                    terminal.clear();
                }

                //在这可以进行发起请求将整行数据传入

                // 清空当前行数据
                currentLineData = '';

                terminal.write(`\r\n${terminalTitleTemplate}: `);
            } else if (key.charCodeAt(0) === 127) {
                //删除键--》当前行偏移量x大于终端提示符所占位置时进行删除
                if (terminal.buffer.active.cursorX > terminalTitleTemplate.length + 1) {
                    currentLineData = currentLineData.slice(0, -1);
                    terminal.write('\b \b');
                }
            } else if (key === '\u001b[A') {
                //up键的时候
                let len = 0;
                if (historyLineData.length > 0) {
                    len = historyLineData.length + 1;
                }

                if (last < len && last > 0) {
                    //当前行有数据的时候进行删除掉在进行渲染上存储的历史数据
                    for (let i = 0; i < currentLineData.length; i++) {
                        if (terminal.buffer.active.cursorX > terminalTitleTemplate.length + 1) {
                            terminal.write('\b \b');
                        }
                    }
                    let text = historyLineData[last - 1];
                    terminal.write(text);
                    //重点，一定要记住存储当前行命令保证下次up或down时不会光标错乱覆盖终端提示符
                    currentLineData = text;

                    last--;
                }
            } else if (key === '\u001b[B') {
                //down键
                let lent = 0;
                if (historyLineData.length > 0) {
                    lent = historyLineData.length - 1;
                }
                if (last < lent && last > -1) {
                    for (let i = 0; i < currentLineData.length; i++) {
                        if (terminal.buffer.active.cursorX > terminalTitleTemplate.length + 1) {
                            terminal.write('\b \b');
                        }
                    }
                    let text = historyLineData[last + 1];
                    terminal.write(text);
                    currentLineData = text;
                    last++;
                }
            } else {
                //啥也不做的时候就直接输入
                currentLineData += key;
                terminal.write(key);
            }
            terminal.refresh(0, 10);
        });
    };

    useEffect(() => {
        terminal.loadAddon(fitAddon);
        keyAction();
        terminal.open(el.current);
        terminal.loadAddon(unicode11Addon);
        terminal.loadAddon(searchAddon);
        terminal.loadAddon(ligaturesAddon);
        terminal.loadAddon(imageAddon);
        terminal.loadAddon(serializeAddon);
        terminal.loadAddon(new WebLinksAddon());
        terminal.focus();
        fitAddon.fit();
        return () => {
            terminal.dispose();
        };
    }, []);
    return <div className={cx(props.className, css`
        .xterm-rows {
            span {
                display: block;
                width: 100%;
            }
        }
    `)} ref={el}></div>;
}
