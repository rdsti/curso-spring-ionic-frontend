import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    jwHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    autenticate(creds : CredenciaisDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });

    }

    sucessfulLogin(authorizationValue : string) {

        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);

    }

    logout() {
  
        this.storage.setLocalUser(null);

    }

    refreshToken(creds : CredenciaisDTO) {

        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });

    }

}
