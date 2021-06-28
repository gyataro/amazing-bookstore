import { authenticationService } from '../services/authService';
import { history } from "./history";

export function handleResponse(response) {

    return response.text().then(text => {
        const responseData = text && JSON.parse(text);
        if (!response.ok) {
            console.log(responseData);
            if ([401].indexOf(response.status) !== -1) {
                // 401 Unauthorized: invalid / expired credentials
                if(authenticationService.currentUserValue != null) {
                    authenticationService.logout();
                    window.location.reload(true);
                }
            }
            else if ([403].indexOf(response.status) !== -1) {
                // 403 Forbidden: user either has not enough permission / has been banned
                authenticationService.logout();
                history.push('/403');
            }
            else if ([404].indexOf(response.status) !== -1) {
                // 404 Not Found: the page does not exist
                history.push('/404');
            }

            //const error = (responseData && responseData.message) || response.statusText;
            const error = responseData.data;
            return Promise.reject(error);
        }

        console.log(responseData.data);
        return responseData.data;
    });
}