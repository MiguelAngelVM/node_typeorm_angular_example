import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { FormsModule }           from '@angular/forms';


import { NiCardComponent }       from './ni-card/ni-card.component';
import {MatProgressBarModule}    from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule
  ],
  declarations: [

    NiCardComponent,
  
  ],
  exports: [
   
    NiCardComponent,
   
  ]
})
export class NiComponentsModule { }
