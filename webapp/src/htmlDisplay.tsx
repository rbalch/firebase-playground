import { createElement } from "./tools/jsxFactory";
import { Firebase } from "./tools/firebase";


export class HtmlDisplay {
    private containerElem: HTMLElement;
    private firebase: Firebase = new Firebase();

    constructor() {
        this.containerElem = document.createElement("div");
    }

    async getContent(): Promise<HTMLElement> {
        await this.updateContent();
        return this.containerElem;
    }

    async updateContent() {
        this.containerElem.innerHTML = "";
        this.containerElem.appendChild(this.getFirebaseLoginWidget());
    }

    getFirebaseLoginWidget(showButton: boolean = true): HTMLElement {
        return <div id="firebaseui-auth-container">
            <button onclick={this.showFirebaseLoginWidget}>Load</button>
        </div>
        // return <div id="firebaseui-auth-container"></div>
    }

    showFirebaseLoginWidget = (): void => {
        this.firebase.showSignIn();
    }

}
