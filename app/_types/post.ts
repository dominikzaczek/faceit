export default interface PostType {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
}


export interface Author{
    id:number;
    firstName: string;
    lastName: string;
    image: string;
}