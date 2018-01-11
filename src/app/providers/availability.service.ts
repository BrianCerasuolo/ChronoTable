import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import * as moment from 'moment';
import { Moment } from 'moment';

export class AvailabilityInput{
    private _startTime: Moment;
    private _endTime: Moment;
    constructor(date: Moment, startTime, endTime){
        this._startTime.date(date.date()).hour(startTime.hour).minute(startTime.minute);
        this._endTime.date(date.date()).hour(endTime.hour).minute(endTime.minute);
    }

    get startTime(){
        return this._startTime.toDate();
    }
    get endTime(){
        return this._endTime.toDate();
    }
}


@Injectable()
export class AvailabilityService {

  constructor(public af: AngularFireAuth, public afs: AngularFirestore) {

   }

   updateAvailability(dates: Date[], startTime, endTime){
    let updatedAvailability: AvailabilityInput[] = this.mapAvailabilityInputs(dates, startTime, endTime);

    //todo figure out how to create a new doc in firestore
    //this.afs.doc().set
   } 

   private mapAvailabilityInputs(dates, startTime, endTime) : AvailabilityInput[] {
       let updatedAvailability: AvailabilityInput[];
        for (let i = 0; i < dates.length; i++){
            let dateMoment = moment(dates[i]);
            let newAvailability = new AvailabilityInput(dateMoment, startTime, endTime);
            updatedAvailability.push(newAvailability);
        }
        return updatedAvailability;
   }
}