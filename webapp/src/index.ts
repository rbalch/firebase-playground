import { HtmlDisplay } from "./htmlDisplay";

async function displayPage(): Promise<HTMLElement> {
    let display = new HtmlDisplay();
    return display.getContent();
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        displayPage().then((element) => {
            let rootElement = document.getElementById("app");
            rootElement.innerHTML = "";
            rootElement.appendChild(element);
        });
    }
}