import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  headers = new HttpHeaders();
  

  login = environment.url+'/users/login';
  registration = environment.url+'/users/registration';
  getUserData = environment.url+'/users/userDetail';
  updateUserProfile = environment.url+'/users/updateUserProfile';

  constructor(private  httpClient:HttpClient) { }

  userLogin(loginDetail){
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(this.login,loginDetail,{headers:this.headers});
  }

  userRegistration(registrationDetail){
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post(this.registration,registrationDetail,{headers:this.headers});
  }

  getUserDetail(userId){
    return this.httpClient.post(this.getUserData,userId,{headers:this.headers});
  }

  userUpdateProfile(userProfileData){
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
    console.log("loginDetail ", userProfileData);
    return this.httpClient.post(this.updateUserProfile,userProfileData,{headers:this.headers});
  }

}
