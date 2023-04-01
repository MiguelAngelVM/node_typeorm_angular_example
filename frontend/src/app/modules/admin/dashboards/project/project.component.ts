import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector       : 'project',
    templateUrl    : './project.component.html',
	providers: []
})
export class ProjectComponent implements OnInit, OnDestroy
{
    userName:string;
    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    selectedProject: any = {userName:'Todas las aduanas', codigo:null};
    aduanas: Array<any> = [];
    public preRegistro  = '...';
    public bodega       = '...';
    public cliente      = '...';
    public bodegas: [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public eCodProyecto:any = ''
    public proyectoCtrl: FormControl;
    public proyectoFiltrados: any;
    private proyectoTime = undefined;

    /**
     * Constructor
     */
    constructor(
        private _projectService: ProjectService,
        private _router: Router,
    )
    {
        this.userName = localStorage.getItem('userName');
    }

    /**
     * On init
     */
    ngOnInit(): void{
      
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }
   
}
