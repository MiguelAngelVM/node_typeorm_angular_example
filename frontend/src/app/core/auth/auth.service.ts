import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private apiUrl: any = environment.apiServer; //artisan 

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ){}

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    set token(datos: string)
    {
        localStorage.setItem('token', datos);
    }

    get token(): string
    {
        return localStorage.getItem('token') ?? '';
    }

    set email(datos: string)
    {
        localStorage.setItem('email', datos);
    }

    get email(): string
    {
        return localStorage.getItem('email') ?? '';
    }

    set userName(datos: string)
    {
        localStorage.setItem('userName', datos);

    }

    get userName(): string
    {
        return localStorage.getItem('userName') ?? '';
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(this.apiUrl+'auth/login', credentials).pipe(
            switchMap((response: any) => {
                if(!!response.access_token){
                    // Store the access token in the local storage
                    this.accessToken = response.access_token;

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    this.token = response.access_token;
                    this.email = response.user.email;
                    this.userName = response.user.name;
                }
            
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        if ( this._authenticated || this.accessToken ){
            
            // if ( AuthUtils.isTokenExpired(this.accessToken) ){
            //     return of(false);
            // }

            return of(true);

        }else{
            return of(false);
        }
       
    }
}
