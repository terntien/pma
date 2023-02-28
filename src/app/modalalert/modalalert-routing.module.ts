import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalalertPage } from './modalalert.page';

const routes: Routes = [
  {
    path: '',
    component: ModalalertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalalertPageRoutingModule {}
