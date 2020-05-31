import * as config from './../config/configApi';
import axios from 'axios';

export default function callApi(endPoint, method="GET", data) {
    return axios({
        method: method,
        url: `${config.host}/${endPoint}`,
        data: data
    }).catch((err) =>{
        console.log('err', err)
    });
}