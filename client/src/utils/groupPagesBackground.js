// Converts all background and other CSS properties to suit User pages
const groupBackGround = () => {
  const body = document.getElementById('body');
  const app = document.getElementById('app');
  if (body.className === 'body' || app.className === 'site-wrapper') {
    app.className = '';
    body.className = '';
  }
  body.style.height = 'auto';
};
export default groupBackGround;
