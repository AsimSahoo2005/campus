// alumni.js
// Handles alumni-specific localStorage and dashboard logic

function logoutAlumni() {
  localStorage.removeItem('alumni_profile');
  window.location.href = 'welcome.html';
}

// Populate alumni profile in header (if present)
(function(){
  const STORAGE_KEY = 'alumni_profile';
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try{
    const p = JSON.parse(raw);
    const nameEl = document.querySelector('.user-name');
    const avatarEl = document.querySelector('.user-avatar');
    if(nameEl) nameEl.textContent = p.name || 'Alumni';
    if(avatarEl) {
      avatarEl.textContent = (p.name||'').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase() || 'AL';
    }
  }catch(e){ console.error(e) }
})();
