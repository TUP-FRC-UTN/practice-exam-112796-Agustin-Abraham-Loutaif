import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Productos } from '../models/productos';
import { OrdenesService } from '../services/ordenes.service';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit{

  ordenesService = inject(OrdenesService);

  listaProductos: Productos[] = [];
  productoActual: Productos | undefined = {
    id: "",
    name: "Producto A",
    price: 100,
    stock: 50
  };;

  datosCliente = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email],this.validacionEmailAsync()),
    productos: new FormArray([], [Validators.required, this.validacionProductos.bind(this)])
  })

  get productosArray() {
    return this.datosCliente.get('productos') as FormArray;
  }

  ngOnInit(): void {
     this.ordenesService.getProducts().subscribe({
       next: (productos) => {
         this.listaProductos = productos; // Asignar los productos a la lista
         console.log(this.listaProductos);
       },
       error: (err) => {
         console.error('Error al obtener productos: ', err); // Manejo de errores
       }
     })
  }
  
  validacionProductos(productosArray: FormArray) : ValidationErrors | null{
    const productosActuales = productosArray.controls.map(producto => producto.get('id')?.value as Number);
    const duplicados = productosActuales.some((id, index) => productosActuales.indexOf(id) !== index)
    return duplicados ? {duplicado: true} : null
  }

  validacionEmailAsync(): AsyncValidatorFn | null{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value){
        return of(null)  
      }

      return this.ordenesService.getOrderByEmail(control.value).pipe(
        tap((orders) => {
          console.log("Ordeners" + orders)
        }),
        map(orders =>{
            const now = new Date();

            const recentOrders = orders.filter(order =>{
              const fechaOrden = order.timestamp ? new Date(order.timestamp) : new Date();
              const diferenciaMiliseg = now.getTime() - fechaOrden.getTime();
              const diferenciaHora = diferenciaMiliseg / (1000*60*60);
              return diferenciaHora <= 100000000;
            })

            console.log(recentOrders.length)
            if(recentOrders.length >= 3){
              return { sobrelimite: true }
            }

            return null;
        }),
        catchError((error) =>{
          console.error("Error",error);
          return of(null);
        })
      );
    }
  }

  pushProducto(){
    const nuevo: FormGroup = new FormGroup({
      id: new FormControl("", [Validators.required]),
      cantidad: new FormControl(1, [Validators.required,Validators.min(1)]),
      precio: new FormControl(0, []),
      stock: new FormControl(0, []),
    });
    
     nuevo.get("id")?.valueChanges.subscribe(id =>{
      const product = this.listaProductos.find(p => p.id === id)
      this.productoActual = product;

      if (product) {
        nuevo.patchValue({
          stock: product.stock,
          precio: product.price 
        });

        const cantidad = nuevo.get("cantidad");
        cantidad?.setValidators([Validators.max(product?.stock)])
      }

    })

    this.productosArray.push(nuevo);
  }
 


  deleteProducto(index: number){
    this.productosArray.removeAt(index);
  }

  submit(){
    if (this.datosCliente.valid){
      console.log(this.datosCliente.value);
    } else {alert()}
  }
}
