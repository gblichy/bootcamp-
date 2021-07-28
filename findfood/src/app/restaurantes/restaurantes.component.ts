import { NovoRestauranteComponent } from './../novo-restaurante/novo-restaurante.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestauranteComponent } from '../restaurante/restaurante.component';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  toSearch: any = '';
  siglas: Array<any> = [];

  restaurantes: Array<any> = [
    {
      nome: "Jurubar",
      estado: "Rio de Janeiro",
      cidade: "Venda Nova",
      descricao: "Muito bom restaurante, tem uma jurupinga batida com jabuticaba divina",
      autorRestaurante: "Carioca",
      criadoEm: new Date(),
      estrelas: 5
    }, {
      nome: "Restaurante da Olivia",
      estado: "São Paulo",
      cidade: "Jundiai",
      descricao: "Muito bom restaurante, tem uma jurupinga batida com jabuticaba divina",
      autorRestaurante: "Lucas Santos",
      criadoEm: new Date(),
      estrelas: 3
    }, {
      nome: "Copacabana Restaurante",
      estado: "Rio de Janeiro",
      cidade: "Rio de Janeiro",
      descricao: "Muito bom restaurante, tem uma jurupinga batida com jabuticaba divina",
      autorRestaurante: "Carioca",
      criadoEm: new Date(),
      estrelas: 5
    }
  ];

  constructor(private _http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this._http.get('https://servicodados.ibge.gov.br/api/v1/localidades/regioes/1|2|3|4|5/estados').subscribe((res: any) => {
      let estados = res;
      estados = estados.sort((a: any, b: any) => (a.nome > b.nome) ? 1 : -1);
      estados.forEach((estado: any) => {
        this.siglas.push({
          nome: estado.nome,
          sigla: estado.sigla
        })
      })
    })
  }

  novoRestaurante() {
    const dialogRef = this.dialog.open(NovoRestauranteComponent, {
      width: '80%',
      height: 'max-content',
      data: {
        usuario: '',
        siglas: this.siglas
      }
    });

    dialogRef.afterClosed().subscribe((data: any)=>{
      this.restaurantes.push(data);
    })
  }

  sair() {
    console.log('Olá, função sair');
  }

  abrirRestaurante(restaurante: any) {
    this.dialog.open(RestauranteComponent, {
      width: "80%",
      height: "98vh",
      data: restaurante,
      panelClass: "custom-dialog-container"
    })
  }

}
