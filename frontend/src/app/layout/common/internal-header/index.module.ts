import { CommonModule } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FuseFullscreenModule } from "@fuse/components/fullscreen";
import { InternalHeaderComponent } from "app/layout/common/internal-header/index.component";
import { UserModule } from "app/layout/common/user/user.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [InternalHeaderComponent],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    FuseFullscreenModule,
    UserModule,
  ],
  exports: [InternalHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class InternalHeaderModule {}
