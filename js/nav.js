// js/nav.js - Navigation dynamique améliorée
(function () {
  // Style du menu amélioré
  const css = `
  .rz-topbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
    backdrop-filter: saturate(180%) blur(20px);
    background: linear-gradient(135deg, rgba(10, 12, 22, 0.92) 0%, rgba(26, 30, 46, 0.95) 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }

  .rz-topbar.scrolled {
    background: linear-gradient(135deg, rgba(10, 12, 22, 0.98) 0%, rgba(26, 30, 46, 0.98) 100%);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
  }

  .rz-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .rz-brand {
    font-family: 'Cinzel', serif;
    font-weight: 800;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #ff6b6b 0%, #8a67ff 50%, #64b5f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rz-brand:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  .rz-nav {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }

  .rz-link {
    color: #9aa4c7;
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid transparent;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .rz-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .rz-link:hover::before {
    left: 100%;
  }

  .rz-link:hover {
    color: #e9eefc;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .rz-link.active {
    color: #e9eefc;
    border-color: rgba(124, 154, 255, 0.4);
    background: linear-gradient(135deg, rgba(124, 154, 255, 0.15), rgba(138, 103, 255, 0.1));
    box-shadow: 0 4px 15px rgba(124, 154, 255, 0.3);
  }

  .rz-btn {
    cursor: pointer;
    padding: 10px 18px;
    border-radius: 10px;
    border: 1px solid rgba(124, 154, 255, 0.4);
    background: linear-gradient(135deg, #7c9aff 0%, #8a67ff 100%);
    color: #0b0f18;
    font-weight: 700;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(124, 154, 255, 0.3);
  }

  .rz-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(124, 154, 255, 0.5);
    background: linear-gradient(135deg, #8a67ff 0%, #7c9aff 100%);
  }

  .rz-btn.ghost {
    background: transparent;
    color: #e9eefc;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: none;
  }

  .rz-btn.ghost:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .rz-user {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rz-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(124, 154, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #20263b 0%, #1a1f35 100%);
    color: #9aa4c7;
    font-size: 13px;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  .rz-avatar:hover {
    transform: scale(1.1);
    border-color: rgba(124, 154, 255, 0.8);
    box-shadow: 0 4px 15px rgba(124, 154, 255, 0.4);
  }

  .rz-mobile-toggle {
    display: none;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #e9eefc;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .rz-wrap {
      padding: 12px 16px;
    }

    .rz-brand {
      font-size: 1.3rem;
    }

    .rz-mobile-toggle {
      display: block;
    }

    .rz-nav {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, rgba(10, 12, 22, 0.98) 0%, rgba(26, 30, 46, 0.98) 100%);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 20px;
      gap: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .rz-nav.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    .rz-link, .rz-btn {
      width: 100%;
      text-align: center;
    }

    .rz-user {
      width: 100%;
      flex-direction: column;
    }
  }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // HTML de la barre
  function baseHTML() {
    return `
    <div class="rz-topbar">
      <div class="rz-wrap">
        <div class="rz-brand">
          <a class="rz-link" href="explore.html" style="padding: 0; border: none;">Re:Zero</a>
        </div>
        <button class="rz-mobile-toggle" id="mobile-toggle">☰</button>
        <nav class="rz-nav" id="main-nav">
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

  // Surligner la page courante
  function setActive() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.rz-link[data-page]').forEach(a => {
      if (a.getAttribute('data-page').toLowerCase() === path) {
        a.classList.add('active');
      }
    });
  }

  // État connecté/déconnecté
  async function renderAuth() {
    let html = `<a class="rz-link" data-page="login.html" href="login.html">Se connecter</a>`;
    try {
      const user = await (window.getUser ? getUser() : null);
      if (user) {
        let userHtml = '';
        try {
          const { data: [p] } = await sb.from('profiles').select('username,display_name,avatar_url').eq('id', user.id);
          const name = (p?.display_name || '').trim();
          const uname = (p?.username || '').trim();
          const initials = (name || uname || 'U').slice(0, 2).toUpperCase();
          const avatar = p?.avatar_url
            ? `<img src="${p.avatar_url}" alt="${uname || 'user'}" style="width:100%;height:100%;object-fit:cover"/>`
            : initials;
          const publicLink = uname ? `<a class="rz-link" href="user.html?u=${encodeURIComponent(uname)}">@${uname}</a>` : '';
          userHtml = `
            <span class="rz-user">
              <span class="rz-avatar">${avatar}</span>
              ${publicLink}
              <a class="rz-link" data-page="account.html" href="account.html"><b>Mon compte</b></a>
              <button class="rz-btn ghost" id="rz-logout">Déconnexion</button>
            </span>
          `;
        } catch (_) {
          userHtml = `
            <span class="rz-user">
              <span class="rz-avatar">U</span>
              <a class="rz-link" data-page="account.html" href="account.html"><b>Mon compte</b></a>
              <button class="rz-btn ghost" id="rz-logout">Déconnexion</button>
            </span>
          `;
        }
        html = userHtml;
      }
    } catch (e) {}
    const slot = document.getElementById('rz-auth');
    if (slot) slot.innerHTML = html;
    const lg = document.getElementById('rz-logout');
    if (lg) lg.addEventListener('click', async () => {
      try { await sb.auth.signOut(); } finally { location.href = 'login.html'; }
    });
  }

  // Injecter la nouvelle barre
  const host = document.createElement('div');
  host.innerHTML = baseHTML();
  document.body.prepend(host.firstElementChild);

  // Masquer l'ancienne barre
  const old = document.querySelector('.nav');
  if (old) old.style.setProperty('display', 'none', 'important');

  // Menu mobile toggle
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Effet scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const topbar = document.querySelector('.rz-topbar');
    if (window.scrollY > 50) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  });

  // Ajuster le padding du body
  document.body.style.paddingTop = '70px';

  setActive();
  renderAuth();
})();