import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    const url = 'https://angular-html-3d7e1.firebaseio.com/productos_idx.json';

    this.http.get(url)
              .subscribe(
                (res : Producto[]) => {
                  //console.log(res);
                  this.productos = res;
                  this.cargando = false;
                },
                err => {
                  console.log(err);
                }
              );
  }
}
