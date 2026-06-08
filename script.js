// ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ── PROJECT IMAGE UPLOAD ──
  function setProjectImage(input, containerId) {
    if (!input.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const container = document.getElementById(containerId);
      container.innerHTML = `<img src="${e.target.result}" alt="Project screenshot" />`;
    };
    reader.readAsDataURL(input.files[0]);
  }

  // ── ADD PROJECT MODAL ──
  function openModal() { document.getElementById('project-modal').classList.add('active'); }
  function closeModal() { document.getElementById('project-modal').classList.remove('active'); }

  let projectCount = 3;

  function addProject() {
    const name = document.getElementById('new-proj-name').value.trim();
    const desc = document.getElementById('new-proj-desc').value.trim();
    const tagsRaw = document.getElementById('new-proj-tags').value.trim();
    const github = document.getElementById('new-proj-github').value.trim();
    const live = document.getElementById('new-proj-live').value.trim();

    if (!name) { alert('Please enter a project name.'); return; }

    projectCount++;
    const imgId = `proj-img-${projectCount}`;
    const fileId = `file-proj-${projectCount}`;

    const tags = tagsRaw
      ? tagsRaw.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')
      : '';

    const card = document.createElement('div');
    card.className = 'project-card fade-up';
    card.innerHTML = `
      <div class="project-img-area" id="${imgId}">
        <div class="project-img-placeholder" onclick="document.getElementById('${fileId}').click()">
          <div class="upload-icon">＋</div>
          <span>add project screenshot</span>
        </div>
        <input type="file" id="${fileId}" class="project-img-input" accept="image/*"
          onchange="setProjectImage(this, '${imgId}')"/>
      </div>
      <div class="project-body">
        <div class="project-tags">${tags}</div>
        <h3 class="project-name">${name}</h3>
        <p class="project-desc">${desc || 'No description provided.'}</p>
        <div class="project-links">
          ${github ? `<a href="${github}" class="project-link" target="_blank">⬡ GitHub</a>` : ''}
          ${live ? `<a href="${live}" class="project-link" target="_blank">↗ Live</a>` : ''}
        </div>
      </div>
    `;

    const grid = document.getElementById('projects-grid');
    const addBtn = grid.lastElementChild;
    grid.insertBefore(card, addBtn);
    observer.observe(card);
    setTimeout(() => card.classList.add('visible'), 50);

    // Reset form
    ['new-proj-name','new-proj-desc','new-proj-tags','new-proj-github','new-proj-live']
      .forEach(id => document.getElementById(id).value = '');

    closeModal();
  }

  // Close modal on overlay click
  document.getElementById('project-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // ── CONTACT FORM ──
  function handleContact(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = 'Sent ✓';
    btn.style.background = '#fff';
    btn.style.opacity = '0.7';
    btn.disabled = true;
  }

  // ── HAMBURGER MENU ──
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}
 
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}