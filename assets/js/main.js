// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const storiesGrid = document.getElementById('storiesGrid');
const challengesGrid = document.getElementById('challengesGrid');
const campaignsGrid = document.getElementById('campaignsGrid');
const skillsGrid = document.getElementById('skillsGrid');
const itemsGrid = document.getElementById('itemsGrid');
const requestsGrid = document.getElementById('requestsGrid');
const burnWallGrid = document.getElementById('burnWallGrid');
const leaderboardTable = document.getElementById('leaderboardTable');
const eventsGrid = document.getElementById('eventsGrid');

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = () => auth.signOut();
        loadUserData(user.uid);
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => {
            // Redirect to login page or show login modal
            window.location.href = '#'; // Replace with your login logic
        };
    }
});

// Load user data
function loadUserData(uid) {
    db.collection('users').doc(uid).get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            // Update profile page with user data
            if (document.getElementById('profileUsername')) {
                document.getElementById('profileUsername').textContent = userData.username || 'Guest';
                document.getElementById('profileBio').textContent = userData.bio || 'Share your bio here.';
                document.getElementById('profileBackBalance').textContent = userData.backBalance || 0;
                document.getElementById('profileBadgesCount').textContent = userData.badges ? userData.badges.length : 0;
                document.getElementById('profileStoriesCount').textContent = userData.stories ? userData.stories.length : 0;
            }
        }
    });
}

// Load stories
function loadStories() {
    db.collection('stories').get().then((querySnapshot) => {
        storiesGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const story = doc.data();
            const storyCard = document.createElement('div');
            storyCard.className = 'col-md-4 mb-4';
            storyCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${story.title}</h5>
                        <p class="card-text">${story.description.substring(0, 100)}...</p>
                        <p class="card-text"><small class="text-muted">By ${story.author} | ${story.category}</small></p>
                        <a href="#" class="btn btn-sm btn-outline-primary">Read More</a>
                    </div>
                </div>
            `;
            storiesGrid.appendChild(storyCard);
        });
    });
}

// Load challenges
function loadChallenges() {
    db.collection('challenges').get().then((querySnapshot) => {
        challengesGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const challenge = doc.data();
            const challengeCard = document.createElement('div');
            challengeCard.className = 'col-md-4 mb-4';
            challengeCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${challenge.title}</h5>
                        <p class="card-text">${challenge.description}</p>
                        <p class="card-text"><strong>Reward:</strong> ${challenge.reward} BACK + ${challenge.badge}</p>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#joinChallengeModal" data-challenge-id="${doc.id}">Join Challenge</button>
                    </div>
                </div>
            `;
            challengesGrid.appendChild(challengeCard);
        });
    });
}

// Load campaigns
function loadCampaigns() {
    db.collection('campaigns').get().then((querySnapshot) => {
        campaignsGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const campaign = doc.data();
            const campaignCard = document.createElement('div');
            campaignCard.className = 'col-md-4 mb-4';
            campaignCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${campaign.title}</h5>
                        <p class="card-text">${campaign.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>Goal:</strong> ${campaign.goal} BACK</p>
                        <p class="card-text"><strong>Raised:</strong> ${campaign.raised || 0} BACK</p>
                        <p class="card-text"><small class="text-muted">By ${campaign.creator} | ${campaign.category}</small></p>
                        <a href="#" class="btn btn-sm btn-outline-primary">Donate</a>
                    </div>
                </div>
            `;
            campaignsGrid.appendChild(campaignCard);
        });
    });
}

// Load skills
function loadSkills() {
    db.collection('skills').get().then((querySnapshot) => {
        skillsGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const skill = doc.data();
            const skillCard = document.createElement('div');
            skillCard.className = 'col-md-4 mb-4';
            skillCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${skill.title}</h5>
                        <p class="card-text">${skill.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>Cost:</strong> ${skill.cost} BACK</p>
                        <p class="card-text"><small class="text-muted">By ${skill.creator} | ${skill.category}</small></p>
                        <a href="#" class="btn btn-sm btn-outline-primary">Contact</a>
                    </div>
                </div>
            `;
            skillsGrid.appendChild(skillCard);
        });
    });
}

