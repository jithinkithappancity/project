import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // 👈 spread existing config
  providers: [
    ...appConfig.providers, // 👈 preserve existing providers if any
    provideHttpClient(),     // 👈 add HttpClient
  ],
}).catch((err) => console.error(err));