
import { EventEmitter, Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from '../environment';
import { Users } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public authNotifier: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    })
  }

  notifyAuthStatus(status: boolean) {
    this.authNotifier.next(status);
  }

  signUp(user: Users): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password
    })
  }

  confirmSignup(user: Users): Promise<any> {
    return Auth.confirmSignUp(JSON.parse(user.email), user.code);
  }

  signIn(user: Users): Promise<any> {
    console.log(user);
    return Auth.signIn(user.email, user.password);
  }

  getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  updateUser(user: Users): Promise<any> {
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    })
  }

  signOut(): Promise<any> {
    return Auth.signOut();
  }

  getRole(): Promise<any> {
    return this.getUser().then((user) => {
      return user && user.attributes ? user.attributes['custom:role'] : '';
    })
  }
}
