import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent-component/parent-component';
const routes: Routes = [
  { path: '', redirectTo: 'parent', pathMatch: 'full' },
  { path: 'parent', component: ParentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
