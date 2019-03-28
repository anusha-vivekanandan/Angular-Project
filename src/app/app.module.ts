import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";
import { ModuleModule } from './modules/modules.module';
import { CoreModule } from './core/core.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpConfigInterceptor } from './core/http-config-interceptor';

// Configs 
export function provideConfig() {

  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
      },
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    }),

    SocialLoginModule,
    NgbModule.forRoot(),
    ModuleModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,   useFactory: provideConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
