import { ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss']
})
export class FeedbackButtonComponent {

  @Input() feedbackActive:boolean =false; 
  @Input() iconClass:string = "";
  @Input() buttonText: string = "";
  @Input() buttonClass: string = "";
  @Input() popOverName: TemplateRef<any> ;
  @Output() buttonClick: EventEmitter<NgbPopover> = new EventEmitter<NgbPopover>(); 
  

  public feedback: boolean;
  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    this.feedback = this.feedbackActive;
  }

  ngOnChanges(){
    this.feedback = this.feedbackActive;
   }

   //It will depend on the function executed on the parent component to use, or not, the popOver variable.
  public buttonClicked(popOver:NgbPopover){
    this.buttonClick.emit(popOver);
  }

}
