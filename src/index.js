import Main from './modules/main/main';
import Language from './modules/language/language';

document.addEventListener('DOMContentLoaded', () => {
  const language = new Language();
  const app = new Main(language);
});
