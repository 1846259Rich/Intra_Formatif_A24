import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { compteDixMots, nomDansCommentaire } from './compteDitMots';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';
  formGroup: FormGroup;

  constructor(
    private fromBuilder: FormBuilder
  ) {
    this.formGroup = this.fromBuilder.group({
      nom: ['', [Validators.required]],
      numRue: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      postal: ['', [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      commentaire: ['', [compteDixMots()]]
    },
    { validators: nomDansCommentaire() }
  );
  }
}


