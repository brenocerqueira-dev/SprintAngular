import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

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

  fazerLogin() {
    if (this.usuario === 'admin' && this.senha === '123456') {
      alert('Login efetuado com sucesso!');
      
    } else {
      alert('Usuário ou senha incorretos.');
    }
  }
}