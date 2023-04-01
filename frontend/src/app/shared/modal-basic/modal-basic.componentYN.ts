import {Component, OnInit, Input, ViewEncapsulation, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-basic',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalBasicComponentYN implements OnInit {
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
  selector: 'dialog-overview-example-dialog-yesno',
  template: `<h1 mat-dialog-title>{{data.titulo}}</h1>
<div mat-dialog-content >
  <p *ngIf="data.subtitulo">{{data.subtitulo}}</p>
  <p *ngFor="let item of data.listado" style='margin-bottom: 0em;'>
    {{item}}
  <p>
</div>
<div mat-dialog-actions class="row justify-content-center">
  <button mat-raised-button color="primary"[mat-dialog-close]="1" tabindex="1" >{{data.boton1}}</button>
  <button *ngIf="data.habilitar2" mat-raised-button color="warn" [mat-dialog-close]="2" tabindex="2">{{data.boton2}}</button>
</div>
`,
})
export class DialogOverviewExample {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExample>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

