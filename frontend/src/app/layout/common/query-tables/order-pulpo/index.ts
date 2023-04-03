import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { App } from 'app/app'


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'orderPulpo',
  templateUrl: './index.html',
  providers: []
})

export class orderPulpo implements OnInit {
	public loader: number = 1;
	public breadcrumb;
	public isCollapsed = false;
    @Input()    complete:any=0;
    @Output()   completoEvent = new EventEmitter();
    @Output()   changeInputEvent = new EventEmitter();
    @Input()    columns:any=[{}];
    @Input()    methods:any={};
	public rows;
	constructor(
		public dialog: MatDialog) {
	}
    changeInput(){
        this.changeInputEvent.emit(this.methods);
    }
	ngOnInit() {	
       
    }
}
