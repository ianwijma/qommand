import {WindowControls} from "./window.types";
import path from "path";
import {BrowserWindow} from "electron";
import {isDev} from "../utils/isDev";

let window: BrowserWindow;
export const settingsWindow: WindowControls & { [key: string]: () => void | Promise<void> } = {
    async initialize() {
        console.log('Initializing settings window');
        window = new BrowserWindow({
            show: false,
            width: 1080,
            height: 700,
            minWidth: 1080,
            minHeight: 700,
            frame: false,
            autoHideMenuBar: true,
            title: 'Qommand Settings',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        window.webContents.on('ipc-message', (_, action) => {
            switch (action) {
                case 'close':
                    this.close();
                    break;
                case 'minimize':
                    this.minimize();
                    break;
            }
        });
    },
    async loadWindow() {
        if (isDev()) {
            await window.loadURL('http://localhost:3000/settings');
        } else {
            // TODO: Update when compiling
            await window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }
    },
    async open() {
        if (window.isVisible()) {
            window.show()
        } else {
            await this.loadWindow();

            console.log('Opening main window');
            window.show();

            if (isDev()) this.openDevTools();
        }
    },
    async close() {
        console.log('Closing Settings window');
        window.hide();

        if (isDev()) this.closeDevTools();
    },
    async minimize() {
        console.log('Minimizing Settings window');
        window.minimize();
    },
    async openDevTools() {
        console.log('Opening dev tools');
        window.webContents.openDevTools({
            mode: 'detach',
            title: 'Settings Dev Tools',
            activate: true
        });
    },
    async closeDevTools() {
        console.log('closing dev tools');
        window.webContents.closeDevTools();
    }
};