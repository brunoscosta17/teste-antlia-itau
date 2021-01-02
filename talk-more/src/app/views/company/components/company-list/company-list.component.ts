import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
export class CompanyListComponent implements OnInit, AfterViewInit {

  @Input() dataSource: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'company', 'CNPJ', 'plan', 'bill', 'minutes', 'planValue', 'joinDate', 'sendDate', 'action'];
  pagination = new MatTableDataSource<Company>();

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.pagination.paginator = this.paginator;
    this.pagination = new MatTableDataSource<Company>(this.dataSource);
  }

}
