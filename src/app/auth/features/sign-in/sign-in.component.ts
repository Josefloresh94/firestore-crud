import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignIn>({
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

      await this._authService.signIn({ email, password });

      toast.success('Hola nuevamente!');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      console.error('Error al iniciar sesión:', error);
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
}
