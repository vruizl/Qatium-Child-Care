import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { Subscription } from 'rxjs';
import { LoaderModel } from '../../models/loader.model';
import { LoaderBgColor } from '../../enums/loader-bg-color.enum';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public showLoader: boolean;
  public text: string;
  public bgColor: string;
  private loaderSubscription: Subscription; 

  constructor(private loader: LoaderService) {
    this.showLoader = false;
  }

  ngOnDestroy(){
    if (!!this.loaderSubscription){
      this.loaderSubscription.unsubscribe();
    }
  } 

  ngOnInit(): void {
    this.loaderSubscription = this.loader.onLoader.subscribe(
      {
        next: (model: LoaderModel) =>
        {
          this.showLoader = model?.show;
          this.text = model?.text;
          this.bgColor = LoaderBgColor[model?.bgColor];
        }, 
        error: (error) => 
        {
          this.showLoader = false;
          this.text  = "";
          console.warn("LoaderComponent: " + error);
        }
      }
    );
  }

  getBgColor(){
    return (this.bgColor || 'default').toLowerCase();
  }
}
