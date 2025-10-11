import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Users } from './users/users';
import { Settings } from './settings/settings';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Reports } from './reports/reports';
import { Highlight } from './highlight/highlight';

@NgModule({
  declarations: [
    App,
    Home,
    Users,
    Settings,
    Header,
    Footer,
    Reports,
    Highlight
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
