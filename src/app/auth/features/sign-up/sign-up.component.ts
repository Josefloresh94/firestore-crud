import { hasEmailError, isRequired } from './../../utils/validators';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;

      if (!email || !password) return;

      await this._authService.signUp({ email, password });

      toast.success('Usuario creado correctamente!');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al crear el usuario. Por favor, inténtalo de nuevo.');
      console.error('Error al crear el usuario:', error);
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();

      toast.success('Inicio de sesión exitoso con Google!');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error(
        'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.'
      );
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }
}
