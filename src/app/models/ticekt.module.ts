export interface Ticket {
  id?: string;
  _id?:string ;
  emp: any; // _id
  chef: any; //_id
  emp_id?:string ; //id
  chef_id?:string ; //id
  status: 'In Progress' | 'Closed' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  rating: number;
  deadline: Date | string;
  chatID?: string;
  description: string;
  createdAt?:Date | string ;
  updatedAt?:Date | string ;
}
