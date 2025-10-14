// App.js demo - chat and sellers
const initialProducts = [
  {title:"Casque Bluetooth - AliExpress", price:"$11.77", link:"https://a.aliexpress.com/_mKANNo9"},
  {title:"Montre D18 Smartwatch", price:"$7.35", link:"https://a.aliexpress.com/_mLjVhg9"},
  {title:"Lacoste Sneaker", price:"$49.99", link:"https://www.amazon.com/dp/B0DV6HSH9V/?tag=66e21-20"}
];
let state = JSON.parse(localStorage.getItem('jeoahs_state')||'{}');
if(!state.products){ state.products = initialProducts; localStorage.setItem('jeoahs_state', JSON.stringify(state)); }
function renderProducts(){
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  state.products.forEach(p=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<h3>${p.title}</h3><p class="small">${p.price}</p><p><a class="btn" href="${p.link}" target="_blank">Voir</a></p>`;
    grid.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts();
  document.getElementById('register-seller').addEventListener('click', ()=>{
    const name = document.getElementById('seller-name').value.trim();
    const email = document.getElementById('seller-email').value.trim();
    const affiliates = document.getElementById('seller-affiliates').value.trim();
    const feedback = document.getElementById('seller-feedback');
    if(!name || !email){ feedback.innerText = 'Nom et email requis'; return; }
    const sellers = JSON.parse(localStorage.getItem('jeoahs_sellers')||'[]');
    sellers.push({name,email,affiliates:affiliates.split('\n').map(s=>s.trim()).filter(Boolean),created:Date.now()});
    localStorage.setItem('jeoahs_sellers', JSON.stringify(sellers));
    feedback.innerText = 'Inscription enregistrée (demo). Ney préparera la fiche produit.';
  });
  const chat = document.getElementById('chat-ney'); const body = document.getElementById('chat-body');
  const input = document.getElementById('chat-msg'); const send = document.getElementById('send-chat');
  if(chat){ chat.addEventListener('click', ()=> { chat.classList.remove('closed'); }); }
  if(send){ send.addEventListener('click', ()=>{
    const q = input.value.trim(); if(!q) return;
    const p = document.createElement('div'); p.innerHTML = '<strong>Vous:</strong> '+q; body.appendChild(p);
    input.value='';
    setTimeout(()=>{ const r = document.createElement('div'); r.innerHTML = '<strong>Ney:</strong> Merci ! Je prépare une pub et une fiche produit (demo).'; body.appendChild(r); body.scrollTop = body.scrollHeight; }, 700);
  }); }
  // PWA install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e)=>{ e.preventDefault(); deferredPrompt = e; const btn = document.getElementById('installBtn'); if(btn){ btn.style.display='inline-block'; btn.addEventListener('click', async ()=>{ deferredPrompt.prompt(); const choice = await deferredPrompt.userChoice; deferredPrompt = null; btn.style.display='none'; }); } });
});
