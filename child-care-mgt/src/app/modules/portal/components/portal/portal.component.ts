import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../../app/shared/services/loader/loader.service';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit{

  public errorMessage: boolean = false;
  public textErrorMessage: string;

  public showPortal: boolean = true;


  constructor(public loaderSrv: LoaderService){
                
                
  }

  ngOnInit(): void {
  }

  
}
