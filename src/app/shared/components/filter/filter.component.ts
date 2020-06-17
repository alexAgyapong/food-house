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

  get establishmentTypesArray(): FormArray {
    return this.filterForm.get('types') as FormArray;
  }
  get categoriesArray(): FormArray {
    return this.filterForm.get('categories') as FormArray;
  }
  get cuisinesArray(): FormArray {
    return this.filterForm.get('cuisines') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.filterForm = this.fb.group({
      types: new FormArray([]),
      categories: new FormArray([]),
      cuisines: new FormArray([])
    });
    this.addEstablishmentTypes();
    this.addCategories();
    this.addCuisines();
  }

  addEstablishmentTypes() {
    if (this.establishmentTypes && this.establishmentTypes.length) {
      this.establishmentTypes.forEach((t, i) => {
        const control = new FormControl(i = 0);
        this.establishmentTypesArray.push(control);
      });
    }
  }

  addCategories() {
    if (this.categories && this.categories.length) {
      this.categories.forEach((cat, i) => {
        const control = new FormControl(i = 0);
        this.categoriesArray.push(control);
      });
    }
  }

  addCuisines() {
    if (this.cuisines && this.cuisines.length) {
      let key = Object.values(this.cuisines);
      console.log('keys', key)
      this.cuisines.forEach((c, i) => {
        const control = new FormControl(i = 0);
        this.cuisinesArray.push(control);
      });
    }
  }
  onSubmit() {
    console.log('submit');
  }
}
