import { Routes } from '@angular/router';
import { Landing } from './features/pages/landing/landing';
import { Privacidad } from './features/pages/privacidad/privacidad';
import { EliminarCuentaComponent } from './features/pages/eliminar-cuenta/eliminar-cuenta';
import { ContactoComponent } from './features/pages/contacto/contacto';
import { EcosistemasComponent } from './features/pages/ecosistemas/ecosistemas';
import { IfratComponent } from './features/pages/ifrat/ifrat';
import { IfratEmiteComponent } from './features/pages/ifrat-emite/ifrat-emite';
import { DescargasComponent } from './features/pages/descargas/descargas';
import { AldamaComponent } from './features/pages/aldama/aldama';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'privacidad',
    component: Privacidad,
  },
  {
    path: 'eliminar-cuenta',
    component: EliminarCuentaComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'ecosistemas',
    component: EcosistemasComponent,
  },
  {
    path: 'ifrat',
    component: IfratComponent,
  },
  {
    path: 'ifrat-emite',
    component: IfratEmiteComponent,
  },
  {
    path: 'descargas',
    component: DescargasComponent,
  },
  {
    path: 'deliveryaldama',
    component: AldamaComponent,
  },
  {
    path: 'deliveryaldama/:section',
    component: AldamaComponent,
  },
];
