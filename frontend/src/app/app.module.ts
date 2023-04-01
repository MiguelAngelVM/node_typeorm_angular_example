import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseConfigModule } from '@fuse/services/config';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { appConfig } from 'app/core/config/app.config';
import { CoreModule } from 'app/core/core.module';
import { LayoutModule } from 'app/layout/layout.module';
import { mockApiServices } from 'app/mock-api';
import { MarkdownModule } from 'ngx-markdown';
import { App } from './app';
import { DataService } from './globals/data.service';
import { DialogOverviewExampleDialog, ModalBasicComponent } from './shared/modal-basic/modal-basic.component';
import { NiComponentsModule } from 'app/ni-components/ni-components.module';
// import { DataTableModule } from 'ng-angular9-datatable';
// import { DataTableModule } from 'angular-bootstrap-data-table';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { environment } from "../environments/environment";


const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        DialogOverviewExampleDialog,
        ModalBasicComponent,   
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatNativeDateModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        NiComponentsModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        App,
        DataService,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule
{
}
