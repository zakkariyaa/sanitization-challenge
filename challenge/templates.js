const sanitize = require('./sanitize.js');

function home(posts, fields = { nickname: null, message: null }) {
  let nicknameError = '';
  let messageError = '';

  if (fields.nickname == null && fields.message == null) {
    nicknameError = '';
    messageError = '';
  } else {
    nicknameError = fields.nickname ? '' : '<p>please enter your nickname</p>';
    messageError = fields.message ? '' : '<p>please enter a message</p>';
  }

  const title = 'All posts';
  const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
      <p>
        <label for="nickname">Nickname</label>
        <input id="nickname" name="nickname" value="${
          fields.nickname ? fields.nickname : ''
        }">
        ${nicknameError}
      </p>
      <p>
        <label for="message">Message</label>
        <textarea id="message" name="message"></textarea>
        ${messageError}
      </p>
      <button>Send</button>
    </form>
    <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join('')}
    </ul>
  `;
  return layout(title, content);
}

function postItem(post) {
  const date = new Date(post.created);
  const prettyDate = date.toLocaleString('en-GB');

  const newMessage = sanitize(post.message);

  return `
    <li>
      <p>${newMessage}</p>
      <p>—${post.nickname} | ${prettyDate}</p>
    </li>
  `;
}

function layout(title, content) {
  return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home };
