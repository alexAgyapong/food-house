import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      restaurant: [''],
      location: ['']
    });
  }

  search(){
    console.log('search');
  }
}
