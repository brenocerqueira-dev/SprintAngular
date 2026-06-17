import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private roteador = inject(Router);
  
  // Variável que o HTML usa para saber se mostra o menu ou não
  menuEstaAberto = false;

  // A função que o botão de menu chama para abrir ou fechar o menu
  abrirOuFecharMenu() {
    this.menuEstaAberto = !this.menuEstaAberto;
  }

  // A função de LOGOUT 
  sairDoSistema() {
    this.roteador.navigate(['/login']);
  }
}