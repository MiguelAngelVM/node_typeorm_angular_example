import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from "@fuse/components/navigation";
import { App } from "app/app";

@Component({
  selector: "internal-header",
  templateUrl: "./index.component.html",
})
export class InternalHeaderComponent implements OnInit {
  public title = "";
  public isCollapsed = false;
  public useloader: number = 0;
  public userName: string = '';
  @Input() loader: number = 0;
  @Input() create: boolean = false;
  @Output() showFilter = new EventEmitter();
  @Output() onClickFilter = new EventEmitter();
  @Output() onClickDelete = new EventEmitter();
  @Output() onClickStore = new EventEmitter();

  constructor(
    public app: App,
    public router: Router,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loader) {
      this.loader = changes.loader.currentValue;
    }
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }

  toggleNavigation(name: string): void {
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  onClickOpenFilter = () => {
    this.isCollapsed = !this.isCollapsed;
    this.showFilter.emit(this.isCollapsed);
  };
  
}
