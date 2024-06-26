  export interface User {
    _id: string;
    password?: string;
    email: string;
    access_token: string;
    name: string;
  }

  export interface Post {
    _id: number;
    title: string;
    description: string;
    image: string;
    userId: string;
    likes:number;
    dislikes:number;
    comment:number;
  }
  
  export interface Comment {
    _id: number;
    postId: number;
    userId: string;
    author?:string;
    postUserId: string;
    description: string;
    deleted: string;
  }

  export interface Like {
    _id: number;
    postId: number;
    userId: number;
    likes:number;
    type:string;
  }

  export interface PostHistoryType {
    _id: number;
    postId: number;
    title: string;
    description: string;
    image: string | null;
    createdAt: Date;
  }