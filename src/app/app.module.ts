import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

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
import { CalendarDateDirective } from './directives/calendar-date.directive';

import { CalendarEmitter } from './emitters/calendar.emitter';
import { ResultsContainerComponent } from './containers/results-container/results-container.component';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { StarsFilterComponent } from './components/stars-filter/stars-filter.component';
import { StarComponent } from './components/star/star.component';

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
    FooterCopyrightComponent,
    CalendarDateDirective,
    ResultsContainerComponent,
    PriceRangeComponent,
    StarsFilterComponent,
    StarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CalendarEmitter,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
