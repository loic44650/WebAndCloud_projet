/**
 * Created by demeph on 18/04/2017.
 */
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';


@Component({
    moduleId:module.id,
    templateUrl: "dashboard.component.html",
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit{

    title = "Timeline";



    constructor(){

    }

    ngOnInit(): void {

    }

    // events
    public chartClicked(e:any) :void {
        console.log(e);
    }

    public chartHovered(e:any) :void {
        console.log(e);
    }
}
