import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnChanges, OnInit {

  public MASKS = MASKS;

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
      company: ['', Validators.required],
      CNPJ: ['', Validators.required],
      plan: ['', Validators.required],
      bill: ['', Validators.required],
      minutes: ['', Validators.required],
      planValue: ['', Validators.required],
      joinDate: ['', Validators.required],
      // sendDate: ['', Validators.required])],
    });

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
    if  (this.companyForm.valid) {
      this.companyFormSubmit.emit(this.companyForm);
    }
  }

}
