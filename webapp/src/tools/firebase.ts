import { firebaseConfig } from '../../../firebase-client.js';
import { FirebaseApp, initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, Auth, GoogleAuthProvider, EmailAuthProvider, User, signOut } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';


export class Firebase {
    private app: FirebaseApp;
    private auth: Auth;
    private docId: string = 'firebaseui-auth-container';
    private user: User;

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);

        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.user = user;
                console.log("onAuthStateChanged: User is signed in");
            } else {
                console.log("onAuthStateChanged: User is signed out");
            }
        });
    }

    async showSignIn() {
        console.log("showSignIn");
        const ui = new firebaseui.auth.AuthUI(this.auth);
        const config = {
            callbacks: {
              signInSuccessWithAuthResult:
                this._signInSuccessWithAuthResult.bind(this),
            },
            signInSuccessUrl: '/',
            signInFlow: 'popup',
            signInOptions: [
              {
                provider: GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                  'https://www.googleapis.com/auth/userinfo.email',
                  'https://www.googleapis.com/auth/userinfo.profile',
                ],
              },
              {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
              },
            ],
          }
    
          ui.start("#"+this.docId, config);
    }

    logout() {
        signOut(this.auth).then().catch(err => console.error(err));
      }

    _signInSuccessWithAuthResult(authResult: any): boolean {
        this.user = authResult.user;
        authResult.user.getIdToken().then((idToken: string) => {
            const elem = document.getElementById(this.docId);
            elem.innerHTML = "idToken: " + idToken;
        });
        return false;
    }

}