import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
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

  company: any;

  viewEdit = false;

  @Output() companyEditForm: EventEmitter<any> = new EventEmitter();

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
    console.log(value.value);
    if (value._id) {
      this.talkMoreService.post(value.value)
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
    } else {
      this.talkMoreService.update(value.value._id)
      .subscribe(() => {
        this._snackBar.open('Atualizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.getCompanies();
      },(error) => {
        this._snackBar.open('Erro ao atualizar esta empresa.', 'Fechar', {
          duration: 3000
        });
        console.log(error);
        this.eventSubject.next('enable');
      });
    }
  }

  handleEditList(company) {
    this.talkMoreService.getById(company._id)
      .subscribe(response => this.company = response);
  }

  handleDelete(company) {
    console.log(company);
    Swal.fire({
      title: 'Remover empresa',
      text: 'Deseja mesmo remover esta empresa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, remover'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeCompany(company._id);
      }
    });
  }

  removeCompany(_id) {
    this.talkMoreService.delete(_id)
      .subscribe(() => {
        this._snackBar.open('Empresa removida com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.getCompanies();
      }, () => {
        this._snackBar.open('Erro ao remover esta empresa.', 'Fechar', {
          duration: 3000
        });
      })
  }

}
