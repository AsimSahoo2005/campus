// JS for Post Vacancy page
// Sidebar/topbar toggle and dropdown copied from alumni-dashboard.js
document.addEventListener('DOMContentLoaded', function() {
	// Set profile name and avatar from localStorage
	const topName = document.getElementById('topName');
	const topAvatar = document.getElementById('topAvatar');
	const storedName = localStorage.getItem('alumniName');
	if (storedName) {
		topName.textContent = storedName;
		topAvatar.textContent = storedName.split(' ').map(w => w[0]).join('').toUpperCase();
	}
	// Sidebar toggle
	const menuBtn = document.getElementById('menuBtn');
	const sidebar = document.querySelector('.sidebar');
	const mainArea = document.querySelector('.main-area');
	const topbar = document.querySelector('.topbar');
	menuBtn.addEventListener('click', function() {
		sidebar.classList.toggle('collapsed');
		mainArea.classList.toggle('collapsed');
		topbar.classList.toggle('shifted');
		menuBtn.setAttribute('aria-expanded', sidebar.classList.contains('collapsed') ? 'false' : 'true');
	});

	// Profile dropdown
	const profileTrigger = document.getElementById('profileTrigger');
	const profileMenu = document.getElementById('profileMenu');
	const profile = document.getElementById('topProfile');
	profileTrigger.addEventListener('click', function(e) {
		profile.classList.toggle('open');
		profileMenu.setAttribute('aria-hidden', !profile.classList.contains('open'));
		profileTrigger.setAttribute('aria-expanded', profile.classList.contains('open'));
		e.stopPropagation();
	});
	document.addEventListener('click', function(e) {
		if (!profile.contains(e.target)) {
			profile.classList.remove('open');
			profileMenu.setAttribute('aria-hidden', 'true');
			profileTrigger.setAttribute('aria-expanded', 'false');
		}
	});
});
