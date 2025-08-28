import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmLabel } from '@spartan-ng/helm/label';
import { lucideCheck, lucideX } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  BrnDialogContent,
  BrnDialogTrigger,
  BrnDialogClose,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialog,
  HlmDialogContent,
  HlmDialogDescription,
  HlmDialogFooter,
  HlmDialogHeader,
  HlmDialogTitle,
} from '@spartan-ng/helm/dialog';

export interface Granja {
  id: number;
  nombre: string;
  codigoRega: string;
  direccion: string;
  email: string;
}

@Component({
  selector: 'app-farm-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmInput,
    HlmButton,
    NgIcon,
    HlmIcon,
    HlmDialog,
    HlmDialogContent,
    HlmDialogHeader,
    HlmDialogTitle,
    HlmDialogDescription,
    HlmDialogFooter,
    BrnDialogTrigger,
    HlmLabel,
    BrnDialogClose,
    BrnDialogContent,
  ],
  providers: [provideIcons({ lucideCheck, lucideX })],
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css'],
})
export class FarmFormComponent {
  @Input() granja?: Granja;
  @Output() guardar = new EventEmitter<Granja>();
  @Output() cancelarForm = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: this.fb.nonNullable.control(
        this.granja?.nombre || '',
        Validators.required
      ),
      'codigo-rega': this.fb.nonNullable.control(
        this.granja?.codigoRega || '',
        Validators.required
      ),
      direccion: this.fb.nonNullable.control(
        this.granja?.direccion || '',
        Validators.required
      ),
      email: this.fb.nonNullable.control(this.granja?.email || '', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onGuardar() {
    if (this.form.valid) {
      const nuevaGranja: Granja = { ...this.granja, ...this.form.value };
      this.guardar.emit(nuevaGranja);
    }
  }
}
