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
  @Output() selectedCategories = new EventEmitter<number[]>();
  @Output() selectedCuisines = new EventEmitter<number[]>();
  @Output() selectedEstablishmentTypes = new EventEmitter<number[]>();
  @Output() selectedFilters = new EventEmitter<any>();
  filterForm: FormGroup;
  categoryIds: number[];
  cuisineIds: number[];
  establishmentTypeIds: number[];

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

    this.filterForm.valueChanges.subscribe(data => {
      if (data.categories) {
        this.categoryIds = this.categoriesArray.controls
          .map((v, i) => (v.value ? this.categories[i].id : null))
          .filter(v => v !== null);
        this.selectedCategories.emit(this.categoryIds);
      }

      if (data.cuisines) {
        this.cuisineIds = this.cuisinesArray.controls
          .map((v, i) => (v.value ? this.cuisines[i].cuisine_id : null))
          .filter(v => v !== null);
        this.selectedCuisines.emit(this.cuisineIds);
      }

      if (data.types) {
        this.establishmentTypeIds = this.establishmentTypesArray.controls
          .map((v, i) => (v.value ? this.establishmentTypes[i].id : null))
          .filter(v => v !== null);
        this.selectedEstablishmentTypes.emit(this.establishmentTypeIds);
      }
    })
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
      this.cuisines.forEach((c, i) => {
        const control = new FormControl(i = 0);
        this.cuisinesArray.push(control);
      });
    }
  }
  onSubmit() {
    console.log('submit');

    const output = [];
    this.categoriesArray.controls.forEach((v, i) => {
      if (v.value) {
        output.push(this.categories[i]);
      }
    });
    console.log('output', output);
    const ids = this.categoriesArray.controls
      .map((v, i) => (v.value ? this.categories[i] : null))
      .filter(v => v !== null);
    console.log('ids', ids)
  }
}
