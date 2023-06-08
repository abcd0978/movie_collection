export function strToHtml(str) {
    const parser = new DOMParser();
    const result = parser.parseFromString(str, "text/html");
    return result;
}