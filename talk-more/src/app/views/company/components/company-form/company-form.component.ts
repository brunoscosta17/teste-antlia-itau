import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnChanges, OnInit {

  @Input()
  companyFormEvent: Observable<string>;
  companyFormEventSubscription: Subscription;

  @Input() companyEditResult: any[];

  @Output() companyFormSubmit: EventEmitter<any> = new EventEmitter();

  public companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(simplesChanges: SimpleChanges) {
    if (simplesChanges && this.companyEditResult) {
      this.companyForm.patchValue(this.companyEditResult);
    }
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      _id: [''],
      company: ['', Validators.compose([Validators.required, ])],
      CNPJ: ['', Validators.compose([Validators.required, ])],
      plan: ['', Validators.compose([Validators.required, ])],
      bill: ['', Validators.compose([Validators.required, ])],
      minutes: ['', Validators.compose([Validators.required, ])],
      planValue: ['', Validators.compose([Validators.required, ])],
      joinDate: ['', Validators.compose([Validators.required, ])],
      // sendDate: ['', Validators.compose([Validators.required, ])],
    });
  }

  handleSubmit() {
    if  (this.companyForm.valid) {
      this.companyFormSubmit.emit(this.companyForm);
    }
  }

}
