const http = require('node:http');

const port = Number(process.env.PORT || 4173);

const homePage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Playwright Learning Demo</title>
    <style>
      body { font: 16px/1.5 system-ui, sans-serif; margin: 2rem auto; max-width: 42rem; padding: 0 1rem; }
      label { display: block; margin: 0.75rem 0 0.25rem; }
      input, button { font: inherit; padding: 0.5rem; }
      section { border-top: 1px solid #bbb; margin-top: 1.5rem; padding-top: 1rem; }
      @media (max-width: 480px) { body { margin-top: 1rem; } button { min-height: 44px; } }
    </style>
  </head>
  <body>
    <h1>Playwright Learning Demo</h1>
    <p id="session-state" aria-live="polite">Guest</p>
    <form id="login-form">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
      <button type="submit">Sign in</button>
    </form>
    <section>
      <h2>Profile</h2>
      <form id="profile-form">
        <label for="name">Your name</label>
        <input id="name" name="name" required>
        <button type="submit">Save profile</button>
      </form>
      <p id="profile-result" aria-live="polite"></p>
    </section>
    <section>
      <h2>Network</h2>
      <button id="load-greeting" type="button">Load greeting</button>
      <p id="greeting-result" aria-live="polite"></p>
    </section>
    <section>
      <h2>Browser features</h2>
      <a href="/popup" target="_blank" rel="noopener">Open details in new tab</a>
      <iframe title="Example frame" src="/frame"></iframe>
      <learning-card></learning-card>
    </section>
    <script>
      const sessionState = document.querySelector('#session-state');
      const savedEmail = localStorage.getItem('learning-user');
      if (savedEmail) sessionState.textContent = 'Signed in as ' + savedEmail;
      document.querySelector('#login-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('#email').value;
        localStorage.setItem('learning-user', email);
        document.cookie = 'learning-session=active; path=/; SameSite=Lax';
        sessionState.textContent = 'Signed in as ' + email;
      });
      document.querySelector('#profile-form').addEventListener('submit', (event) => {
        event.preventDefault();
        document.querySelector('#profile-result').textContent =
          'Profile saved for ' + document.querySelector('#name').value;
      });
      document.querySelector('#load-greeting').addEventListener('click', async () => {
        const response = await fetch('/api/greeting?name=Playwright');
        const greeting = await response.json();
        document.querySelector('#greeting-result').textContent = greeting.message;
      });
      customElements.define('learning-card', class extends HTMLElement {
        connectedCallback() {
          this.attachShadow({ mode: 'open' }).innerHTML =
            '<p>Open shadow root</p><button>Inside shadow root</button>';
        }
      });
    </script>
  </body>
</html>`;

const framePage = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Frame example</title></head>
  <body><h2>Frame content</h2><button>Frame action</button></body>
</html>`;

const popupPage = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>New page</title></head>
  <body><h1>Popup page</h1></body>
</html>`;

function send(response, status, contentType, body) {
  response.writeHead(status, { 'content-type': contentType });
  response.end(body);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    send(response, 200, 'text/plain; charset=utf-8', 'ok');
  } else if (request.method === 'GET' && url.pathname === '/') {
    send(response, 200, 'text/html; charset=utf-8', homePage);
  } else if (request.method === 'GET' && url.pathname === '/frame') {
    send(response, 200, 'text/html; charset=utf-8', framePage);
  } else if (request.method === 'GET' && url.pathname === '/popup') {
    send(response, 200, 'text/html; charset=utf-8', popupPage);
  } else if (request.method === 'GET' && url.pathname === '/api/greeting') {
    send(response, 200, 'application/json; charset=utf-8', JSON.stringify({
      message: `Hello, ${url.searchParams.get('name') || 'learner'}!`,
    }));
  } else if (request.method === 'POST' && url.pathname === '/api/profile') {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      try {
        const profile = JSON.parse(body);
        if (typeof profile.name !== 'string' || !profile.name.trim()) {
          send(response, 400, 'application/json; charset=utf-8', JSON.stringify({ error: 'name is required' }));
          return;
        }
        send(response, 201, 'application/json; charset=utf-8', JSON.stringify({
          id: 1,
          name: profile.name.trim(),
        }));
      } catch {
        send(response, 400, 'application/json; charset=utf-8', JSON.stringify({ error: 'invalid JSON' }));
      }
    });
  } else {
    send(response, 404, 'text/plain; charset=utf-8', 'Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Playwright demo server listening at http://127.0.0.1:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
