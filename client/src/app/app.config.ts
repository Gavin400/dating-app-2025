import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InitService } from '../core/services/init-service';
import { lastValueFrom } from 'rxjs';
import { errorInterceptor } from '../core/services/error-interceptor';
import { jwtInterceptor } from '../core/services/jwt-interceptor';
import { loadingInterceptor } from '../core/services/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor,jwtInterceptor,loadingInterceptor])),
    provideAppInitializer(async ()=> {
      const initService = inject(InitService);

      return new Promise<void>((resolve)=>{
        setTimeout(async ()=>{
          try{
            return lastValueFrom(initService.init());
          } finally{
            const splash= document.getElementById('initial-splash');
             if(splash){
          splash.remove();
        }
        resolve()
      }
        },500)
      })

      
    })
  ]
};
