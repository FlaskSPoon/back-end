import { Column } from "typeorm";

export class Pagination{
@Column()
page: number = 1; 
@Column() 
limit: number = 10; 
}