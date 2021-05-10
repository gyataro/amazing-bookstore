import { authenticationService } from '../services/authService';

export function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                alert("You don't have permission!");
                // automatically logout user if API returns 401 Unauthorized or 403 Forbidden
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}