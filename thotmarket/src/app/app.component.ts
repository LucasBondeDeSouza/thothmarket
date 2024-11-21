import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'thotmarket';

  endereco = {
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
  };

  constructor(private http: HttpClient) {}

  buscarEndereco() {

    // Verifique se o CEP tem 8 caracteres
    if (this.endereco.cep.length === 8) {
      const url = `https://viacep.com.br/ws/${this.endereco.cep}/json/`;
      this.http.get<any>(url).subscribe({
        next: (data) => {
          
          if (!data.erro) {
            this.endereco.logradouro = data.logradouro;
            this.endereco.bairro = data.bairro;
            this.endereco.cidade = data.localidade;
          } else {
            alert('CEP inválido!');
          }
        },
        error: () => {
          alert('Erro ao buscar o CEP!');
        },
      });
    } else {
      // Limpar os campos caso o CEP seja inválido
      this.endereco.logradouro = '';
      this.endereco.bairro = '';
      this.endereco.cidade = '';
    }
  }
}