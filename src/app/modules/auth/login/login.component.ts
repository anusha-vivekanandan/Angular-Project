import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angular-6-social-login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

// import { Router, ActivatedRoute } from '@angular/router';
//import { SharedDataService } from "../../../services/shareddata.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  message:string;
  username : string;
  public loginform: FormGroup;
  
  /** EMAIL PATTERN ***/
  public emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  /** EMAIL VALIDATOR **/
  email: string = "";

  /** PASSWORD VALIDATOR ***/
  password: string = "";
 

  constructor(private socialAuthService: AuthService, private authservice: AuthService,
    public formBuilder: FormBuilder) { }

  

  ngOnInit() {

/*** Form Validators ***/
    this.loginform = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.pattern(this.emailpattern) ]],
      password: ['',[ Validators.required, Validators.minLength(5) ]]
    });

      }


/*** LOGIN FORM SUBMIT ***/
  onSubmit() {
    console.log(this.loginform.value);
    
    localStorage.setItem('username', this.loginform.value.email);
  }

  /**
   * Social login 
   * @param socialPlatform 
   */

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.loginform = this.formBuilder.group({
          email: [userData.email]
        });            
        if(!userData.email.endsWith('@carefirstpt.com')){
          document.getElementById('InvalidEmail').innerHTML="Invalid email. Use your @carefirstpt.com email id.";
          document.getElementById('email').classList.remove('hide');
          document.getElementById('email').classList.add('show');
        }
        if(userData.email.endsWith('@carefirstpt.edu')){
          document.getElementById('InvalidEmail').className="hide";
          this.username=userData.email.substring(0, userData.email.lastIndexOf("@"));
          window.location.href="/dashboard/"+this.username;
        }
      }

    );
  }
}
