import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ServiceService } from 'app/server/service.service';
import { ToastrService } from 'ngx-toastr';

// import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: ServiceService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

    //     // reset alerts on submit
    //     this.alertService.clear();

    //     // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.userRegistration(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log("register data ", data)
                this.toastr.success('Registration successfully!', 'Registration', {
                    timeOut: 3000
                  });
                    this.submitted= false;
                    this.loading = false;
                    this.registerForm.reset();
                    this.router.navigate(['/login']);this.router.isActive;
            },
            error => {
                this.toastr.error(error);
                this.submitted= false;
                this.loading = false;
            });
     }

}
