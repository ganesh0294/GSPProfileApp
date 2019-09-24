import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { AlertService, AuthenticationService } from '@/_services';
import { ServiceService } from '../server/service.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: ServiceService,
      private toastr: ToastrService
  ) {
}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
    //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log("loginForm " , this.loginForm.controls.value)
        this.submitted = true;

        // // reset alerts on submit
        // this.alertService.clear();

        // // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        let loginDetail = {
            email : this.f.email.value,
            password : this.f.password.value
        }

        this.loading = true;
        this.authenticationService.userLogin(loginDetail).subscribe(data => {
            // this.router.navigate([this.returnUrl]);
            console.log("data : ", data);

            if(data['status'] == true){
              let userData = data['user'];
              localStorage.setItem('loginUserDetail', JSON.stringify(userData));
              this.toastr.success(data['message'], 'Log-in');
              this.router.navigate(['/dashboard']); 
              this.router.isActive;
            }

            if(data['status'] == false){
              this.toastr.success(data['message'], 'Log-in');
            }
            
        },
        error => {
          console.log("error : ", error);

          if(error.status == 404){
            this.toastr.error(error['error'].message, 'Log-in')
            this.loading = false;
          }
           
        });
    }

}
