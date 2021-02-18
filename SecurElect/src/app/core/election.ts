export interface Election { 
    id:string
    title:string;
    description: string;
    startDate: Date;
    endDate: Date;
    status:string;
    createdBy:string;
    voters:{id:string,publicAddress:string}[];
    candidates:{id:string,name:string}[];
    deploymentPost:string;
    deploymentLocation:string;
    contractMnemonics:string;
  }