// import axios from "axios";
import axiosInstance from "./axiosinstance";
// import jwt_decode from "jwt-decode";

const API_URL = process.env.REACT_APP_API_ENDPOINT;


let loggedIn = false;

class APIService {
        
    // Generic MetrcKey Based Functions
    
    fetchAllInstances(entity) {
        // entity = 'entity/';
        const url = entity;
        
        // temporary
        // if (!loggedIn) {
        //     this.login()
        // }

        // return axiosInstance().get(url, _getAuthObject());        
        return axiosInstance().get(url);
    }

    fetchInstance(entityWithID) {
        // entityWithID = 'entity/entityID/';
        const url =  entityWithID;
        // /localhost;3000/api/leave/2

        // temporary
        // if (!loggedIn) {
        //     this.login()
        // }

        // return axiosInstance().get(url, _getAuthObject());
        return axiosInstance().get(url);
    }

    createInstance(entity, payload) {
        // entity = 'entity/';
        const url = entity;

        // temporary
        // if (!loggedIn) {
        //     this.login()
        // }

        // return axiosInstance().post(url, payload, _getAuthObject());
        return axiosInstance().post(url, payload);
    }

    modifyInstance(entityWithID, payload) {
        // entityWithID = 'entity/entityID/';
        const url = entityWithID;
        
        // temporary
        // if (!loggedIn) {
        //     this.login()
        // }

        // return axiosInstance().put(url, payload, _getAuthObject());
        return axiosInstance().put(url, payload);
    }

    patchInstance(entity, payload) {
        const url = `${entity}`
        return axiosInstance().patch(url, payload)
    }
    
    
    deleteInstance(entityWithID) {
        // entityWithID = 'entity/entityID/';
        const url = entityWithID;

        // temporary
        // if (!loggedIn) {
        //     this.login()
        // }

        // const encodedAuth = _getEncodedAuthKey();
        const token = localStorage.getItem('access_token');

        return axiosInstance().delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Basic ${encodedAuth}`
                    "Authorization": `Bearer ${token}`
                },
        });
    }

}
export default new APIService();