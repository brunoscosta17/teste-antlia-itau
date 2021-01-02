import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  @Input()
  companyFormEvent: Observable<string>;
  companyFormEventSubscription: Subscription;

  @Output() companyFormSubmit: EventEmitter<any> = new EventEmitter();

  public companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
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

  getErrorMessage() {
    if (this.companyForm.controls.company.hasError('required')) {
      return 'Insira o nome da empresa';
    } else
    if (this.companyForm.controls.CNPJ.hasError('required')) {
      return 'Insira o CNPJ da empresa';
    } else
    if (this.companyForm.controls.plan.hasError('required')) {
      return 'Insira o nome do plano';
    } else
    if (this.companyForm.controls.bill.hasError('required')) {
      return 'Insira a taxa';
    } else
    if (this.companyForm.controls.minutes.hasError('required')) {
      return 'Insira os minutos';
    } else
    if (this.companyForm.controls.joinDate.hasError('required')) {
      return 'Insira a data de adesão';
    }
  }

  handleSubmit() {
    if  (this.companyForm.valid) {
      this.companyFormSubmit.emit(this.companyForm);
    }
  }

}
