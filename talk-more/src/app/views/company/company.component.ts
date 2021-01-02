import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { TalkMoreService } from 'src/app/shared/service/talk-more.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  dataSource: any[] = [];

  eventSubject: Subject<string> = new Subject();

  constructor(
    public talkMoreService: TalkMoreService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.talkMoreService.getAll()
      .subscribe((data: any) => this.dataSource = data);
  }

  addCompany(value) {
    this.talkMoreService.post( { value, applicationId: 'BrunoDaSilvaCosta' })
    .subscribe(() => {
      this._snackBar.open('Adicionado com sucesso!', 'Fechar', {
        duration: 3000
      });
      this.getCompanies();
    },(error) => {
      this._snackBar.open('Erro ao adicionar esta empresa.', 'Fechar', {
        duration: 3000
      });
      console.log(error);
      this.eventSubject.next('enable');
    })
  }

}
