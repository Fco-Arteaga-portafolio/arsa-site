import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Privacy } from './features/landing/sections/privacy/privacy';
import { AccountDeletionComponent } from './features/landing/sections/account-deletion/account-deletion';
import { ContactPageComponent } from './features/landing/pages/contact/contact-page';
import { EcosistemasPageComponent } from './features/landing/pages/ecosistemas/ecosistemas-page';
import { IfratComponent } from './features/ifrat/ifrat';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'privacidad',
    component: Privacy,
  },
  {
    path: 'eliminar-cuenta',
    component: AccountDeletionComponent,
  },
  {
    path: 'contacto',
    component: ContactPageComponent,
  },
  {
    path: 'ecosistemas',
    component: EcosistemasPageComponent,
  },
  {
    path: 'ifrat',
    component: IfratComponent,
  },
];
