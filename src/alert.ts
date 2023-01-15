export async function Info(message: string) {
    let title = await Neutralino.window.getTitle();    
    await Neutralino.os.showMessageBox(`Alerta de ${title}`, message, "OK");
}

export async function Error(message: string) {
    await Neutralino.os.showMessageBox("Ha ocurrido un error", message, "OK", "ERROR");
}

export async function Confirm(message: string): Promise<string> {
    let button = await Neutralino.os.showMessageBox("Confirmar accion", message, "YES_NO", "WARNING");
    return button;
}