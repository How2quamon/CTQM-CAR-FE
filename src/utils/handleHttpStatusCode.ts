export default function handleHttpStatusCode(code: number, message: string = ''){
    if(code >= 400)
        throw new Error(message);
    return;
}
