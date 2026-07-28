import { Routes } from '@angular/router';
import { Landing } from './features/pages/landing/landing';
import { Privacidad } from './features/pages/privacidad/privacidad';
import { EliminarCuentaComponent } from './features/pages/eliminar-cuenta/eliminar-cuenta';
import { ContactoComponent } from './features/pages/contacto/contacto';
import { EcosistemasComponent } from './features/pages/ecosistemas/ecosistemas';
import { IfratComponent } from './features/pages/ifrat/ifrat';
import { IfratEmiteComponent } from './features/pages/ifrat-emite/ifrat-emite';
import { IfratFoliosComponent } from './features/pages/ifrat-folios/ifrat-folios';
import { IfratPagosComponent } from './features/pages/ifrat-pagos/ifrat-pagos';
import { DescargasComponent } from './features/pages/descargas/descargas';
import { SubetComponent } from './features/pages/subet/subet';
import { PidefacilComponent } from './features/pages/pidefacil/pidefacil';
import { SuperFacilComponent } from './features/pages/super-facil/super-facil';
import { RunRunRunComponent } from './features/pages/run-run-run/run-run-run';
import { MenusComponent } from './features/pages/menus/menus';

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
    path: 'ecosistemas/:familia',
    component: EcosistemasComponent,
  },
  {
    path: 'ifrat',
    component: IfratComponent,
  },
  {
    path: 'ifrat/:section',
    component: IfratComponent,
  },
  {
    path: 'ifrat-emite',
    component: IfratEmiteComponent,
  },
  {
    path: 'ifrat-folios',
    component: IfratFoliosComponent,
  },
  {
    path: 'ifrat-pagos',
    component: IfratPagosComponent,
  },
  {
    path: 'descargas',
    component: DescargasComponent,
  },
  {
    path: 'subet',
    component: SubetComponent,
  },
  {
    path: 'subet/:section',
    component: SubetComponent,
  },
  {
    path: 'pidefacil',
    component: PidefacilComponent,
  },
  {
    path: 'pidefacil/:section',
    component: PidefacilComponent,
  },
  {
    path: 'super-facil',
    component: SuperFacilComponent,
  },
  {
    path: 'super-facil/:section',
    component: SuperFacilComponent,
  },
  {
    path: 'menus',
    component: MenusComponent,
  },
  {
    path: 'menus/:idSucursal',
    component: MenusComponent,
  },
  {
    path: 'run-run-run',
    component: RunRunRunComponent,
  },
  {
    path: 'run-run-run/:section',
    component: RunRunRunComponent,
  },
];
