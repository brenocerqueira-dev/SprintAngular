import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // <-- Importar o Login

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent], // <-- Adicionar o LoginComponent aqui
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meu-projeto';
}