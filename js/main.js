// Mobile navigation menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });

    

    // Reading progress bar
    const progress = document.getElementById('progress');
    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    // Highlight the nav link of the section being viewed
    const navAnchors = document.querySelectorAll('.nav-links a');
    function setActive() {
      let current = 'home';
      document.querySelectorAll('main section[id], #certification').forEach(function (sec) {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.35) current = sec.id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      navAnchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    }
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    // Copy email address
    const copyBtn = document.getElementById('copyEmail');
    copyBtn.addEventListener('click', function () {
      const email = 'prajwalmusale22@gmail.com';
      const done = function () {
        copyBtn.textContent = 'Copied ✓';
        setTimeout(function () { copyBtn.textContent = 'Copy Email'; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () { window.prompt('Copy this email:', email); });
      } else {
        window.prompt('Copy this email:', email);
      }
    });


    // Theme switcher (Blueprint / Nebula), remembered between visits
    const themeBtn = document.getElementById('themeBtn');
    const themeLabel = document.getElementById('themeLabel');
    function showTheme() {
      const coral = document.documentElement.getAttribute('data-theme') === 'coral';
      themeLabel.textContent = coral ? 'Aurora' : 'Coral';
      themeBtn.setAttribute('aria-label', 'Switch to the ' + themeLabel.textContent + ' theme');
    }
    themeBtn.addEventListener('click', function () {
      const coral = document.documentElement.getAttribute('data-theme') === 'coral';
      if (coral) { document.documentElement.removeAttribute('data-theme'); } else { document.documentElement.setAttribute('data-theme', 'coral'); }
      try { localStorage.setItem('theme', coral ? 'blueprint' : 'coral'); } catch (e) {}
      showTheme();
    });
    showTheme();

    // Update the copyright year automatically.
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== Aurora motion layer =====
    (function () {
      var RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
      var tp = document.getElementById('typed');
      if (!RM) {
        document.documentElement.classList.add('js');
        // Typing headline cycling through roles
        var roles = ['Computer Engineering Student', 'Aspiring Software Developer', 'AI & Web Technology Enthusiast'], ri = 0, ci = 0, del = false;
        (function tick() {
          var w = roles[ri], d = del ? 35 : 70;
          ci += del ? -1 : 1; tp.textContent = w.slice(0, ci);
          if (!del && ci === w.length) { del = true; d = 1700; } else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; d = 350; }
          setTimeout(tick, d);
        })();
        // Staggered blur-in reveal on scroll
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 });
        document.querySelectorAll('.hero-grid > *, .section-heading, .about-grid > *, .skill-card, .project-card, .two-col > *, .contact-grid > *').forEach(function (el) {
          el.classList.add('rv');
          el.style.setProperty('--d', (Array.prototype.indexOf.call(el.parentNode.children, el) * 0.09) + 's');
          io.observe(el);
        });
      }
      // Cursor spotlight + 3D tilt on cards
      document.querySelectorAll('.skill-card,.project-card,.info-card,.goal-box,.contact-form').forEach(function (c) {
        c.classList.add('spot');
        c.addEventListener('pointermove', function (e) {
          var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
          c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
          if (!RM && c.classList.contains('project-card')) { c.style.setProperty('--ry', ((x / r.width - .5) * 9) + 'deg'); c.style.setProperty('--rx', (-(y / r.height - .5) * 9) + 'deg'); }
        });
        c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
      });
      if (RM) return;
      // Glow orb that follows the pointer
      var orb = document.getElementById('orb'), ox = innerWidth / 2, oy = innerHeight / 3, tx = ox, ty = oy;
      addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
      // Neural-network particle field
      var cv = document.getElementById('ai-bg'), g = cv.getContext('2d'), W, H, P = [], m = { x: -999, y: -999 };
      function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; var n = Math.min(80, Math.floor(W / 16)); P = []; for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }); }
      size(); addEventListener('resize', size);
      addEventListener('pointermove', function (e) { m.x = e.clientX; m.y = e.clientY; }, { passive: true });
      (function frame() {
        ox += (tx - ox) * .08; oy += (ty - oy) * .08; orb.style.transform = 'translate(' + ox + 'px,' + oy + 'px)';
        g.clearRect(0, 0, W, H);
        for (var i = 0; i < P.length; i++) {
          var a = P[i]; a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
          var dm = Math.hypot(a.x - m.x, a.y - m.y);
          if (dm < 170) { g.strokeStyle = 'rgba(167,139,250,' + (1 - dm / 170) * .6 + ')'; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(m.x, m.y); g.stroke(); a.x += (m.x - a.x) * .004; a.y += (m.y - a.y) * .004; }
          for (var j = i + 1; j < P.length; j++) {
            var b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 125) { g.strokeStyle = 'rgba(103,232,249,' + (1 - d / 125) * .28 + ')'; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
          }
          g.fillStyle = i % 3 ? 'rgba(103,232,249,.85)' : 'rgba(167,139,250,.85)'; g.beginPath(); g.arc(a.x, a.y, 1.6, 0, 6.283); g.fill();
        }
        requestAnimationFrame(frame);
      })();
    })();
  
// ===== Live GitHub repos =====
(function(){
  var box=document.getElementById('repos'); if(!box) return;
  fetch('https://api.github.com/users/prajwalmusale22-star/repos?sort=updated&per_page=6')
    .then(function(r){return r.ok?r.json():Promise.reject();})
    .then(function(list){
      list=list.filter(function(r){return !r.fork;});
      if(!list.length){box.innerHTML='<p class="repo-msg">No public repositories yet. Push a project and it will show up here automatically.</p>';return;}
      box.innerHTML=list.map(function(r){
        var d=(r.description||'No description yet.').replace(/</g,'&lt;');
        return '<a class="repo spot" href="'+r.html_url+'" target="_blank" rel="noopener"><h3>'+r.name+'</h3><p>'+d+'</p><small>'+(r.language||'Code')+' &nbsp;★ '+r.stargazers_count+'</small></a>';
      }).join('');
    }).catch(function(){box.innerHTML='<p class="repo-msg">Could not load repositories right now. <a class="text-link" href="https://github.com/prajwalmusale22-star?tab=repositories" target="_blank" rel="noopener">Open GitHub</a></p>';});
})();
// Press "/" to jump to contact
addEventListener('keydown',function(e){if(e.key==='/'&&!/input|textarea/i.test(e.target.tagName)){e.preventDefault();document.getElementById('contact').scrollIntoView({behavior:'smooth'});}});