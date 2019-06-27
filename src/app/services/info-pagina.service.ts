import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina;
  cargada = false;
  equipo = [];

  constructor(private http: HttpClient) { 
    //console.log('Servicio de info pagina listo');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    //Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
            .subscribe(
              (resp: InfoPagina) => {
                this.cargada = true;
                this.info = resp;
                //console.log(resp);
              }
            );
  }

  private cargarEquipo(){
    const url = 'https://angular-html-3d7e1.firebaseio.com/equipo.json';
    this.http.get(url)
              .subscribe(
                (res: any) => {
                  //this.cargada = true;
                  this.equipo = res;
                  //console.log(res);
                }
              );
  }
}
