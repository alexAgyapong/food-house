import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Establishment } from './../../models/establishment';
import { Categories } from './../../models/category';
import { Cuisine } from './../../models/cuisine';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() filters: any[] = [];
  @Input() establishmentTypes: Establishment[] = [];
  @Input() categories: Categories[] = [];
  @Input() cuisines: Cuisine[] = [];
  @Output() selectedFilters = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.filterForm = this.fb.group({
      types: new FormArray([])
    });
    this.addTypesCheckboxes();
    console.log('types', this.filterForm.get('types').value);
  }
  addTypesCheckboxes() {
    if (this.establishmentTypes && this.establishmentTypes.length) {
      this.establishmentTypes.forEach((t, i) => {
        const control = new FormControl(i = 0);
        (this.filterForm.get('types') as FormArray).push(control);
      });
    }
  }

  onSubmit() {
    console.log('submit');
  }
}
