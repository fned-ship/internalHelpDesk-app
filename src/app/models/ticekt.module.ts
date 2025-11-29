export interface Ticket {
  id: string;
  emp_id: string;
  chef_id: string;
  status: 'In Progress' | 'Closed' | 'Pending';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  rating: number;
  deadline: Date | string;
  chatID: string;
  description: string;
}
