// js/nav.js
// Injecte un menu en haut de la page et le personnalise selon la session

(function () {
  const css = `
  .rz-topbar{position:sticky;top:0;z-index:999;backdrop-filter:saturate(140%) blur(8px);
    background:rgba(10,12,22,.55);border-bottom:1px solid rgba(255,255,255,.08)}
  .rz-wrap{max-width:1100px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
  .rz-brand{font-weight:800;letter-spacing:.3px}
  .rz-nav{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
  .rz-link{color:#9aa4c7;text-decoration:none;padding:8px 10px;border-radius:8px;border:1px solid transparent}
  .rz-link:hover{border-color:rgba(255,255,255,.14)}
  .rz-link.active{color:#e9eefc;border-color:rgba(255,255,255,.24);background:rgba(255,255,255,.06)}
  .rz-btn{cursor:pointer;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:#7c9aff;color:#0b0f18;font-weight:700}
  .rz-btn.ghost{background:transparent;color:#e9eefc}
  .rz-user{display:flex;align-items:center;gap:8px}
  .rz-avatar{width:28px;height:28px;border-radius:50%;overflow:hidden;border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;background:#20263b;color:#9aa4c7;font-size:12px}
  @media(max-width:640px){.rz-wrap{gap:8px}.rz-nav{gap:8px}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // construit le HTML du menu (sans état)
  function baseHTML() {
    return `
    <div class="rz-topbar">
      <div class="rz-wrap">
        <div class="rz-brand"><a class="rz-link" href="explore.html">Re:Zero</a></div>
        <nav class="rz-nav" id="rz-nav">
          <a class="rz-link" data-page="index.html" href="index.html">Subaru</a>
          <a class="rz-link" data-page="emilia.html" href="emilia.html">Emilia</a>
          <a class="rz-link" data-page="rem.html" href="rem.html">Rem</a>
          <a class="rz-link" data-page="explore.html" href="explore.html"><b>Explorer</b></a>
          <a class="rz-link" data-page="create.html" href="create.html">Créer</a>
          <span id="rz-auth"></span>
        </nav>
      </div>
    </div>`;
  }

  function setActive() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.rz-link[data-page]').forEach(a => {
      if (a.getAttribute('data-page').toLowerCase() === path) a.classList.add('active');
    });
  }

  async function renderAuth() {
    // sb et helpers viennent de js/config.js
    let html = `
      <a class="rz-link" data-page="login.html" href="login.html">Se connecter</a>
    `;
    try {
      const user = await (window.getUser ? getUser() : null);
      if (user) {
        // profil public si username
        let userHtml = '';
        try {
          const { data: [p] } = await sb.from('profiles').select('username,display_name,avatar_url').eq('id', user.id);
          const name = (p?.display_name || '').trim();
          const uname = (p?.username || '').trim();
          const initials = (name || uname || 'U').slice(0,2).toUpperCase();
          const avatar = p?.avatar_url
            ? `<img src="${p.avatar_url}" alt="${uname||'user'}" style="width:100%;height:100%;object-fit:cover"/>`
            : initials;
          const publicLink = uname ? `<a class="rz-link" href="user.html?u=${encodeURIComponent(uname)}">@${uname}</a>` : '';
          userHtml = `
            <span class="rz-user">
              <span class="rz-avatar">${avatar}</span>
              ${publicLink}
              <a class="rz-link" data-page="account.html" href="account.html"><b>Mon compte</b></a>
              <button class="rz-btn ghost" id="rz-logout">Se déconnecter</button>
            </span>
          `;
        } catch(_) {
          userHtml = `
            <span class="rz-user">
              <span class="rz-avatar">U</span>
              <a class="rz-link" data-page="account.html" href="account.html"><b>Mon compte</b></a>
              <button class="rz-btn ghost" id="rz-logout">Se déconnecter</button>
            </span>
          `;
        }
        html = userHtml;
      }
    } catch (e) {
      // en cas d'erreur, laisser le lien "Se connecter"
    }
    const slot = document.getElementById('rz-auth');
    if (slot) slot.innerHTML = html;
    const lg = document.getElementById('rz-logout');
    if (lg) lg.addEventListener('click', async ()=>{ try { await sb.auth.signOut(); } finally { location.href = 'login.html'; } });
  }

  // Injection: on place la barre tout en haut du body
  const wrap = document.createElement('div');
  wrap.innerHTML = baseHTML();
  document.body.prepend(wrap.firstElementChild);

  setActive();
  renderAuth();
})();
