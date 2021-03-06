import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'app/server/service.service';

import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


profileForm : FormGroup;
  submitted: boolean=false;
  loading: boolean= false;
  loginUser:any=[];

  constructor(private formBuilder: FormBuilder,
    private authenticationService: ServiceService,
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('loginUserDetail'));

    this.getUserDetail();
    this.profileFormGroup();
  }

  getUserDetail(){
    let userId = {id : this.loginUser['_id']};
    if(userId){
      this.authenticationService.getUserDetail(userId)
      .pipe(first())
      .subscribe(
          data => {
              let userData = data['user'];
              if(userData['firstName']){this.profileForm.controls['firstName'].setValue(userData['firstName']);}
              if(userData['lastName']){this.profileForm.controls['lastName'].setValue(userData['lastName']);}
              if(userData['email']){this.profileForm.controls['email'].setValue(userData['email']);}
              if(userData['address']){this.profileForm.controls['address'].setValue(userData['address']);}
              if(userData['country']){this.profileForm.controls['country'].setValue(userData['country']);}
              if(userData['city']){this.profileForm.controls['city'].setValue(userData['city']);}
              if(userData['about']){this.profileForm.controls['about'].setValue(userData['about']);}
              if(userData['postCode']){this.profileForm.controls['postCode'].setValue(userData['postCode']);}
              this.loading = false;
          },
          error => {
              this.loading = false;
          });

    }
  }

  profileFormGroup(){
      this.profileForm = this.formBuilder.group({
        firstName : ['',[Validators.required]],
        lastName:['',[Validators.required]],
        email:['',[Validators.required]],
        address:['',[Validators.required]],
        about:['',[Validators.required]],
        country:['',[Validators.required]],
        city: ['',[Validators.required]],
        postCode:['',[Validators.required]]
      })
  }

  get p() { return this.profileForm.controls; }


  submitProfileForm() {
    this.submitted = true;

//     // reset alerts on submit
//     this.alertService.clear();

//     // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }

    let userProfileData ={};

    let userId = {id : this.loginUser['_id']};
    if(userId){
        userProfileData = {
          _id : userId['id'],
          firstName : this.profileForm.get('firstName').value,
          lastName:this.profileForm.get('lastName').value,
          email:this.profileForm.get('email').value,
          address:this.profileForm.get('address').value,
          about:this.profileForm.get('about').value,
          country:this.profileForm.get('country').value,
          city: this.profileForm.get('city').value,
          postCode:this.profileForm.get('postCode').value
        }
    }

    this.loading = true;
    this.authenticationService.userUpdateProfile(userProfileData)
    .pipe(first())
    .subscribe(
        data => {
          console.log("register data ", data, " ", data['status'], " ", data['message'])
          if(data['status'] == true){
            this.toastr.success(data['message'], 'Profile');
              this.submitted= false;
              this.loading = false;
              this.getUserDetail();
            }
        },
        error => {
            this.toastr.error(error);
            this.submitted= false;
            this.loading = false;
        });
 }

}
