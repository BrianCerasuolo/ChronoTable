import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AuthService } from './providers/auth.service';
import { AvailabilityComponent } from './availability/availability.component';

//import { CalendarModule } from './shared/calendar/calendar.module';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { DateRangeHelper } from './shared/calendar/date-range-helper.service';
import { DateClickedDirective } from './shared/calendar/date-click.directive';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker.module';



const appRoutes: Routes = [
  { path: 'availability', component: AvailabilityComponent },
  { path: '',   redirectTo: '/availability', pathMatch: 'full' }
  // { path: 'heroes', component: HeroListComponent },
];
@NgModule({
  declarations: [
    AppComponent, 
    AvailabilityComponent,
    CalendarComponent,
    DateClickedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbTimepickerModule.forRoot(),
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
   // CalendarModule
  ],
  providers: [AuthService, DateRangeHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