// Load items
function loadItems() {
    db.collection('items').get().then((querySnapshot) => {
        itemsGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const itemCard = document.createElement('div');
            itemCard.className = 'col-md-4 mb-4';
            itemCard.innerHTML = `
                <div class="card h-100">
                    <img src="${item.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>Price:</strong> ${item.price} BACK</p>
                        <p class="card-text"><small class="text-muted">By ${item.creator} | ${item.category}</small></p>
                        <a href="#" class="btn btn-sm btn-outline-primary">Contact</a>
                    </div>
                </div>
            `;
            itemsGrid.appendChild(itemCard);
        });
    });
}

// Load requests
function loadRequests() {
    db.collection('requests').get().then((querySnapshot) => {
        requestsGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const request = doc.data();
            const requestCard = document.createElement('div');
            requestCard.className = 'col-md-4 mb-4';
            requestCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${request.title}</h5>
                        <p class="card-text">${request.description.substring(0, 100)}...</p>
                        <p class="card-text"><strong>Goal:</strong> ${request.goal} BACK</p>
                        <p class="card-text"><strong>Raised:</strong> ${request.raised || 0} BACK</p>
                        <p class="card-text"><small class="text-muted">By ${request.creator} | ${request.category}</small></p>
                        <a href="#" class="btn btn-sm btn-outline-primary">Donate</a>
                    </div>
                </div>
            `;
            requestsGrid.appendChild(requestCard);
        });
    });
}

// Load burn wall messages
function loadBurnWall() {
    db.collection('burns').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
        burnWallGrid.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const burn = doc.data();
            const burnCard = document.createElement('div');
            burnCard.className = 'col-md-4 mb-4';
            burnCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text"><strong>${burn.user}:</strong> ${burn.message}</p>
                        <p class="card-text"><small class="text-muted">Burned ${burn.amount} BACK on ${new Date(burn.timestamp).toLocaleDateString()}</small></p>
                    </div>
                </div>
            `;
            burnWallGrid.appendChild(burnCard);
        });
    });
}

// Load leaderboard
function loadLeaderboard() {
    db.collection('users').orderBy('backBalance', 'desc').get().then((querySnapshot) => {
        leaderboardTable.innerHTML = '';
        let rank = 1;
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${rank++}</td>
                <td>${user.username || 'Anonymous'}</td>
                <td>${user.backBalance || 0}</td>
                <td>${user.badges ? user.badges.length : 0}</td>
                <td>${user.donations || 0}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    });
}

