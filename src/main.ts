import * as Alert from './alert';
import * as Logger from './logger';

const VIDEO_SRC = "video/pochita.mp4";
const videoElement = document.getElementById("video_player") as HTMLVideoElement;

let USER_OS = '';

async function onWindowOpen() {
    let config = await Neutralino.app.getConfig();
    USER_OS = await Neutralino.os.getEnv("USERNAME");
    await Neutralino.window.setTitle(`${config.appName} - ${USER_OS}`);
    await Neutralino.window.focus();
}

async function onWindowClose() {
    let action = await Alert.Confirm("Como!!!!!!, quieres salir?, te quieres perder el gran acto de pochita? :c");
    if (action == "YES") {
        Neutralino.app.exit();
    } else if (action == "NO") {
        await Alert.Info("OMGG!!! SIII, ERES LA MEJOR PERSONA TKM <3");
        await Alert.Info(`Ahora te quedaras aquí por toda la eternidad :) ${USER_OS}`);
    }
}

async function onContentLoaded() {
    await LoadPochita();
}

function checkError(value: any): value is Neutralino.Error {
    return value.code == "NE_FS_NOPATHE";
} 

async function LoadPochita() {
    let stats = await Neutralino.filesystem.getStats(VIDEO_SRC);

   if (checkError(stats)) {
    await Alert.Error(`Ha ocurrido un error al intentar cargar el video de pochita en ${VIDEO_SRC}`);
    await Neutralino.app.exit();
   }
    

    Logger.Info("Se ha cargado correctamenta el video de pochita: ", VIDEO_SRC);
    videoElement.src = VIDEO_SRC;
    
    if (await Neutralino.window.isMaximized()) {
        videoElement.play();
        videoElement.muted = false;
    }
    
}

document.addEventListener("DOMContentLoaded", onContentLoaded);
Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("ready", onWindowOpen);
Neutralino.events.on("windowFocus", () => {
    if (videoElement.duration > 0) {
        videoElement.play();
    }
})

window.onmousemove = () => {
    videoElement.play();
}