
export function login(data) {
    alert(JSON.stringify(data, null, 2));
};

export function register(data) {
    alert(JSON.stringify(data, null, 2));
};

export function checkSession(callback) {
    //const url = `${config.apiUrl}/checkSession`;
    //postRequest(url, {}, callback);
};

const checkAuth = (data) => {
    if (data.status >= 0) {
        this.setState({ isAuthed: true, hasAuthed: true });
    } else {
        this.setState({ isAuthed: false, hasAuthed: false });
    }
}