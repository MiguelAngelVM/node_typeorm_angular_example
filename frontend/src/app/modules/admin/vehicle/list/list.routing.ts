import { Route } from '@angular/router';
import { ListComponent } from 'app/modules/admin/vehicle/list/list.component';

export const vehicleRoute: Route[] = [
    {
        path     : 'list',
        component: ListComponent,
    }
];
