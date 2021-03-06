export class AuthService {
    // l'utilisateur commence déconnecté de l'app
    isAuth = false;

    signIn() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        this.isAuth = true;
                        resolve(true);
                    }, 2000
                );
            }
        );
    }

    signOut() {
        this.isAuth = false;
    }
}