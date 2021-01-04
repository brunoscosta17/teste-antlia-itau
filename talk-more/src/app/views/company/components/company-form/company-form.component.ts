import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { DateTime } from 'luxon';
import { cloneDeep } from 'lodash';
import { dateToString, stringToDate } from '../../../../shared/functions/date.function';
import { DateAdapter } from '@angular/material/core';

const DATA = {
  cnpj: '40.841.253/0001-02',  
  currency: 'R$ 999,99',
}

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  public MASKS = MASKS;

  @Input()
  companyFormEvent: Observable<string>;
  companyFormEventSubscription: Subscription;

  @Input() companyEditResult: any[];

  @Output() companyFormSubmit: EventEmitter<any> = new EventEmitter();

  public companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {

    
    this.companyForm = this.formBuilder.group({
      _id: [''],
      company: ['', Validators.required],
      CNPJ: ['', Validators.required],
      plan: ['', Validators.required],
      bill: ['', [<any>Validators.required, <any>NgBrazilValidators.currency]],
      minutes: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(60)]],
      planValue: ['', [<any>Validators.required, <any>NgBrazilValidators.currency]],
      joinDate: ['', Validators.required],
      // sendDate: ['', Validators.required])],
    });
    
    if (this.companyEditResult) {
      this.companyEditResult['joinDate'] = stringToDate(this.companyEditResult['joinDate']);
      this.companyForm.patchValue(this.companyEditResult);
    }

    const controls = this.companyForm.controls;

    controls.company.valueChanges
      .subscribe((value: string) => {
          if (controls.company.value.length === 1 && controls.company.value === ' ') {
              controls.company.setValue(value.trim(), { emitEvent: false })
          }
      });

    controls.plan.valueChanges
    .subscribe((value: string) => {
        if (controls.plan.value.length === 1 && controls.plan.value === ' ') {
            controls.plan.setValue(value.trim(), { emitEvent: false })
        }
    });

  }

  handleSubmit() {

    let data = this.companyForm.get('joinDate').value;
    let dataPtBr = dateToString(data);

    const form = cloneDeep(this.companyForm.value);
    form.joinDate = dataPtBr;
    if  (this.companyForm.valid) {
      this.companyFormSubmit.emit(form);
    }
  }

}
