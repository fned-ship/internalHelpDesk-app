export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDay:Date ;
  isAccepted?: boolean;
  imageSrc:string ;
  isActive:Boolean ;
  job:string ;
  number:string;
  cin:number;
  address:string;
  rating:number;
  numOfTickets:number;
}