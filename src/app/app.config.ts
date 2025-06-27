import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-task-18-d9afa',
        appId: '1:422505285233:web:52ca5f652802679bf0bdd0',
        storageBucket: 'ng-task-18-d9afa.firebasestorage.app',
        apiKey: 'AIzaSyBfAvqcvHO_aFqNSNEz_yWtSZsKvZDoW5c',
        authDomain: 'ng-task-18-d9afa.firebaseapp.com',
        messagingSenderId: '422505285233',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
