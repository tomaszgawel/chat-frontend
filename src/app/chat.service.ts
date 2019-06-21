import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessageModel} from './chat/message.model';
import {map} from 'rxjs/operators';
import {SERVER_API_URL} from './app.constants';
import * as moment from 'moment';
import {OnlineModel} from "./chat/online.model";


type EntityResponseType = HttpResponse<MessageModel>;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public resourceUrl = SERVER_API_URL + 'sendmessage';
  public onlineUrl = SERVER_API_URL + 'onlineusers';
  public newMessages = SERVER_API_URL + 'messages';

  constructor(protected http: HttpClient) {

  }

  public sendMessage(model: MessageModel) {
    console.log('sending message ' + model.messageText);
    return this.http
      .post<MessageModel>(this.resourceUrl, model, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  public getNewMassages() {
    return this.http
      .get<MessageModel[]>(this.newMessages, {observe: 'response'});
  }

  public checkWhoIsOnline() {
    return this.http
      .get<OnlineModel>(this.onlineUrl, {observe: 'response'});
  }


  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
    }
    return res;
  }
}
