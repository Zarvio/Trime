/* ============================================================
   APP LOGIC — koi bhi question/chapter data yaha NAHI hai.
   Sab data questions.js me (window.QUIZ_DATA) hai.
   Isliye jab bhi sirf questions badalne ho, is file ko chhuna
   hi nahi padega.

   OPTION SHUFFLING:
   Har baar jab chapter khulta hai (fresh open / restart / reset),
   har question ke A/B/C/D options ka order RANDOM shuffle hota hai.
   Isliye correct answer kabhi A pe hoga, kabhi B/C/D pe — fix
   position pe nahi rahega, so ratne se kaam nahi chalega.
   Yeh shuffle sirf DISPLAY ke liye hai — jo answer Firebase me
   save hota hai wo hamesha original (questions.js wale) option ka
   matlab hi save hota hai, isliye purana progress bhi sahi dikhta
   rahega chahe naya shuffle order alag ho.
   ============================================================ */

const DATA = window.QUIZ_DATA;

// ---- current navigation state ----
let state = {
  subjectKey: null,
  bookKey: null,
  chapterKey: null,
  qIndex: 0,
  // answers[i] = ORIGINAL index (as written in questions.js) of the
  // option the user picked for question i, or null if unanswered.
  // Stored as the original index (not the shuffled display position)
  // so saved progress stays correct no matter how options get reshuffled.
  answers: [],
  answered: false,
  // optionOrder[i] = array of original option indices in the order
  // they are CURRENTLY being displayed for question i. Generated once
  // per question per chapter-open, then cached so it doesn't jump
  // around while using Previous/Next within the same session.
  optionOrder: {}
};

// ---- element refs ----
const screens = {
  subject: document.getElementById('screen-subject'),
  book:    document.getElementById('screen-book'),
  chapter: document.getElementById('screen-chapter'),
  quiz:    document.getElementById('screen-quiz'),
  done:    document.getElementById('screen-done')
};
const topbar        = document.getElementById('topbar');
const backBtn        = document.getElementById('backBtn');
const crumbsEl       = document.getElementById('crumbs');
const chapterTitleEl = document.getElementById('chapterTitle');
const downloadBtn    = document.getElementById('downloadPdfBtn');

function showScreen(name){
  Object.values(screens).forEach(s => s.hidden = true);
  screens[name].hidden = false;
  topbar.hidden = (name !== 'quiz' && name !== 'done');
}

/* ================= SCREEN 1: SUBJECTS ================= */
function renderSubjects(){
  const grid = document.getElementById('subjectGrid');
  grid.innerHTML = '';
  Object.entries(DATA).forEach(([key, subject]) => {
    const hasBooks = subject.books && Object.keys(subject.books).length > 0;
    const btn = document.createElement('button');
    btn.className = 'spine-card' + (hasBooks ? '' : ' locked');
    btn.innerHTML = `${subject.name}<span class="sub">${hasBooks ? 'Tap to open' : 'Coming soon'}</span>`;
    if (hasBooks){
      btn.addEventListener('click', () => {
        state.subjectKey = key;
        renderBooks();
        showScreen('book');
      });
    }
    grid.appendChild(btn);
  });
  showScreen('subject');
}

/* ================= SCREEN 2: BOOKS ================= */
function renderBooks(){
  const subject = DATA[state.subjectKey];
  document.getElementById('bookCrumb').textContent = subject.name;
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = '';
  Object.entries(subject.books).forEach(([key, book]) => {
    const hasChapters = book.chapters && Object.keys(book.chapters).length > 0;
    const btn = document.createElement('button');
    btn.className = 'spine-card' + (hasChapters ? '' : ' locked');
    btn.innerHTML = `${book.name}<span class="sub">${hasChapters ? 'View chapters' : 'Coming soon'}</span>`;
    if (hasChapters){
      btn.addEventListener('click', () => {
        state.bookKey = key;
        renderChapters();
        showScreen('chapter');
      });
    }
    grid.appendChild(btn);
  });
}

