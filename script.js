// Navegação: destaca a página realmente aberta e mantém os links entre páginas.
const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.navlinks a').forEach(link => {
  const target = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
  const active = target === currentPage || (!target && currentPage === 'index.html');
  link.classList.toggle('active', active);
  if (active) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
});

const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.navlinks');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Abrir menu');
  }));
}

if ('IntersectionObserver' in window) {
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

// Slideshow da imagem principal: troca automática, fade e seleção manual.
const hero=document.querySelector('.hero-slides');
if(hero){
  const slides=[...hero.querySelectorAll('.hero-slide')];
  const dots=[...document.querySelectorAll('.hero-pagination .hero-dot')];
  let current=0, timer;
  const show=index=>{
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
    dots.forEach((dot,i)=>{
      dot.classList.toggle('is-active',i===current);
      dot.setAttribute('aria-pressed',String(i===current));
    });
  };
  const start=()=>{clearInterval(timer);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(current+1),5500);};
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();}));
  hero.addEventListener('mouseenter',()=>clearInterval(timer));
  hero.addEventListener('mouseleave',start);
  document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):start());
  start();
}

// Galeria de projetos da página inicial.
const carousel=document.querySelector('.project-carousel');
if(carousel){
  const slides=[...carousel.querySelectorAll('.project-slide')];
  const dots=[...carousel.querySelectorAll('.project-dot')];
  let current=0,timer;
  const show=index=>{
    current=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('is-active',i===current));
    dots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===current);dot.setAttribute('aria-pressed',String(i===current));});
  };
  const start=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),6000);};
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>{show(i);start();}));
  carousel.querySelector('.project-prev')?.addEventListener('click',()=>{show(current-1);start();});
  carousel.querySelector('.project-next')?.addEventListener('click',()=>{show(current+1);start();});
  carousel.addEventListener('mouseenter',()=>clearInterval(timer));
  carousel.addEventListener('mouseleave',start);
  document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):start());
  start();
}
