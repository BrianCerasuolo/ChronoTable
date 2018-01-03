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
  initialCount: Array<any>; // this is the [(ngModel)] property
  datesArray: Array<any>;
  myMonth: any;

  testItems: any[] = [
      {'item': 'array1', 'id': 1},
      {'item': 'array2', 'id': 2},
      {'item': 'array3', 'id': 3},
  ]  // potential use if person wanted to create a choosen item to associate with a list of arrays

  oneDaySelectionOnly(event, day){
    console.log(day);
  }

  // * you don't have to use @ViewChild as itthis is used if you want to use some functions within the
  // multiple-date-picker that will help in testing and construction of your design.
  // For example: findArrayofDays() { console.log('this.projectScope = ' + this.projectScope); }
  // clearDays() { this.projectScope = []; this.generate(); // console.log('clearDays was fired off');}
  // and runGenerate() { this.generate(); } // remove this and from html
  @ViewChild(CalendarComponent) private multipleDatePicker: CalendarComponent;

  ngOnInit(): void {
      // this.heroService.getHeroes()
      //     .then(heroes => this.heroes = heroes.slice(1, 5));
          // console.log('this is here = ' + matIcons);

      // set array to either [] or the following values like example below
       this.highlightDays = [
          {date: moment().date(22).valueOf(), css: 'holiday', selectable: false, title: 'Holiday time !'},
          {date: moment().date(25).valueOf(), css: 'off', selectable: false, title: 'We don\'t work today'},
          {date: moment().date(30).valueOf(), css: 'birthday', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...'}
       ];

      // examples to work with
      console.log('date: moment().date(19).valueOf() ', moment().date(19).valueOf());
      console.log('date: moment().date(20).valueOf() ', moment().date(20).valueOf());
      console.log('date: moment().date(21).valueOf() ', moment().date(21).valueOf());

      // ***Setting project scope.
      this.initialCount = [];

      // enter variables for startDates and End dates
      let startDate = 1509768000000; // enter variable or ms value
      let endDate = 1510722000000; // enter variable or ms value // 1502510400000

      // console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))

      if (DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
          let days = DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
          this.datesArray = DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
          console.log('this.datesArray ', this.datesArray);
      }

      // takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
      if (this.datesArray !== undefined && this.datesArray.length > 0) {
          let daysArray = this.datesArray;
          let arrayObject = daysArray.find(x => x);
          let arrayKeys = Object.keys(daysArray);
          if (arrayObject !== undefined && arrayKeys.length > 0) {
              this.highlightDays = this.datesArray;
              let stayNames = 'Christian Smith' // should be set to variable 
              for (let i in daysArray) {
                  if (true) {
                      this.highlightDays.push({date: daysArray[i], css: 'stay-dates', selectable: true, title: `days off for ${stayNames}`});  // set strings
                  }
              }
          }
      }

      // calculate addional months to add onto the month object... if this is corrupt in anyway it will default to todays month info
      let monthsFromToday = DateRangeHelper.dateRangeMonthsCalculator(startDate);
      if (monthsFromToday > 0) {
          // this.myMonth = moment().add(monthsFromToday, 'months');
      } else {
          this.myMonth = moment().startOf('day');
      }

  }

}
