// JS for Mentorship Inbox page
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

// Chat functionality for mentorship inbox
const chatData = {
  'Chakrabiswaranjan123': [
    { sender: 'other', text: "Hi Jane! I'm really interested in software engineering and saw your profile. I'd love to hear about your experience at Google." },
    { sender: 'self', text: "Of course! It's been a great journey. I'm happy to share any insights. Do you have any specific questions?" }
  ],
  'Alex Johnson': [
    { sender: 'other', text: "That would be amazing, thank you!" }
  ],
  'Samantha Lee': [
    { sender: 'other', text: "Hi! I was wondering if you had any tips..." }
  ]
};

let currentUser = 'Chakrabiswaranjan123';

function renderChat(user) {
  const chatHeader = document.querySelector('.chat-header .chat-user');
  chatHeader.innerHTML = `${user} <span class=\"online-dot\"></span>`;
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.innerHTML = '';
  chatData[user].forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + msg.sender;
    div.textContent = msg.text;
    chatMessages.appendChild(div);
  });
}

function selectUser(e) {
  const li = e.currentTarget;
  document.querySelectorAll('.message').forEach(m => m.classList.remove('active'));
  li.classList.add('active');
  currentUser = li.querySelector('.msg-name').textContent;
  renderChat(currentUser);
}

document.querySelectorAll('.message').forEach(li => {
  li.addEventListener('click', selectUser);
});

renderChat(currentUser);

// Send message
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.chat-input .send-btn');
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatData[currentUser].push({ sender: 'self', text });
  renderChat(currentUser);
  chatInput.value = '';
  // Simulate incoming reply after 1s
  setTimeout(() => {
    chatData[currentUser].push({ sender: 'other', text: 'Thanks for your message!' });
    renderChat(currentUser);
  }, 1000);
}
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// Request tab functionality
const requestData = [
  {
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    preview: 'Hi! I would love to connect for mentorship.',
    time: 'Just now',
    badge: 1
  },
  {
    name: 'Rahul Verma',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    preview: 'Can you help me with interview prep?',
    time: '5 min ago',
    badge: 2
  }
];

const inboxTab = document.querySelectorAll('.inbox-tabs .tab')[0];
const requestTab = document.querySelectorAll('.inbox-tabs .tab')[1];
const messagesList = document.querySelector('.messages');

function renderInbox() {
  // Clear and re-render inbox messages from chatData
  messagesList.innerHTML = '';
  Object.keys(chatData).forEach((user, idx) => {
    const lastMsg = chatData[user][chatData[user].length - 1];
    const li = document.createElement('li');
    li.className = 'message' + (user === currentUser ? ' active' : '');
    // Use initials if no avatar
    let avatarHtml = '';
    if (user === 'Chakrabiswaranjan123') {
      avatarHtml = '<div class="avatar">CH</div>';
    } else if (user === 'Alex Johnson') {
      avatarHtml = '<img class="avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Johnson" />';
    } else if (user === 'Samantha Lee') {
      avatarHtml = '<img class="avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Samantha Lee" />';
    } else {
      avatarHtml = `<img class=\"avatar\" src=\"https://ui-avatars.com/api/?name=${encodeURIComponent(user)}\" alt=\"${user}\" />`;
    }
    li.innerHTML = `
      ${avatarHtml}
      <div class="msg-info">
        <div class="msg-name">${user}</div>
        <div class="msg-preview">${lastMsg.text}</div>
      </div>
      <div class="msg-time">${lastMsg.time || ''}</div>
    `;
    li.addEventListener('click', selectUser);
    messagesList.appendChild(li);
  });
}

function renderRequests() {
  messagesList.innerHTML = '';
  requestData.forEach((req, idx) => {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `
      <img class="avatar" src="${req.avatar}" alt="${req.name}" />
      <div class="msg-info">
        <div class="msg-name">${req.name}</div>
        <div class="msg-preview">${req.preview}</div>
      </div>
      <div class="msg-time">${req.time}</div>
      <span class="msg-badge">${req.badge}</span>
    `;
    // Show chat on click
    li.addEventListener('click', function() {
      renderRequestChat(req, idx);
      document.querySelectorAll('.message').forEach(m => m.classList.remove('active'));
      li.classList.add('active');
    });
    messagesList.appendChild(li);
  });
}

function renderRequestChat(req, idx) {
  // Show request chat area
  const chatHeader = document.querySelector('.chat-header .chat-user');
  chatHeader.innerHTML = `${req.name} <span class=\"online-dot\"></span>`;
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'chat-msg other';
  div.textContent = req.preview;
  chatMessages.appendChild(div);
  // Add accept/delete actions below chat
  let actions = document.querySelector('.chat-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'chat-actions';
    document.querySelector('.chat-area').appendChild(actions);
  }
  actions.innerHTML = `
    <button class="accept-btn">Talk</button>
    <button class="delete-btn">Delete</button>
  `;
  actions.style.display = 'flex';
  actions.querySelector('.accept-btn').onclick = function() {
    if (!chatData[req.name]) chatData[req.name] = [];
    chatData[req.name].push({ sender: 'other', text: req.preview });
    requestData.splice(idx, 1);
    actions.style.display = 'none';
    renderRequests();
    inboxTab.classList.add('active');
    requestTab.classList.remove('active');
    renderInbox();
    setTimeout(() => {
      document.querySelectorAll('.message').forEach(m => {
        if (m.querySelector('.msg-name').textContent === req.name) {
          m.click();
        }
      });
    }, 100);
  };
  actions.querySelector('.delete-btn').onclick = function() {
    requestData.splice(idx, 1);
    actions.style.display = 'none';
    renderRequests();
    // Optionally clear chat area
    chatHeader.innerHTML = '';
    chatMessages.innerHTML = '';
  };
}

// Hide actions by default when switching tabs
requestTab.addEventListener('click', function() {
  let actions = document.querySelector('.chat-actions');
  if (actions) actions.style.display = 'none';
});
inboxTab.addEventListener('click', function() {
  let actions = document.querySelector('.chat-actions');
  if (actions) actions.style.display = 'none';
});

// Initial render
renderInbox();

// Fix: Tab switching logic
inboxTab.addEventListener('click', function() {
  inboxTab.classList.add('active');
  requestTab.classList.remove('active');
  renderInbox();
  let actions = document.querySelector('.chat-actions');
  if (actions) actions.style.display = 'none';
});

requestTab.addEventListener('click', function() {
  requestTab.classList.add('active');
  inboxTab.classList.remove('active');
  renderRequests();
  let actions = document.querySelector('.chat-actions');
  if (actions) actions.style.display = 'none';
});
