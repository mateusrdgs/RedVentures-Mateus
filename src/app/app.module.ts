import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LogomarkComponent } from './components/logomark/logomark.component';
import { HeroComponent } from './containers/hero/hero.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CalendarContainerComponent } from './containers/calendar-container/calendar-container.component';
import { CheckComponent } from './components/check/check.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ContentComponent } from './containers/content/content.component';
import { NgFooterComponent } from './containers/ng-footer/ng-footer.component';
import { FooterSocialComponent } from './components/footer-social/footer-social.component';
import { FooterCopyrightComponent } from './components/footer-copyright/footer-copyright.component';


@NgModule({
  declarations: [
    AppComponent,
    LogomarkComponent,
    HeroComponent,
    NavigationComponent,
    CalendarContainerComponent,
    CheckComponent,
    CalendarComponent,
    ContentComponent,
    NgFooterComponent,
    FooterSocialComponent,
    FooterCopyrightComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
