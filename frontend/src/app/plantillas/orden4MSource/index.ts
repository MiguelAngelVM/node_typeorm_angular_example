import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { App } from 'app/app'


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'orden4MSource',
  templateUrl: './index.html',
  providers: []
})

export class orden4MSource implements OnInit {
	public loader: number = 1;
	public breadcrumb;
	public isCollapsed = false;
    @Input()    funcionesMenu:any=()=>{};
    @Input()    complete:any=0;
    @Output()   completoEvent = new EventEmitter();
    @Output()   changeInputEvent = new EventEmitter();
    @Input()    columnas:any=[{}];
    @Input()    metodos:any={};
	public MaximosRegistros;
	constructor(
		private app: App,
		public dialog: MatDialog) {
	}
    changeInput(){
        this.changeInputEvent.emit(this.metodos);
    }
	ngOnInit() {	
        // if(this.complete == 0){
            try {
                this.app.getMaximosRegistros().then((response:any) => {
                    this.MaximosRegistros = response.registros;
                    this.metodos.eNumeroRegistros = response.principal.eCantidad
                    this.funcionesMenu.filtrar();
                    // this.completoEvent.emit(true);
                },
                    error => { });
            } catch (e) {
    
                this.metodos = [];
                this.MaximosRegistros = [];
            }	
        }
       
  	// }
}
