export type Dictionary<T> = { [key: string]: T };

export interface UserCategory {
  entries<T extends { [key: string]: any }, K extends keyof T>(o: T): [keyof T, T[K]][];
  id: number;
  name: string;
  type: number;
  plan: number;
  summa: number;
  icoUrl: string;
}
export type UserCategoryKeys = keyof UserCategory;

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

export interface MoveItem {
  element: HTMLElement,
  info: Move,
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
  allMoves: Dictionary<Array<Move>>;
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
interface LoginFormLang{
  loginTitle: Dictionary<string>;
  emailPlaceholder: Dictionary<string>;
  passPlaceholder: Dictionary<string>;
  submitBtn: Dictionary<string>;
  metaTitle: Dictionary<string>;
  metaLink: Dictionary<string>;
}

interface MetaLang{
  haveAccount: Dictionary<string>;
  login: Dictionary<string>;
}
interface RegisterLang{
  registerTitle: Dictionary<string>;
  registerNamePlaceholder: Dictionary<string>;
  registerSignup: Dictionary<string>;
  meta: MetaLang;
}

interface BloksLang{
  blockName: Dictionary<string>;
  totalAmount: Dictionary<string>;
  planAmount?: Dictionary<string>;
}

interface SourceBloksLang{
  title: Dictionary<string>;
  itemName: Dictionary<string>;
  amount?: Dictionary<string>;
}
interface AddNewSourceLang{
  noEmptyFields: Dictionary<string>;
  income: SourceBloksLang;
  accounts: SourceBloksLang;
  expenses: SourceBloksLang;
}

interface TitleLang{
  title: Dictionary<string>;
}
interface UpdateUserCatLang{
  income: TitleLang;
  accounts: TitleLang;
  expenses: TitleLang;
}

interface MenuLang{
  logout: Dictionary<string>;
}

interface MoveLang{
  labelFrom: Dictionary<string>;
  labelTo: Dictionary<string>;
  labelAmount: Dictionary<string>;
  labelDate: Dictionary<string>;
  labelComment: Dictionary<string>;
  submitBtn: Dictionary<string>;
}

interface SelectTimesDataLang{
  data: Array<Dictionary<string>>;
  titel: Dictionary<string>;
}
interface ChartLang{
  selectItems: Array<Dictionary<string>>;
  selectTimes: SelectTimesDataLang;
}

interface TotalLang{
  total: Dictionary<string>
}
export interface Locale{
  loginForm: LoginFormLang
  register: RegisterLang
  income: BloksLang
  accounts: BloksLang
  expenses: BloksLang
  addNewSource: AddNewSourceLang
  updateUserCat: UpdateUserCatLang
  menu: MenuLang
  updateBtn: Dictionary<string>
  addBtn: Dictionary<string>
  move: MoveLang
  chart: ChartLang
  weekdays: Dictionary<Array<string>>
  months: Dictionary<Array<string>>
  currency: Dictionary<string>
  moves: TotalLang
  autoData: Dictionary<string>
}

export type UserToken = string|null|undefined;

export interface ChartFilter {
  id: number
  name: string
  catType?: number
  userCat?: number
}

export interface ChartDataItem {
  x: Date
  y: number
  userCat?: number
}

export interface ChartDataItemReal {
  x: Date
  y: number
}

export interface IputInfoMove {
  moveFrom: UserCategory|null
  moveTo: UserCategory|null
}

export type Content = string|number|null|boolean;
