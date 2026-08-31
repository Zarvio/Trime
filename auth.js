/* ============================================================
   AUTH.JS — Firebase login + progress save/load/reset
   ------------------------------------------------------------
   Sirf yaha Firebase se related sab kuch hai: Google login
   (icon-only header, popup se), header me profile dikhana
   (icon pe photo + click pe naam/logout dropdown), aur quiz
   progress ko Firebase Realtime Database me save/load/reset
   karna.

   script.js in functions ko call karta hai:
     - getCurrentUser()
     - saveProgress(subjectKey, bookKey, chapterKey, qIndex, answers)
     - loadProgress(subjectKey, bookKey, chapterKey)   -> Promise
     - resetProgress(subjectKey, bookKey, chapterKey)  -> Promise

   Agar login/Firebase se related kuch badalna ho (jaise config,
   ya login ka tarika), sirf isi file ko edit karna hai —
   script.js ya questions.js ko chhedne ki zaroorat nahi.
   ============================================================ */

// ---- Firebase config (tumhara existing project) ----
const firebaseConfig = {
  apiKey: "AIzaSyDUefeJbHKIAs-l3zvFlGaas6VD63vv4kI",
  authDomain: "inspire4ever-c60ad.firebaseapp.com",
  databaseURL: "https://inspire4ever-c60ad-default-rtdb.firebaseio.com",
  projectId: "inspire4ever-c60ad",
  storageBucket: "inspire4ever-c60ad.appspot.com",
  messagingSenderId: "125014633127",
  appId: "1:125014633127:web:d29e4c37628ab637f40982"
};
firebase.initializeApp(firebaseConfig);

let currentUser = null;

// Default (logged-out) icon — plain grey silhouette, drawn once here so
// we can always fall back to it (e.g. right after logout).
const DEFAULT_AUTH_ICON =
  "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%2321252E'/%3E%3Ccircle cx='12' cy='9.5' r='4' fill='%239AA1AF'/%3E%3Cpath d='M4 20c1.2-4 4.2-6 8-6s6.8 2 8 6' fill='%239AA1AF'/%3E%3C/svg%3E";

// ---- Header elements ----
const authIconBtn      = document.getElementById('authIconBtn');
const authIcon         = document.getElementById('authIcon');
const loginPopup       = document.getElementById('loginPopup');
const closeLoginPopup  = document.getElementById('closeLoginPopup');
const googleLoginBtn   = document.getElementById('googleLoginBtn');
const profileDropdown  = document.getElementById('profileDropdown');
const userName         = document.getElementById('userName');
const logoutBtn        = document.getElementById('logoutBtn');

function hideLoginPopup(){ loginPopup.hidden = true; }
function hideProfileDropdown(){ profileDropdown.hidden = true; }

// ---- Icon click: logged out -> open login popup, logged in -> toggle dropdown ----
authIconBtn.addEventListener('click', () => {
  if (currentUser){
    profileDropdown.hidden = !profileDropdown.hidden;
  } else {
    loginPopup.hidden = false;
  }
});

// Close popup: X button, or clicking the dark overlay outside the box
closeLoginPopup.addEventListener('click', hideLoginPopup);
loginPopup.addEventListener('click', (e) => {
  if (e.target === loginPopup) hideLoginPopup();
});

// Close the profile dropdown if the user taps anywhere else on the page
document.addEventListener('click', (e) => {
  if (!profileDropdown.hidden &&
      !profileDropdown.contains(e.target) &&
      !authIconBtn.contains(e.target)){
    hideProfileDropdown();
  }
});

// ---- Google Login (popup, same style as your original code) ----
googleLoginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  firebase.auth().signInWithPopup(provider)
    .then(() => hideLoginPopup())
    .catch(err => {
      console.error(err);
      alert('Google login failed. Please try again.');
    });
});

// ---- Logout: sign out immediately, then hard-refresh the page ----
logoutBtn.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => location.reload())
    .catch(err => {
      console.error('Logout failed:', err);
      location.reload(); // refresh anyway so UI never gets stuck
    });
});

// ---- Auth state changes -> update icon + tell script.js ----
firebase.auth().onAuthStateChanged(user => {
  currentUser = user;

  if (user){
    authIcon.src = user.photoURL ||
      ('https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || 'U'));
    userName.textContent = user.displayName || 'Signed in';
    hideLoginPopup();
  } else {
    authIcon.src = DEFAULT_AUTH_ICON;
    hideProfileDropdown();
  }

  // script.js defines this if a quiz is already open, so a login/logout
  // mid-quiz can reload (or start saving) progress right away.
  if (typeof onAuthReady === 'function') onAuthReady(user);
});

function getCurrentUser(){
  return currentUser;
}

// ---- Where a chapter's progress lives in the database ----
function progressPath(subjectKey, bookKey, chapterKey){
  return `quizProgress/${currentUser.uid}/${subjectKey}_${bookKey}_${chapterKey}`;
}

// ---- Save current question index + all answers so far ----
function saveProgress(subjectKey, bookKey, chapterKey, qIndex, answers){
  if (!currentUser) return; // not logged in -> nothing persists
  firebase.database().ref(progressPath(subjectKey, bookKey, chapterKey)).set({
    qIndex,
    answers,
    updatedAt: Date.now()
  }).catch(err => console.error('Save progress failed:', err));
}

// ---- Load previously saved progress for a chapter ----
// Resolves to { qIndex, answers } or null if nothing saved / not logged in.
function loadProgress(subjectKey, bookKey, chapterKey){
  if (!currentUser) return Promise.resolve(null);
  return firebase.database().ref(progressPath(subjectKey, bookKey, chapterKey))
    .once('value')
    .then(snap => snap.exists() ? snap.val() : null)
    .catch(err => {
      console.error('Load progress failed:', err);
      return null;
    });
}

// ---- Reset (delete) saved progress for a chapter ----
function resetProgress(subjectKey, bookKey, chapterKey){
  if (!currentUser) return Promise.resolve();
  return firebase.database().ref(progressPath(subjectKey, bookKey, chapterKey)).remove()
    .catch(err => console.error('Reset progress failed:', err));
}