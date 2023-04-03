import {Component, OnInit, ViewEncapsulation, Input, Output,SimpleChanges,SimpleChange,ViewChild,EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { App } from 'app/app';
import {PageEvent, MatPaginator} from '@angular/material/paginator';
import { Columns } from 'app/core/table/columns.types';
import { Filter } from 'app/core/table/filter.types';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'tablePulpo',
    templateUrl: './index.html',
    providers: []
})

export class TablePulpo implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;


    @Input() columns:Array<Columns>=[];
    @Input() filters:Array<Filter>=[];
    @Input() data:Array<Object>=[{}];
    @Input() url:string="";
    @Input() key:string="";

    @Input() deleteFields:Object = {};
    @Output() deleteFieldsEvent = new EventEmitter();
    public isCollapsed = true;
    public registros;
    public tablaLlena:number=0;
    public encotrados;
    public rows;
    public loader:number=0;
    public methods:any = {rows:100};
    public rowsOnPage: number = 30;
    public filterQuery: string = "";
    public sortBy: string = "";
    public sortOrder: string = "DESC";
    public listaparametros;
    public usuarios = [];
    public secciones = [];
    public dataShow = [];
    length = 0;
    pageSize = 15;
    pageIndex = 0;
    pageSizeOptions: number[] = [15, 30, 50, 100];
    pageEvent: PageEvent;
    constructor(public app:App, public router:Router){}

    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges) {
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
    
    checkDelete(item) {
		if (!item.check) {
			this.deleteFields[String(item[this.key])] = 1;
		} else {
			delete this.deleteFields[String(item[this.key])];
        }
        this.deleteFieldsEvent.emit(this.deleteFields);
	}

	asignarParametros(funcion, ruta, parametros, tParam) {
		// if (funcion == 'rd') {
		// 	this.app.asignarParametros(funcion, ruta, parametros, tParam);
		// } else {
		// 	this.menuFunction[funcion](parametros);
		// }
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
