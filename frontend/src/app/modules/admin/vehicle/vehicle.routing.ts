import { Route } from '@angular/router';
import { ListComponent } from 'app/modules/admin/vehicle/list/list.component';
import { CreateComponent } from 'app/modules/admin/vehicle/create/create.component';

export const vehicleRoute: Route[] = [
    {
        path     : 'list',
        component: ListComponent,
    },
    {
        path     : 'create',
        component: CreateComponent,
    }
];
