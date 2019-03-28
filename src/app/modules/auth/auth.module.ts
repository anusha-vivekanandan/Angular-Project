import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("28658433869-bfcaernpt5e5b5a7mglf071ip1t3u3o7.apps.googleusercontent.com")
        }
      ]
  )
  return config;
}

@NgModule({
  declarations: [ LoginComponent, 
    ForgetpasswordComponent ],
    
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule ,
    SocialLoginModule
  ],
  exports: [
    LoginComponent,
    ForgetpasswordComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})

export class AuthModule { }
