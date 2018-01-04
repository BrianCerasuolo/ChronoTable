import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { DateRangeHelper } from '../shared/calendar/date-range-helper.service';
import {CalendarComponent} from '../shared/calendar/calendar.component'
import * as moment from 'moment';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  constructor() { }

  highlightDays: any[];
  selectedDays: Array<any>; // this is the [(ngModel)] property
  datesArray: Array<any>;

  oneDaySelectionOnly(event, day){
    console.log(day);
  }

  ngOnInit(): void {
      // this.heroService.getHeroes()
      //     .then(heroes => this.heroes = heroes.slice(1, 5));
          // console.log('this is here = ' + matIcons);

      // set array to either [] or the following values like example below
       this.highlightDays = [
         {date: moment().date(22).date(), css: 'stay-dates', selectable: false, title: 'Holiday time !'},
         {date: moment().date(25).date(), css: 'stay-dates', selectable: false, title: 'We don\'t work today'},
         {date: moment().date(30).date(), css: 'stay-dates', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
       ];

      // examples to work with
      console.log('date: moment().date(19) ', moment().date(19).date());
      console.log('date: moment().date(20) ', moment().date(20).date());
      console.log('date: moment().date(21) ', moment().date(21).date());

      // ***Setting project scope.
      this.selectedDays = [];

      // enter variables for startDates and End dates
      let startDate = moment().add(1, 'weeks').startOf('isoWeek').valueOf(); // enter variable or ms value
      let endDate = moment().add(1, 'weeks').endOf('isoWeek').valueOf(); // enter variable or ms value // 1502510400000

      // console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))

      if (DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
          let days = DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
          this.datesArray = DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
          console.log('this.datesArray ', this.datesArray);
      }

      // takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
      // if (this.datesArray !== undefined && this.datesArray.length > 0) {
      //     let daysArray = this.datesArray;
      //     let arrayObject = daysArray.find(x => x);
      //     let arrayKeys = Object.keys(daysArray);
      //     if (arrayObject !== undefined && arrayKeys.length > 0) {
      //         this.highlightDays = this.datesArray;
      //         let stayNames = 'Christian Smith' // should be set to variable 
      //         for (let i in daysArray) {
      //             if (true) {
      //                 this.highlightDays.push({date: daysArray[i], css: 'stay-dates', selectable: true, title: `days off for ${stayNames}`});  // set strings
      //             }
      //         }
      //     }
      // }
  }
}