// Load events
function loadEvents() {
    // For now, use static data. Replace with Firebase later.
    const events = [
        { title: 'Community AMA', description: 'Join our monthly AMA with the BACKChain Lite team.', date: 'June 15, 2026', time: '7:00 PM CET' },
        { title: 'Skill Sharing Session', description: 'Share your skills with the community.', date: 'June 20, 2026', time: '6:00 PM CET' },
        { title: 'BACK Token Giveaway', description: 'Win BACK tokens by participating in our giveaway!', date: 'June 25, 2026', time: '8:00 PM CET' }
    ];

    eventsGrid.innerHTML = '';
    events.forEach((event) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'col-md-4 mb-4';
        eventCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                    <p class="card-text"><strong>Time:</strong> ${event.time}</p>
                    <a href="#" class="btn btn-primary">RSVP</a>
                </div>
            </div>
        `;
        eventsGrid.appendChild(eventCard);
    });
}

// Load stats
function loadStats() {
    // For now, use static data. Replace with Firebase later.
    document.getElementById('totalBack').textContent = '10,000';
    document.getElementById('totalStories').textContent = '500';
    document.getElementById('totalUsers').textContent = '1,000';
    document.getElementById('totalDonations').textContent = '5,000';

    document.getElementById('totalBackStats').textContent = '10,000';
    document.getElementById('totalStoriesStats').textContent = '500';
    document.getElementById('totalUsersStats').textContent = '1,000';
    document.getElementById('totalDonationsStats').textContent = '5,000';
    document.getElementById('totalSwapsStats').textContent = '200';
    document.getElementById('totalBurnsStats').textContent = '1,000';
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load data based on the current page
    const currentPage = window.location.pathname.split('/').pop();

    switch (currentPage) {
        case 'index.html':
        case '':
            loadStats();
            break;
        case 'my-story.html':
            loadStories();
            break;
        case 'my-goals.html':
            loadChallenges();
            break;
        case 'gofundme.html':
            loadCampaigns();
            break;
        case 'skill-swap.html':
            loadSkills();
            break;
        case 'barter-board.html':
            loadItems();
            break;
        case 'back-up-board.html':
            loadRequests();
            break;
        case 'burn-wall.html':
            loadBurnWall();
            break;
        case 'leaderboard.html':
            loadLeaderboard();
            break;
        case 'events.html':
            loadEvents();
            break;
        case 'stats.html':
            loadStats();
            break;
        case 'profile.html':
            // Load user profile data
            break;
    }

    // Modal event listeners
    if (document.getElementById('submitStoryBtn')) {
        document.getElementById('submitStoryBtn').addEventListener('click', () => {
            const title = document.getElementById('storyTitle').value;
            const description = document.getElementById('storyDescription').value;
            const category = document.getElementById('storyCategory').value;

            // Add to Firebase
            db.collection('stories').add({
                title,
                description,
                author: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                category,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Story submitted!');
                document.getElementById('storyForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadStories();
            });
        });
    }

    if (document.getElementById('submitCampaignBtn')) {
        document.getElementById('submitCampaignBtn').addEventListener('click', () => {
            const title = document.getElementById('campaignTitle').value;
            const description = document.getElementById('campaignDescription').value;
            const goal = parseInt(document.getElementById('campaignGoal').value);
            const category = document.getElementById('campaignCategory').value;
            const deadline = document.getElementById('campaignDeadline').value;

            // Add to Firebase
            db.collection('campaigns').add({
                title,
                description,
                goal,
                raised: 0,
                creator: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                category,
                deadline,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Campaign created!');
                document.getElementById('campaignForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadCampaigns();
            });
        });
    }

    if (document.getElementById('submitSkillBtn')) {
        document.getElementById('submitSkillBtn').addEventListener('click', () => {
            const title = document.getElementById('skillTitle').value;
            const description = document.getElementById('skillDescription').value;
            const cost = parseInt(document.getElementById('skillCost').value);
            const category = document.getElementById('skillCategory').value;

            // Add to Firebase
            db.collection('skills').add({
                title,
                description,
                cost,
                creator: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                category,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Skill added!');
                document.getElementById('skillForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadSkills();
            });
        });
    }

    if (document.getElementById('submitItemBtn')) {
        document.getElementById('submitItemBtn').addEventListener('click', () => {
            const title = document.getElementById('itemTitle').value;
            const description = document.getElementById('itemDescription').value;
            const price = parseInt(document.getElementById('itemPrice').value);
            const category = document.getElementById('itemCategory').value;
            const image = document.getElementById('itemImage').value;

            // Add to Firebase
            db.collection('items').add({
                title,
                description,
                price,
                creator: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                category,
                image,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Item added!');
                document.getElementById('itemForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadItems();
            });
        });
    }

    if (document.getElementById('submitRequestBtn')) {
        document.getElementById('submitRequestBtn').addEventListener('click', () => {
            const title = document.getElementById('requestTitle').value;
            const description = document.getElementById('requestDescription').value;
            const goal = parseInt(document.getElementById('requestGoal').value);
            const category = document.getElementById('requestCategory').value;

            // Add to Firebase
            db.collection('requests').add({
                title,
                description,
                goal,
                raised: 0,
                creator: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                category,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Request created!');
                document.getElementById('requestForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadRequests();
            });
        });
    }

    if (document.getElementById('submitBurnBtn')) {
        document.getElementById('submitBurnBtn').addEventListener('click', () => {
            const message = document.getElementById('burnMessage').value;
            const amount = parseInt(document.getElementById('burnAmount').value);

            // Add to Firebase
            db.collection('burns').add({
                message,
                amount,
                user: auth.currentUser ? auth.currentUser.displayName || auth.currentUser.email : 'Anonymous',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('BACK burned!');
                document.getElementById('burnForm').reset();
                document.querySelector('[data-bs-dismiss="modal"]').click();
                loadBurnWall();
            });
        });
    }

    if (document.getElementById('saveProfileBtn')) {
        document.getElementById('saveProfileBtn').addEventListener('click', () => {
            const username = document.getElementById('editUsername').value;
            const bio = document.getElementById('editBio').value;

            if (auth.currentUser) {
                db.collection('users').doc(auth.currentUser.uid).set({
                    username,
                    bio,
                    backBalance: 0,
                    badges: [],
                    stories: [],
                    donations: 0,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true }).then(() => {
                    alert('Profile updated!');
                    document.getElementById('profileForm').reset();
                    document.querySelector('[data-bs-dismiss="modal"]').click();
                    loadUserData(auth.currentUser.uid);
                });
            } else {
                alert('Please log in to update your profile.');
            }
        });
    }
});
