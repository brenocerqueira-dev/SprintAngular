import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = '';
  senha = '';
  private router = inject(Router);
  private http = inject(HttpClient);

  fazerLogin() {
    const dadosLogin = {
      nome: this.usuario,
      senha: this.senha
    };
    this.http.post('http://localhost:3001/login', dadosLogin).subscribe({
      next: (resposta: any) => {
        this.router.navigate(['/home']);
      },
      error: (erro: any) => {
        alert('Email ou senha incorretos. Por favor, tente novamente.');
        this.usuario = '';
        this.senha = '';
      }
    });


  }
}