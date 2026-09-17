(function(){
  document.getElementById('year').textContent = new Date().getFullYear();
 
  // ---------- Mobile nav ----------
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('primaryNav');
  menuBtn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
 
  // ---------- Custom cursor ----------
  var cursor = document.getElementById('cursorDot');
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine) {
    cursor.classList.add('active');
    window.addEventListener('mousemove', function(e){
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .tile').forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursor.classList.add('grow'); });
      el.addEventListener('mouseleave', function(){ cursor.classList.remove('grow'); });
    });
  }
 
  // ---------- Scroll reveal ----------
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in-view'); });
  }
 
  // ---------- Project data ----------
  var projects = [
    {
      id: 'CASE 01', title: 'Ledger Ops Migration',
      desc: 'Ran the six-month migration of a finance team off spreadsheets and onto a proper internal tool.',
      detail: 'Owned the project plan, vendor coordination, and rollout schedule across three departments — scoping, sequencing, and keeping twelve stakeholders aligned on one timeline.',
      role: 'PM', status: 'Shipped', active: false, time: '2024', link: '#', size: 'c-lg',
      art: ['#4A423A', '#241F1B', '#141312', '30%', '20%']
    },
    {
      id: 'CASE 02', title: 'Fieldnotes App Rebuild',
      desc: 'Planned and built the rebuild of a field-research app used by a 40-person research org.',
      detail: 'Wrote the delivery plan and the offline-first sync engine both — one person owning scope and implementation kept the plan honest about what was actually feasible to ship.',
      role: 'PM + Dev', status: 'Shipped', active: false, time: '2024', link: '#', size: 'c-wide',
      art: ['#3C4640', '#1E2320', '#121413', '70%', '30%']
    },
    {
      id: 'CASE 03', title: 'Loom Design System',
      desc: 'A documented component library for a fintech team\u2019s product engineers.',
      detail: 'Consolidated four inconsistent UI kits into one system with accessible defaults, cutting new-feature build time by roughly a third.',
      role: 'Web dev', status: 'Shipped', active: false, time: '2023', link: '#', size: 'c-sm',
      art: ['#4A3B33', '#241C17', '#141110', '50%', '60%']
    },
    {
      id: 'CASE 04', title: 'Vendor Onboarding Portal',
      desc: 'Replacing a six-step email chain with one form and a real status tracker.',
      detail: 'Currently mid-build: I set the milestone plan and I\u2019m coordinating a two-person dev team against it while running weekly stakeholder check-ins.',
      role: 'PM', status: 'Active', active: true, time: '2025', link: '#', size: 'c-sm',
      art: ['#37414A', '#1B2126', '#111315', '40%', '40%']
    },
    {
      id: 'CASE 05', title: 'Internal Sprint Dashboard',
      desc: 'A lightweight dashboard that turns raw ticket data into a real burn-down chart.',
      detail: 'Built for my own use first — pulling from our tracker\u2019s API to answer the one question every sprint review needs: are we actually on pace.',
      role: 'Web dev', status: 'Active', active: true, time: '2025', link: '#', size: 'c-wide',
      art: ['#463A44', '#231C26', '#131015', '60%', '25%']
    },
    {
      id: 'CASE 06', title: 'Nonprofit Site Relaunch',
      desc: 'A full site relaunch for a nonprofit on a fixed, grant-funded timeline.',
      detail: 'The budget and deadline were both hard constraints. I built the plan around what was truly necessary for launch, then wrote the site myself to make sure nothing slipped.',
      role: 'PM + Dev', status: 'Shipped', active: false, time: '2022', link: '#', size: 'c-wide',
      art: ['#414A3B', '#20261D', '#121511', '35%', '50%']
    }
  ];
 
  var grid = document.getElementById('bentoGrid');
  function render(){
    grid.innerHTML = '';
    projects.forEach(function(p){
      var tile = document.createElement('button');
      tile.className = 'tile ' + p.size;
      tile.type = 'button';
      tile.setAttribute('aria-label', 'View case study: ' + p.title);
      tile.innerHTML =
        '<span class="tile-art" style="--c1:' + p.art[0] + ';--c2:' + p.art[1] + ';--c3:' + p.art[2] + ';--px:' + p.art[3] + ';--py:' + p.art[4] + '"></span>' +
        '<span class="tile-case">' + p.id + '</span>' +
        '<span class="tile-status' + (p.active ? ' is-active' : '') + '"><span class="dot"></span>' + p.status + '</span>' +
        '<span class="tile-info"><span class="tile-title">' + p.title + '</span><span class="tile-tags">' + p.role + ' \u2014 ' + p.time + '</span></span>';
      tile.addEventListener('click', function(){ openPanel(p); });
      grid.appendChild(tile);
    });
    if (fine) {
      grid.querySelectorAll('.tile').forEach(function(el){
        el.addEventListener('mouseenter', function(){ cursor.classList.add('grow'); });
        el.addEventListener('mouseleave', function(){ cursor.classList.remove('grow'); });
      });
    }
  }
  render();
 
  // ---------- Case study panel ----------
  var overlay = document.getElementById('overlay');
  var panel = document.getElementById('panel');
  var panelClose = document.getElementById('panelClose');
  var panelArt = document.getElementById('panelArt');
 
  function openPanel(p){
    panelArt.style.setProperty('--c1', p.art[0]);
    panelArt.style.setProperty('--c2', p.art[1]);
    panelArt.style.setProperty('--c3', p.art[2]);
    panelArt.style.setProperty('--px', p.art[3]);
    panelArt.style.setProperty('--py', p.art[4]);
    document.getElementById('panelCase').textContent = p.id;
    document.getElementById('panelTitle').textContent = p.title;
    document.getElementById('panelRole').textContent = p.role;
    document.getElementById('panelStatus').textContent = p.status;
    document.getElementById('panelTime').textContent = p.time;
    document.getElementById('panelDesc').textContent = p.desc;
    document.getElementById('panelDetail').textContent = p.detail;
    document.getElementById('panelLink').href = p.link;
    overlay.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    panelClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closePanel(){
    overlay.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', closePanel);
  panelClose.addEventListener('click', closePanel);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePanel(); });
 
  // ---------- Copy email ----------
  var emailLink = document.getElementById('emailLink');
  var toast = document.getElementById('copyToast');
  emailLink.addEventListener('click', function(e){
    if (navigator.clipboard) {
      e.preventDefault();
      navigator.clipboard.writeText('angelocapara@gmail.com').then(function(){
        toast.classList.add('show');
        setTimeout(function(){ toast.classList.remove('show'); }, 2000);
        setTimeout(function(){ window.location.href = 'mailto:angelocapara@gmail.com'; }, 250);
      }).catch(function(){
        window.location.href = 'mailto:angelocapara@gmail.com';
      });
    }
  });
})();
