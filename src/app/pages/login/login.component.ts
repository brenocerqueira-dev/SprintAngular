import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';

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

    this.http.post<Usuario>('http://localhost:3001/login', dadosLogin).subscribe({
      next: (resposta: Usuario) => {
        // salva no localStorage e vai para a home
        localStorage.setItem('usuarioLogado', 'true');
        this.router.navigate(['/home']);
      },
      error: (erro: HttpErrorResponse) => {
        // erro: Mostra o alerta e limpa os campos (sem salvar no localStorage)
        alert('Nome ou senha incorretos. Por favor, tente novamente.');
        this.usuario = '';
        this.senha = '';
      }
    });
  }
}