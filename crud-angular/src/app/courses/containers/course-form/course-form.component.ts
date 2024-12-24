import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

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
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(result => this.onSucess(), error => this.onError());
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

  getErrorMessage( fieldName: string ) {
    const field = this.form.get( fieldName );

    const erros = this.form.getError( fieldName );

    if ( field?.hasError( 'required' ) ) {
      return 'Campo Obrigatório';
    }
    if ( field?.hasError( 'minlength' ) ) {
      const requiredLenght = erros ? erros[ 'requiredlength' ] : 4;
      return `Minimum length is ${requiredLenght} characters`;
    }

    if ( field?.hasError( 'maxlength' ) ) {
      const requiredLenght = erros ? erros[ 'requiredlength' ] : 100;
      return `Maximum length is ${requiredLenght} characters`;
    }

    return 'Invalid field.';
  }
}
