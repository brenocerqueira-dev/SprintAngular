import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  private roteador = inject(Router);

  listaVeiculos: any[] = [];
  veiculoSelecionado: any = null;
  dadosTelemetria: any = null;
  vinDigitado: string = '';

  // Variável que controla a abertura do menu lateral
  menuEstaAberto = false;

  vinsPorCarro: { [nome: string]: string } = {
    'Ranger': '2FRHDUYS2Y63NHD22454',
    'Mustang': '2RFAASDY54E4HDU34874',
    'Territory': '2FRHDUYS2Y63NHD22455',
    'Bronco Sport': '2RFAASDY54E4HDU34875'
  };

  ngOnInit() {
    this.http.get<any>('http://localhost:3001/vehicles').subscribe(res => {
      this.listaVeiculos = res.vehicles;
      if (this.listaVeiculos.length > 0) {
        this.veiculoSelecionado = this.listaVeiculos[0];
        this.aoMudarPeloSelect();
      }
    });
  }

  // --- Funções da Telemetria ---
  aoMudarPeloSelect() {
    this.dadosTelemetria = null;
    if (this.veiculoSelecionado && this.veiculoSelecionado.vehicle) {
      const vinOculto = this.vinsPorCarro[this.veiculoSelecionado.vehicle];
      if (vinOculto) {
        this.fazerRequisicaoTelemetria(vinOculto);
      }
    }
  }

  aoBuscarPeloVin() {
    if (!this.vinDigitado) return;
    this.fazerRequisicaoTelemetria(this.vinDigitado);
  }

  private fazerRequisicaoTelemetria(vinParaBuscar: string) {
    this.http.post<any>('http://localhost:3001/vehicleData', { vin: vinParaBuscar }).subscribe({
      next: (res) => {
        this.dadosTelemetria = res;
        const carroCorrespondente = this.listaVeiculos.find(v => v.id === res.id);
        if (carroCorrespondente) {
          this.veiculoSelecionado = carroCorrespondente;
          this.vinDigitado = '';
        }
      },
      error: (erro) => {
        alert(erro.error.message || 'Código VIN utilizado não foi encontrado!');
        this.vinDigitado = '';
      }
    });
  }

  // --- Funções do Menu e Logout ---
  abrirOuFecharMenu() {
    this.menuEstaAberto = !this.menuEstaAberto;
  }

  sairDoSistema() {
    localStorage.removeItem('token');
    this.roteador.navigate(['/login']);
  }
}