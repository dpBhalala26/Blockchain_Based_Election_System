export interface Election { 
    id:string
    title:string;
    description: string;
    startDate: Date;
    endDate: Date;
    status:string;
    createdBy:string;
    voters:string[];
    candidates:string[];
  }