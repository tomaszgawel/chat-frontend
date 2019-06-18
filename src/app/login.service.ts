import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from 'src/app/app.constants';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {LoginModel} from './login/login.model';

type EntityResponseType = HttpResponse<LoginModel>;


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public resourceUrl = SERVER_API_URL + 'login';

  constructor(protected http: HttpClient) {
  }

  login(model: LoginModel): Observable<EntityResponseType> {

    return this.http
      .post<LoginModel>(this.resourceUrl, model, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
    }
    return res;
  }
}
