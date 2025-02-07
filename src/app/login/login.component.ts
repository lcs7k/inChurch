import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  errorMessage = '';

  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _loginService = inject(LoginService);

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha todos os campos corretamente!';
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this._loginService.login(email!, password!).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(success => {
      if (success) {
        this._router.navigate(['/']);
      } else {
        this.errorMessage = 'Email ou senha inválidos!';
      }
    });
  }
}
