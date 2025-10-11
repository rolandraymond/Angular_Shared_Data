import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users } from './users/users';
import { Settings } from './settings/settings';
import { Home } from './home/home';
import { Reports } from './reports/reports';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: Home },
  { path: "users", component: Users },
  { path: "reports", component: Reports },
  { path: "settings", component: Settings },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
