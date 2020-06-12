import { Component, OnInit, Input } from '@angular/core';
import { formatDistance, subDays, isWeekend, isSaturday, setHours, setSeconds } from 'date-fns';

@Component({
  selector: 'app-timings',
  templateUrl: './timings.component.html',
  styleUrls: ['./timings.component.scss']
})
export class TimingsComponent implements OnInit {
  @Input() timings: any;
  allTimings: string[] = [];
  todaysTimings: string;
  todaysDate = new Date();
  isOpen = false;
  currentTime = this.todaysDate.getTime();
  constructor() { }

  ngOnInit(): void {
    this.allTimings = this.timings.split(',');

    if (isWeekend(this.todaysDate)) {
      if (isSaturday(this.todaysDate)) {
        this.todaysTimings = this.allTimings[1].replace('to', '-');
      } else {
        this.todaysTimings = this.allTimings[2].replace('to', '-');
      }
      console.log('weekend', this.todaysDate);
    } else {
      this.todaysTimings = this.allTimings[0].replace('to', '-');
      // let timeParts = this.todaysTimings.split(' ');
      // let startTime = timeParts[0];
      // let startPeriod = timeParts[1];
      // let finisTime = timeParts[3];
      // let finishPeriod = timeParts[4];
      // let startDate = setHours(this.todaysDate, +startTime);
      // console.log('%c todays Timings', 'color:green', startTime, 'finish', finisTime);
      // console.log('%c start date', 'color:blue', startDate);
    }
  }

}
