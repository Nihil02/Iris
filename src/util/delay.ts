export function sleep(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}