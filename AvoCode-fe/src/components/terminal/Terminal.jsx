import styles from '@/assets/css/terminal/terminal.module.css';
import '@xterm/xterm/css/xterm.css';

import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { CanvasAddon } from '@xterm/addon-canvas';

function WebTerminal({ terminalValue }) {
    const terminalRef = useRef(null);
    const terminalContainerRef = useRef(null);

    useEffect(() => {
        if (terminalContainerRef.current && terminalRef.current === null) {
            const terminal = new Terminal({
                cursorBlink: true,
                rows: 7,
                fontSize: 14.5,
                fontWeight: 500,
                fontFamily: 'Consolas',
                lineHeight: 1.2,
            });
            terminal.options.theme.background = '#262924';
            terminal.options.letterSpacing = 2;
            terminal.open(terminalContainerRef.current);
            terminal.loadAddon(new CanvasAddon());
            terminalRef.current = terminal;
        }

        if (terminalRef.current) {
            // Write the new value without clearing the terminal
            terminalRef.current.write('\x1b[H\x1b[2J');
            terminalRef.current.writeln(terminalValue.replace(/\n/g, '\r\n'));
        }
    }, [terminalValue]);

    return <div ref={terminalContainerRef} className={styles['terminal-wrap']} />;
}

export default WebTerminal;
