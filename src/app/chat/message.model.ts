import {Moment} from 'moment';

export class MessageModel {
  user?: string;
  messageText?: string;
  code?: string;
  created?: Moment;
}