/* ================= SCREEN 3: CHAPTERS ================= */
function renderChapters(){
  const subject = DATA[state.subjectKey];
  const book = subject.books[state.bookKey];
  document.getElementById('chapterCrumb').textContent = `${subject.name} — ${book.name}`;
  const list = document.getElementById('chapterList');
  list.innerHTML = '';

  const entries = Object.entries(book.chapters);
  if (entries.length === 0){
    const li = document.createElement('li');
    li.innerHTML = `<p class="empty-note">No chapters added yet for this book.</p>`;
    list.appendChild(li);
    return;
  }

  entries.forEach(([key, chapter], i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerHTML = `<span><span class="chnum">${String(i+1).padStart(2,'0')}</span> ${chapter.name}</span><span>&rarr;</span>`;
    btn.addEventListener('click', () => openChapter(key, chapter));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Opens a chapter: if the logged-in user has saved progress for it
// (in Firebase, via auth.js), resume exactly where they left off.
// Otherwise start fresh from question 1.
function openChapter(key, chapter){
  state.chapterKey = key;
  state.optionOrder = {}; // fresh shuffle every time a chapter is opened

  loadProgress(state.subjectKey, state.bookKey, key).then(saved => {
    if (saved && Array.isArray(saved.answers)){
      state.answers = saved.answers;
      // pad/truncate in case the question bank changed size since saving
      while (state.answers.length < chapter.questions.length) state.answers.push(null);
      state.qIndex = Math.min(saved.qIndex || 0, chapter.questions.length - 1);
    } else {
      state.answers = new Array(chapter.questions.length).fill(null);
      state.qIndex = 0;
    }
    startQuiz();
  });
}

/* ================= SCREEN 4: QUIZ ================= */
function getChapter(){
  return DATA[state.subjectKey].books[state.bookKey].chapters[state.chapterKey];
}

// Returns (and lazily creates) the shuffled display order for a question.
// order[i] = the ORIGINAL option index shown at display position i.
// Cached in state.optionOrder so it stays stable while navigating
// back and forth within the same chapter session.
function getOptionOrder(qIndex, optionCount){
  if (!state.optionOrder[qIndex]){
    const order = Array.from({ length: optionCount }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = order.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    state.optionOrder[qIndex] = order;
  }
  return state.optionOrder[qIndex];
}

// Saves qIndex + answers to Firebase for the logged-in user (auth.js).
// Does nothing if nobody is logged in — progress just stays in-memory.
function persist(){
  saveProgress(state.subjectKey, state.bookKey, state.chapterKey, state.qIndex, state.answers);
}

function startQuiz(){
  const subject = DATA[state.subjectKey];
  const book = subject.books[state.bookKey];
  const chapter = getChapter();

  crumbsEl.textContent = `${subject.name} — ${book.name}`;
  chapterTitleEl.textContent = chapter.name;

  // The PDF link points to the file in questions.js (chapter.pdf).
  // The downloaded file is renamed on the fly to something clear, e.g.
  // "Vistas-Chapter1-English.pdf", based on whatever the user selected.
  const chapterNumber = Object.keys(book.chapters).indexOf(state.chapterKey) + 1;
  const niceFileName = `${book.name}-Chapter${chapterNumber}-${subject.name}.pdf`
    .replace(/\s+/g, '');

  downloadBtn.href = chapter.pdf;
  downloadBtn.setAttribute('download', niceFileName);

  renderQuestion();
  showScreen('quiz');
}

function renderQuestion(){
  const chapter = getChapter();
  const q = chapter.questions[state.qIndex];
  const previousPick = state.answers[state.qIndex]; // original index, or null if not answered yet
  state.answered = previousPick !== null;

  document.getElementById('qNumber').textContent = `Question ${state.qIndex + 1} / ${chapter.questions.length}`;
  document.getElementById('qTextEn').textContent = q.en;
  document.getElementById('qTextHi').textContent = q.hi;

  const box = document.getElementById('optionsBox');
  box.innerHTML = '';
  const letters = ['A','B','C','D'];
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  // order[displayPos] = originalIndex being shown at that position
  const order = getOptionOrder(state.qIndex, q.options.length);

  order.forEach((originalIndex, displayPos) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.innerHTML = `<span class="badge">${letters[displayPos]}</span><span>${q.options[originalIndex]}</span>`;
    btn.addEventListener('click', () => handleAnswer(originalIndex, btn));
    box.appendChild(btn);
  });

  const allOptionBtns = document.querySelectorAll('#optionsBox .opt-btn');

  if (state.answered){
    // Question already answered earlier — restore exactly how it was left:
    // find where the previously-picked ORIGINAL index (and the correct
    // ORIGINAL index) landed in the CURRENT shuffled display order.
    const pickedDisplayPos = order.indexOf(previousPick);
    const correctDisplayPos = order.indexOf(q.answer);

    allOptionBtns.forEach(b => b.disabled = true);
    if (previousPick === q.answer){
      allOptionBtns[pickedDisplayPos].classList.add('correct');
      feedback.textContent = 'Correct! ✅';
      feedback.className = 'feedback is-correct';
    } else {
      allOptionBtns[pickedDisplayPos].classList.add('wrong');
      allOptionBtns[correctDisplayPos].classList.add('correct');
      feedback.textContent = 'Incorrect ❌ — the correct answer is shown in green.';
      feedback.className = 'feedback is-wrong';
    }
    nextBtn.hidden = false;
  } else {
    // Fresh, unanswered question.
    feedback.textContent = '';
    feedback.className = 'feedback';
    nextBtn.hidden = true;
  }

  prevBtn.disabled = state.qIndex === 0;
}

// selectedIndex here is the ORIGINAL option index (from questions.js),
// already translated by the click handler above — not the display position.
function handleAnswer(selectedIndex, selectedBtn){
  if (state.answered) return;
  state.answered = true;
  state.answers[state.qIndex] = selectedIndex; // original index, remembered for "Previous" + Firebase

  const chapter = getChapter();
  const q = chapter.questions[state.qIndex];
  const order = getOptionOrder(state.qIndex, q.options.length);
  const allOptionBtns = document.querySelectorAll('#optionsBox .opt-btn');
  const feedback = document.getElementById('feedback');

  allOptionBtns.forEach(b => b.disabled = true);

  if (selectedIndex === q.answer){
    selectedBtn.classList.add('correct');
    feedback.textContent = 'Correct! ✅';
    feedback.classList.add('is-correct');
  } else {
    selectedBtn.classList.add('wrong');
    const correctDisplayPos = order.indexOf(q.answer);
    allOptionBtns[correctDisplayPos].classList.add('correct');
    feedback.textContent = 'Incorrect ❌ — the correct answer is shown in green.';
    feedback.classList.add('is-wrong');
  }

  document.getElementById('nextBtn').hidden = false;
  persist(); // save this answer to Firebase right away
}

document.getElementById('nextBtn').addEventListener('click', () => {
  const chapter = getChapter();
  if (state.qIndex + 1 < chapter.questions.length){
    state.qIndex++;
    renderQuestion();
    persist(); // remember which question they're on
  } else {
    // Score is calculated fresh from the answers array, so going back and
    // forth between questions never double-counts anything.
    const score = state.answers.reduce(
      (total, pick, i) => total + (pick === chapter.questions[i].answer ? 1 : 0),
      0
    );
    document.getElementById('scoreLine').textContent =
      `Your score: ${score} / ${chapter.questions.length}`;
    showScreen('done');
  }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (state.qIndex === 0) return;
  state.qIndex--;
  renderQuestion();
  persist();
});

document.getElementById('restartBtn').addEventListener('click', () => {
  const chapter = getChapter();
  state.qIndex = 0;
  state.answers = new Array(chapter.questions.length).fill(null);
  state.optionOrder = {}; // fresh shuffle on every restart
  startQuiz();
  persist();
});

// "Reset" button in the quiz top bar — only resets the on-screen quiz
// AFTER Firebase confirms the old data was actually deleted. If the
// delete fails (e.g. no internet), the screen is left untouched and the
// user is told to try again, instead of showing a false "reset".
document.getElementById('resetProgressBtn').addEventListener('click', () => {
  if (!getCurrentUser()){
    alert('Login with Google first to save and reset progress.');
    return;
  }
  const ok = confirm('Reset all progress for this chapter? This cannot be undone.');
  if (!ok) return;

  const chapter = getChapter();
  resetProgress(state.subjectKey, state.bookKey, state.chapterKey)
    .then(() => {
      // Firebase confirmed deletion — now it's safe to clear the local view.
      state.qIndex = 0;
      state.answers = new Array(chapter.questions.length).fill(null);
      state.optionOrder = {}; // fresh shuffle on every reset
      startQuiz();
    })
    .catch(() => {
      alert('Could not reset progress (check your internet connection) — please try again.');
    });
});

// Called by auth.js whenever login state changes. If a chapter is already
// open when the user logs in, pull their saved progress for it immediately
// (or save the current local progress if nothing was saved yet).
function onAuthReady(user){
  if (!user || !state.chapterKey || screens.quiz.hidden) return;
  loadProgress(state.subjectKey, state.bookKey, state.chapterKey).then(saved => {
    if (saved && Array.isArray(saved.answers)){
      state.answers = saved.answers;
      state.qIndex = saved.qIndex || 0;
      renderQuestion();
    } else {
      persist();
    }
  });
}

/* ================= BACK BUTTON ================= */
backBtn.addEventListener('click', () => {
  // Back button sirf quiz/done screen par dikhta hai (topbar),
  // dono se click karne par chapter list par wapas jaate hain.
  renderChapters();
  showScreen('chapter');
});

/* ================= INIT ================= */
renderSubjects();