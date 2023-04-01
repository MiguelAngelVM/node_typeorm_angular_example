import {Component, OnInit, Input, ViewEncapsulation, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalBasicComponent implements OnInit {
  @Input() dialogClass: string;
  @Input() hideHeader: boolean = false;
  @Input() hideFooter: boolean = false;
  public visible = false;
  public visibleAnimate = false;

  constructor(){}

  ngOnInit(){

  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>{{data.titulo}}</h1>
<div mat-dialog-content >
  <p *ngIf="data.subtitulo">{{data.subtitulo}}</p>
  <p *ngFor="let item of data.listado" style='margin-bottom: 0em;'>
    {{item}}
  <p>
</div>
<div mat-dialog-actions class="row col-lg-12">
  <div class="col-lg-6">
    <button  mat-raised-button color="primary"[mat-dialog-close]="1" tabindex="2" >Aceptar</button>
  </div>
  <div class="col-lg-6">
    <button *ngIf="data.cancelar" mat-raised-button color="warn" (click)="onNoClick()" tabindex="-1">Cancelar</button>
  </div>
  
  
</div>
`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

