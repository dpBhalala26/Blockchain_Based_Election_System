export interface User{
    uname: String;
    email: String;
    pwd: String;
    address: String;
    publicKey:string;
    status:string;
    statusIssueMessage:string;
    roles:[{name:String,refKey:String}]
  }