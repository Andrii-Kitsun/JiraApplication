import { IUser } from './userModel';

export interface IIssueItem {
  id: String;
  title: String;
  columnTitle: String;
  type: 'epic' | 'userStory' | 'task' | 'newFeature' | 'bug';
  assignee: IUser;
  priority: 'critical' | 'major' | 'minor' | 'trivial';
  dueDate: String;
  description: String;
}
