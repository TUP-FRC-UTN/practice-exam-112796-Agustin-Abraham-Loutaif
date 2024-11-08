import { Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { ListOrderComponent } from './list-order/list-order.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "create-order",
        pathMatch: 'full'
    },
    {
        path: "create-order",
        component: NewOrderComponent
    },
    {
        path: "orders",
        component: ListOrderComponent
    }
];
