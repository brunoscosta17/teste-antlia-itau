import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TalkMoreService } from 'src/app/shared/service/talk-more.service';

export interface Company {
  company: string;
  CNPJ: string;
  plan: string;
  bill: string;
  minutes: string;
  planValue: string;
  joinDate: string;
  sendDate: string;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent {

  constructor(
    public talkMoreService: TalkMoreService
  ) {}

  @Input() dataSource: any[];

  @Output() companyEditList: EventEmitter<any> = new EventEmitter();
  @Output() companyDelete: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['id', 'company', 'CNPJ', 'plan', 'bill', 'minutes', 'planValue', 'joinDate', 'sendDate', 'action'];
  pagination = new MatTableDataSource<Company>();

  handleEdit(company) {
    this.companyEditList.emit(company);
  }

  handleDelete(company) {
    this.companyDelete.emit(company);
  }

}
