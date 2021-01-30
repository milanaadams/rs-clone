export interface UserCategory {
  id: number;
  name: string;
  type: number;
  plan: number;
  summa: number;
  icoUrl: string;
}
export interface Tag {
  id: number;
  name: string;
  user: number;
}

export interface TagsArr {
  id: number;
  collection: number;
  tag: number;
}

export interface Move {
  id: number;
  user: number;
  catFrom: number;
  catTo: number;
  date: string;
  value: number;
  comment: string;
  tagArr: Array<TagsArr>;
  cat_from_ref: UserCategory;
  cat_to_ref: UserCategory;
}

export interface UserInfoUser {
  email: string;
  name: string;
  userCategories: Array<UserCategory>;
  tags: Array<Tag>;
  allMoves: Array<Move>;
  tagsArr: Array<TagsArr>;
}

export interface Category {
  id: number;
  name: string;
  code: string;
  allowPlan: boolean;
}

export interface UserInfo {
  categories: Array<Category>;
  user: UserInfoUser;
}

export interface UserInfoResponse{
  data: UserInfo;
  token: string;
}

export interface CustomEvent {
  detail: any
}
