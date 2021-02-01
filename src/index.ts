import Main from './modules/main/main';
import Language from './modules/language/language';

document.addEventListener('DOMContentLoaded', () => {
  const language: Language = new Language();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app: Main = new Main(language);
});
