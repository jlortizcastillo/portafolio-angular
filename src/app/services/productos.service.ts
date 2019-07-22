import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve, reject) => {
      const url = 'https://angular-html-3d7e1.firebaseio.com/productos_idx.json';

      this.http.get(url)
                .subscribe(
                  (res : Producto[]) => {
                    console.log(res);
                    this.productos = res;
                    this.cargando = false;
                    resolve();
                  },
                  err => {
                    console.log(err);
                  }
                );
    });

    
  }

  getProducto(id:string){
    const url = `https://angular-html-3d7e1.firebaseio.com/productos/${id}.json`;

    return this.http.get(url);
  }

  buscarProducto(termino: string){

    if(this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then(() => {
        //ejecutar despues de tener los productos
        //aplicar el filtro
        this.filtrarProductos(termino);
      });

    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    console.log(this.productos);
    
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach(producto => {

      const tituloLower = producto.titulo.toLowerCase();
      
      if(producto.categoria.indexOf(termino) >= 0
         || tituloLower.indexOf(termino) >= 0) {
          this.productosFiltrado.push(producto);
      }
    });
  }
}
