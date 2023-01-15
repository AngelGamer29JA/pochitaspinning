export function Info(...message: any[]) {
    console.log("%c[INFO] \r%s", 'color: green;', ...message);
}

export function Error(...message: any[]) {
    console.error("%c[ERROR \r%s", 'color: red;', ...message);
}