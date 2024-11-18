import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSucess(),
      (error) => {
        this.onError();
      }
    );
  }

  onCancel() {
    this.location.back();
  }

  onError() {
    this._snackBar.open('Failed to save.', '', { duration: 3000 });
  }

  onSucess() {
    this._snackBar.open('Course saved successfully.', '', { duration: 3000 });
    this.onCancel();
  }
}
