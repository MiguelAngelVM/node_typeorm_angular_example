import {Component, OnInit, ViewEncapsulation, Input, Output,SimpleChanges,SimpleChange,ViewChild,EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { App } from 'app/app';
import {PageEvent, MatPaginator} from '@angular/material/paginator';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'tabla4MSource',
    templateUrl: './index.html',
    providers: []
})

export class tabla4MSource implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;


    @Input() columnas:any=[{}];
    @Input() filtros:any=[{}];
    @Input() data:any=[{}];
    @Input() url:string="";
    @Input() key:string="";
    @Input() texto1:string="";

    @Input() camposEliminar:any = {};
    @Input() funcionesMenu:any=()=>{};
    @Output() camposEliminarEvent = new EventEmitter();
    public isCollapsed = true;
    public registros;
    public tablaLlena:number=0;
    public encotrados;
    public MenusEmergentes;
    public MaximosRegistros;
    public loader:number=0;
    public metodos:any = {eNumeroRegistros:100};
    public rowsOnPage: number = 30;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "desc";
    public listaparametros;
    public usuarios = [];
    public secciones = [];
    public dataShow = [];
    length = 0;
    pageSize = 15;
    pageIndex = 0;
    pageSizeOptions: number[] = [15, 30, 50, 100];
    pageEvent: PageEvent;
    // <div>List length: {{pageEvent.length}}</div>
    // <div>Page size: {{pageEvent.pageSize}}</div>
    // <div>Page index: {{pageEvent.pageIndex}}</div>
    constructor(public app:App, public router:Router){}

    ngOnInit() {
        this.menusemergentes();
    }
    ngOnChanges(changes: SimpleChanges) {
        // let camposEliminar: SimpleChange = changes.camposEliminar;
        // this.camposEliminar = camposEliminar.currentValue;
        if(changes.data.currentValue){
            if(this.paginator){
                this.paginator.firstPage();
            }
            this.pageSize = 15;
            this.pageIndex = 0;
            this.dataShow = changes.data.currentValue.slice(this.pageIndex, this.pageSize);
            this.length = changes.data.currentValue.length;
        }
        
    }
    
    marcarElimnar(item) {
		if (!item.bMarcar) {
			this.camposEliminar[String(item[this.key])] = 1;
		} else {
			delete this.camposEliminar[String(item[this.key])];
        }
        this.camposEliminarEvent.emit(this.camposEliminar);
	}

    menusemergentes() {
		try {
		this.app.getMenusEmergentes(this.router.url).then(response => {
			this.MenusEmergentes = response;
		},
			error => { });
		} catch (e) {
			this.MenusEmergentes = [];
		}
	}
	
	asignarParametros(funcion, ruta, parametros, tParam) {
		if (funcion == 'rd') {
			this.app.asignarParametros(funcion, ruta, parametros, tParam);
		} else {
			this.funcionesMenu[funcion](parametros);
		}
	}

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        if (setPageSizeOptionsInput) {
          this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        }
    }
    handlePageEvent(event: PageEvent) {
        this.length = event.length;
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.dataShow = this.data.slice(this.pageIndex * this.pageSize, (this.pageIndex * this.pageSize) + this.pageSize);
    }
}
