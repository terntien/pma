import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitelevelPage } from './sitelevel.page';

const routes: Routes = [
  {
    path: '',
    component: SitelevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitelevelPageRoutingModule {}
