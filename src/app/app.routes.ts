import { Routes } from '@angular/router';
import { Landing } from './features/pages/landing/landing';
import { Privacidad } from './features/pages/privacidad/privacidad';
import { EliminarCuentaComponent } from './features/pages/eliminar-cuenta/eliminar-cuenta';
import { ContactoComponent } from './features/pages/contacto/contacto';
import { EcosistemasComponent } from './features/pages/ecosistemas/ecosistemas';
import { IfratComponent } from './features/pages/ecosistemas/ifrat/ifrat';
import { IfratEmiteComponent } from './features/pages/ecosistemas/ifrat-emite/ifrat-emite';
import { IfratFoliosComponent } from './features/pages/ecosistemas/ifrat-folios/ifrat-folios';
import { IfratPagosComponent } from './features/pages/ecosistemas/ifrat-pagos/ifrat-pagos';
import { DescargasComponent } from './features/pages/descargas/descargas';
import { SubetComponent } from './features/pages/ecosistemas/subet/subet';
import { PidefacilComponent } from './features/pages/ecosistemas/pidefacil/pidefacil';
import { SuperFacilComponent } from './features/pages/ecosistemas/super-facil/super-facil';
import { RunRunRunComponent } from './features/pages/ecosistemas/run-run-run/run-run-run';
import { TribufiComponent } from './features/pages/ecosistemas/tribufi/tribufi';
import { CardsStudioComponent } from './features/pages/ecosistemas/cardsstudio/cardsstudio';
import { CobraFacilComponent } from './features/pages/ecosistemas/cobrafacil/cobrafacil';
import { ScripturaComponent } from './features/pages/ecosistemas/scriptura/scriptura';
import { WorkspacePaquetesComponent } from './features/pages/ecosistemas/workspace/paquetes/paquetes';
import { WorkspaceCheckoutComponent } from './features/pages/ecosistemas/workspace/checkout/checkout';
import { WorkspaceConfirmacionComponent } from './features/pages/ecosistemas/workspace/confirmacion/confirmacion';
import { MenusComponent } from './features/pages/menus/menus';
import { environment } from '../environments/environment';

// Rutas de productos FÁCIL en validación (scaffolding): solo se registran, y por
// lo tanto solo son accesibles, cuando environment.mostrarProductosPendientes es
// true. En producción la flag está en false (ver src/environments/environment.prod.ts).
const RutasProductosPendientes: Routes = [
  { path: 'tribufi', component: TribufiComponent },
  { path: 'tribufi/:section', component: TribufiComponent },
  { path: 'cardsstudio', component: CardsStudioComponent },
  { path: 'cardsstudio/:section', component: CardsStudioComponent },
  { path: 'cobrafacil', component: CobraFacilComponent },
  { path: 'cobrafacil/:section', component: CobraFacilComponent },
  { path: 'scriptura', component: ScripturaComponent },
  { path: 'scriptura/:section', component: ScripturaComponent },
];

export const routes: Routes = [
  ...(environment.mostrarProductosPendientes ? RutasProductosPendientes : []),
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
  {
    path: 'workspace',
    component: WorkspacePaquetesComponent,
  },
  {
    path: 'workspace/checkout',
    component: WorkspaceCheckoutComponent,
  },
  {
    path: 'workspace/confirmacion',
    component: WorkspaceConfirmacionComponent,
  },
];
