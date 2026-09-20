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
 
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
  var projects = [
    {
      id: 'Capstone project', title: 'CommunityPulse+',
      desc: 'A web-based barangay issue and incident management system that streamlines the reporting, tracking, and management of community concerns.',
      detail: 'Residents report issues and follow their status updates, while barangay personnel manage them from one central platform. Built with a focus on usability, security, reliability, and responsive design, to improve transparency, organization, and response to community concerns.',
      role: 'Project Manager', status: 'In progress', active: true,
      time: 'Oct 2025 – Oct 2026', stack: 'HTML, CSS, JavaScript, PHP, MySQL',
      image: '', art: ['#4A423A', '#241F1B', '#141312', '30%', '20%']
    },
    {
      id: 'Sophomore project', title: 'Sual Municipal Hall Appointment App',
      desc: 'A mobile appointment system with a web-based admin panel for the Municipality of Sual, with email and SMS notifications.',
      detail: 'Enables seamless bookings and efficient management for the municipal hall. I managed the team, and we designed a user-friendly interface and delivered the mobile application on time.',
      role: 'Project Manager', status: 'Delivered on time', active: false,
      time: 'Nov 2024 – Mar 2025', stack: 'XML, Kotlin, MySQL',
      image: '', art: ['#3C4640', '#1E2320', '#121413', '70%', '30%']
    },
    {
      id: 'Freshman project', title: 'LapShowdown',
      desc: 'A website featuring the latest laptops, built to help people find their ideal device.',
      detail: 'Designed with a user-friendly interface that is easy to understand and use. I managed the team, our time, and our resources consistently to deliver the project on time.',
      role: 'Project Manager', status: 'Delivered on time', active: false,
      time: 'Jun 2023 – Oct 2023', stack: 'HTML, CSS, JavaScript',
      image: '', art: ['#4A3B33', '#241C17', '#141110', '50%', '60%']
    }
  ];
 
  function bgStyle(image){
    return image ? "background-image:url('" + image + "')" : '';
  }
 
  // ---------- Carousel ----------
  var track = document.getElementById('carouselTrack');
  var dotsWrap = document.getElementById('carouselDots');
  var current = 0;
 
  function buildCarousel(){
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    projects.forEach(function(p, i){
      var slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML =
        '<div class="slide-art" style="' + bgStyle(p.image) + '"></div>' +
        '<div class="slide-scrim"></div>';
      var artEl = slide.querySelector('.slide-art');
      if (!p.image) {
        artEl.style.background = 'radial-gradient(120% 120% at ' + p.art[3] + ' ' + p.art[4] + ', ' + p.art[0] + ', ' + p.art[1] + ' 55%, ' + p.art[2] + ' 100%)';
      }
      track.appendChild(slide);
 
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ': ' + p.title);
      dot.addEventListener('click', function(){ goTo(i); });
      dotsWrap.appendChild(dot);
    });
    updateCarousel();
  }
 
  function updateCarousel(){
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    Array.from(dotsWrap.children).forEach(function(dot, i){
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }
  function goTo(i){
    current = (i + projects.length) % projects.length;
    updateCarousel();
  }
  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }
 
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);
 
  var carouselEl = document.getElementById('carousel');
  carouselEl.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
 
  // Touch swipe
  var touchStartX = null;
  carouselEl.addEventListener('touchstart', function(e){ touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  carouselEl.addEventListener('touchend', function(e){
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    touchStartX = null;
  }, { passive: true });
 
  var autoplayId = null;
  function startAutoplay(){
    if (reduceMotion) return;
    stopAutoplay();
    autoplayId = setInterval(next, 5000);
  }
  function stopAutoplay(){
    if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
  }
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);
  carouselEl.addEventListener('focusin', stopAutoplay);
  carouselEl.addEventListener('focusout', startAutoplay);
 
  buildCarousel();
  startAutoplay();
 
  var workIndex = document.getElementById('workIndex');
  var previewDots = document.getElementById('previewDots');
  var workCurrent = 0;
 
  function buildWorkSplit(){
    workIndex.innerHTML = '';
    previewDots.innerHTML = '';
    projects.forEach(function(p, i){
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'work-index-item';
      var num = document.createElement('span');
      num.className = 'work-index-num';
      num.textContent = String(i + 1).padStart(2, '0');
      var title = document.createElement('span');
      title.className = 'work-index-title';
      title.textContent = p.title;
      item.appendChild(num);
      item.appendChild(title);
      item.addEventListener('click', function(){ updateWork(i); });
      workIndex.appendChild(item);
 
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'View ' + p.title);
      dot.addEventListener('click', function(){ updateWork(i); });
      previewDots.appendChild(dot);
    });
    updateWork(0);
  }
 
  function updateWork(i){
    workCurrent = i;
    var p = projects[i];
 
    Array.from(workIndex.children).forEach(function(item, idx){
      item.classList.toggle('active', idx === i);
    });
    Array.from(previewDots.children).forEach(function(dot, idx){
      dot.setAttribute('aria-current', idx === i ? 'true' : 'false');
    });
 
    var photo = document.getElementById('previewPhoto');
    var fallback = document.getElementById('previewPhotoFallback');
    photo.style.backgroundImage = p.image ? "url('" + p.image + "')" : 'none';
    fallback.style.background = 'radial-gradient(120% 120% at ' + p.art[3] + ' ' + p.art[4] + ', ' + p.art[0] + ', ' + p.art[1] + ' 55%, ' + p.art[2] + ' 100%)';
    fallback.hidden = !!p.image;
 
    var statusEl = document.getElementById('previewStatus');
    statusEl.classList.toggle('is-active', p.active);
    document.getElementById('previewStatusText').textContent = p.status;
 
    document.getElementById('previewCase').textContent = p.id;
    document.getElementById('previewTitle').textContent = p.title;
    document.getElementById('previewDesc').textContent = p.desc;
    document.getElementById('previewMeta').textContent = p.role + ' \u2014 ' + p.time;
    document.getElementById('previewStack').textContent = 'Built with ' + p.stack;
  }
 
  document.getElementById('previewLink').addEventListener('click', function(e){
    e.preventDefault();
    openPanel(projects[workCurrent]);
  });
 
  buildWorkSplit();
 
  var workAutoplayId = null;
  function startWorkAutoplay(){
    if (reduceMotion) return;
    stopWorkAutoplay();
    workAutoplayId = setInterval(function(){ updateWork((workCurrent + 1) % projects.length); }, 5000);
  }
  function stopWorkAutoplay(){
    if (workAutoplayId) { clearInterval(workAutoplayId); workAutoplayId = null; }
  }
  var workSplitEl = document.querySelector('.work-split');
  workSplitEl.addEventListener('mouseenter', stopWorkAutoplay);
  workSplitEl.addEventListener('mouseleave', startWorkAutoplay);
  workSplitEl.addEventListener('focusin', stopWorkAutoplay);
  workSplitEl.addEventListener('focusout', startWorkAutoplay);
  startWorkAutoplay();
 
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
 
  // ---------- Project detail panel ----------
  var overlay = document.getElementById('overlay');
  var panel = document.getElementById('panel');
  var panelClose = document.getElementById('panelClose');
  var panelArt = document.getElementById('panelArt');
  var panelArtFallback = document.getElementById('panelArtFallback');
 
  function openPanel(p){
    panelArt.style.backgroundImage = p.image ? "url('" + p.image + "')" : 'none';
    panelArtFallback.style.background = 'radial-gradient(120% 120% at ' + p.art[3] + ' ' + p.art[4] + ', ' + p.art[0] + ', ' + p.art[1] + ' 55%, ' + p.art[2] + ' 100%)';
    panelArtFallback.hidden = !!p.image;
    document.getElementById('panelCase').textContent = p.id;
    document.getElementById('panelTitle').textContent = p.title;
    document.getElementById('panelRole').textContent = p.role;
    document.getElementById('panelStatus').textContent = p.status;
    document.getElementById('panelTime').textContent = p.time;
    document.getElementById('panelStack').textContent = p.stack;
    document.getElementById('panelDesc').textContent = p.desc;
    document.getElementById('panelDetail').textContent = p.detail;
    overlay.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    panelClose.focus();
    document.body.style.overflow = 'hidden';
    stopAutoplay();
    stopWorkAutoplay();
  }
  function closePanel(){
    overlay.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    startAutoplay();
    startWorkAutoplay();
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
