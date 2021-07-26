export const appendScript = (scriptToAppend, isAsync = true) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.type = 'text/javascript'
    isAsync ? script.async = true : script.defer = true;
    document.body.appendChild(script);
}