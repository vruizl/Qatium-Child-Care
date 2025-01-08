import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderModel } from '../../models/loader.model';
import { LoaderBgColor } from '../../enums/loader-bg-color.enum';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public onLoader: BehaviorSubject<LoaderModel>;
  public isLoading: boolean = false;

  constructor() { 
    this.onLoader = new BehaviorSubject(null);
  }

  public show(text: string = "", bgColor: LoaderBgColor = LoaderBgColor.DEFAULT): void{
    const model = new LoaderModel();
    model.show = true;
    model.text = text;
    model.bgColor = bgColor;
    this.isLoading = true;
    this.onLoader.next(model);
  }

  public hide(): void{
    const model = new LoaderModel();
    model.show = false;
    this.isLoading = false;
    this.onLoader.next(model);
  }

  public getIsLoading():boolean{
    return this.isLoading;
  }
}