class FacebookService {
    constructor(config) {
        FB.init({   
            appId: this.appId,
            status: true,
            cookie: false,
            xfbml: true,
            version: 'v3.2'
        });

        firebase.initializeApp(config);

        this.provider = new firebase.auth.FacebookAuthProvider();
        this.provider.addScope("public_profile");
        this.provider.addScope("email");
    }

    async api(route, params) {
        return new Promise((resolve, reject) => {
            FB.api(route, params, response => resolve(response))
        })
    }

    async logout() {
        return firebase.auth().signOut();
    }

    async login() {
        return firebase.auth().signInWithPopup(this.provider);
    }
}