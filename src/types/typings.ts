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

type Dictionary<T> = { [key: string]: T };
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
