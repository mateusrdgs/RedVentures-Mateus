import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CalendarContainerComponent } from './containers/calendar-container/calendar-container.component';
import { ContentComponent } from './containers/content/content.component';
import { FooterSocialComponent } from './components/footer-social/footer-social.component';
import { FooterCopyrightComponent } from './components/footer-copyright/footer-copyright.component';
import { NgFooterComponent } from './containers/ng-footer/ng-footer.component';
import { ResultsContainerComponent } from './containers/results-container/results-container.component';

import { ArrowComponent } from './components/arrow/arrow.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CheckComponent } from './components/check/check.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeroComponent } from './containers/hero/hero.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LogomarkComponent } from './components/logomark/logomark.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PriceRangeComponent } from './components/price-range/price-range.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { StarComponent } from './components/star/star.component';
import { StarsFilterComponent } from './components/stars-filter/stars-filter.component';

import { CalendarDateDirective } from './directives/calendar-date.directive';
import { PriceRangeDirective } from './directives/price-range.directive';

import { CalendarEmitter } from './emitters/calendar.emitter';
import { HotelsService } from './services/hotels.service';
import { HotelsPipe } from './pipes/hotels.pipe';

import { HotelFrontComponent } from './components/hotel-front/hotel-front.component';
import { HotelBackComponent } from './components/hotel-back/hotel-back.component';

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
    StarComponent,
    HotelsComponent,
    HotelComponent,
    FilterComponent,
    PriceRangeDirective,
    HotelsPipe,
    HotelFrontComponent,
    HotelBackComponent,
    ProgressBarComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CalendarEmitter,
    DatePipe,
    HotelsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
