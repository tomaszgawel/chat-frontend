import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessageModel} from './chat/message.model';
import {map} from 'rxjs/operators';
import {SERVER_API_URL} from './app.constants';
import * as moment from 'moment';


type EntityResponseType = HttpResponse<MessageModel>;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public resourceUrl = SERVER_API_URL + 'sendmessage';

  constructor(protected http: HttpClient) {

  }

  public sendMessage(model: MessageModel) {
    return this.http
      .post<MessageModel>(this.resourceUrl, model, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
    }
    return res;
  }
}
