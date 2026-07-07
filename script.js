const STORAGE_KEYS = {
  theme: "focus-dashboard-theme",
  quote: "focus-dashboard-quote",
  tasks: "focus-dashboard-tasks",
  planner: "focus-dashboard-planner",
  goals: "focus-dashboard-goals",
};

const DEFAULT_QUOTES = [
  "Discipline beats motivation.",
  "Small steps every day create big results.",
  "Focus on progress, not perfection.",
  "Your future is built by today's actions.",
  "Consistency is your superpower.",
  "Dream big. Start small. Stay consistent.",
  "Success starts with self-discipline.",
  "Every minute matters.",
  "Make today count.",
  "Done is better than perfect.",
  "Stay patient. Stay focused.",
  "Growth begins outside your comfort zone.",
  "Don't stop until you're proud.",
  "Be stronger than your excuses.",
  "Hard work always leaves a mark.",
  "One task at a time.",
  "The best investment is in yourself.",
  "Your habits shape your future.",
  "Keep showing up.",
  "Action creates momentum.",
  "Progress is progress, no matter how small.",
  "Today's effort is tomorrow's success.",
  "Work in silence. Let results speak.",
  "Discipline creates freedom.",
  "A focused mind is unstoppable.",
  "Keep learning. Keep improving.",
  "Start now. Improve later.",
  "You become what you repeat.",
  "Great things take time.",
  "Stay hungry for growth.",
  "Push yourself a little further today.",
  "Don't wait for opportunity. Create it.",
  "Success is earned, not given.",
  "Your only competition is yesterday's you.",
  "Stay consistent even when it's hard.",
  "Believe in your potential.",
  "Keep moving forward.",
  "Every expert was once a beginner.",
  "Your mindset changes everything.",
  "Work hard, stay humble.",
  "Focus on what you can control.",
  "One productive day at a time.",
  "Every challenge is a lesson.",
  "Keep your goals bigger than your fears.",
  "Make your future self proud.",
  "Don't fear failure. Fear not trying.",
  "Success loves preparation.",
  "Keep building, keep growing.",
  "Stay positive and productive.",
  "Progress never happens by accident.",
  "Nothing changes if nothing changes.",
  "Do something today your future self will thank you for.",
  "The secret is to never give up.",
  "Success begins with self-belief.",
  "Your time is valuable, use it wisely.",
  "Stay focused on your mission.",
  "Every day is a fresh start.",
  "The comeback is always stronger.",
  "Good things come to those who work.",
  "Win the morning, win the day.",
];

const DEFAULT_PLANNER = [
  { id: crypto.randomUUID(), time: "07:00", task: "Wake up & morning routine" },
  { id: crypto.randomUUID(), time: "08:30", task: "Breakfast & plan the day" },
  { id: crypto.randomUUID(), time: "09:30", task: "Deep work session" },
  { id: crypto.randomUUID(), time: "12:30", task: "Lunch break" },
  { id: crypto.randomUUID(), time: "14:00", task: "Meetings / collaboration" },
  { id: crypto.randomUUID(), time: "17:00", task: "Exercise" },
  { id: crypto.randomUUID(), time: "19:00", task: "Dinner" },
  { id: crypto.randomUUID(), time: "21:00", task: "Wind down & read" },
];

const DEFAULT_GOALS = [
  { id: crypto.randomUUID(), label: "Drink 8 glasses of water", done: true },
  { id: crypto.randomUUID(), label: "30 min workout", done: true },
  { id: crypto.randomUUID(), label: "Read 10 pages", done: false },
  { id: crypto.randomUUID(), label: "No phone after 10pm", done: false },
];

const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * 98;

const elements = {
  root: document.documentElement,
  warning: document.querySelector(".waring"),
  warningTitle: document.querySelector("#warning1"),
  warningText: document.querySelector("#warning2"),
  themeBtn: document.querySelector("#theme"),
  navLinks: document.querySelectorAll(".nav-link"),
  clockTime: document.querySelector("#clockTime"),
  clockDate: document.querySelector("#clockDate"),
  greeting: document.querySelector("#greeting"),
  quoteText: document.querySelector("#quoteText"),
  quoteRefresh: document.querySelector("#quoteRefresh"),
  taskForm: document.querySelector("#taskForm"),
  taskInput: document.querySelector("#taskInput"),
  taskList: document.querySelector("#taskList"),
  taskCounter: document.querySelector("#taskcounter"),
  plannerForm: document.querySelector("#plannerForm"),
  plannerTimeInput: document.querySelector("#plannerTimeInput"),
  plannerTaskInput: document.querySelector("#plannerTaskInput"),
  plannerList: document.querySelector("#plannerList"),
  goalForm: document.querySelector("#goalForm"),
  goalInput: document.querySelector("#goalInput"),
  goalList: document.querySelector("#goalList"),
  goalsProgressTag: document.querySelector("#goalsProgressTag"),
  goalTotalText: document.querySelector("#goalTotalText"),
  goalRingProgress: document.querySelector("#goalRingProgress"),
  weatherPlace: document.querySelector("#weatherPlace"),
  weatherIcon: document.querySelector("#weatherIcon"),
  weatherTempVal: document.querySelector("#weatherTempVal"),
  weatherDesc: document.querySelector("#weatherDesc"),
  weatherFeels: document.querySelector("#weatherFeels"),
  weatherHumidity: document.querySelector("#weatherHumidity"),
  weatherWind: document.querySelector("#weatherWind"),
  cursor: document.querySelector(".cursor"),
  timerDisplay: document.querySelector("#timerDisplay"),
  focusMode: document.querySelector("#focusMode"),
  ringProgress: document.querySelector("#ringProgress"),
  ringMarker: document.querySelector("#ringMarker"),
  timerToggle: document.querySelector("#timerToggle"),
  timerReset: document.querySelector("#timerReset"),
  timerSkip: document.querySelector("#timerSkip"),
  modeButtons: document.querySelectorAll(".mode-btn"),
};

let tasks = readStorage(STORAGE_KEYS.tasks, []);
let plannerItems = readStorage(STORAGE_KEYS.planner, DEFAULT_PLANNER);
let goals = readStorage(STORAGE_KEYS.goals, DEFAULT_GOALS);

const timerState = {
  modes: [
    { name: "Focus", minutes: 25 },
    { name: "Short Break", minutes: 5 },
    { name: "Long Break", minutes: 15 },
  ],
  modeIndex: 0,
  totalSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  intervalId: null,
};

function readStorage(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showNotice(title, message, tone = "error") {
  const color = tone === "success" ? "green" : "red";
  elements.warningTitle.textContent = title;
  elements.warningText.textContent = message;
  elements.warningTitle.style.color = color;
  elements.warningText.style.color = color;
  elements.warning.style.transform = "translateY(0%)";

  window.clearTimeout(showNotice.hideTimer);
  showNotice.hideTimer = window.setTimeout(() => {
    elements.warning.style.transform = "translateY(-150%)";
  }, 2000);
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (savedTheme === "dark") {
    elements.root.setAttribute("data-theme", "dark");
  }

  syncThemeIcon();

  elements.themeBtn.addEventListener("click", () => {
    const isDark = elements.root.getAttribute("data-theme") === "dark";
    if (isDark) {
      elements.root.removeAttribute("data-theme");
      localStorage.setItem(STORAGE_KEYS.theme, "light");
    } else {
      elements.root.setAttribute("data-theme", "dark");
      localStorage.setItem(STORAGE_KEYS.theme, "dark");
    }
    syncThemeIcon();
  });
}

function syncThemeIcon() {
  const isDark = elements.root.getAttribute("data-theme") === "dark";
  elements.themeBtn.innerHTML = isDark
    ? '<i class="ri-moon-fill"></i>'
    : '<i class="ri-sun-fill"></i>';
}

function initNavigation() {
  elements.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      elements.navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.dataset.target;
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initClock() {
  updateClock();
  window.setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  let greetingText = "Good evening, finish strong";
  if (hours < 12) {
    greetingText = "Good morning, let's start the day";
  } else if (hours < 17) {
    greetingText = "Good afternoon, keep the momentum going";
  }

  elements.clockTime.textContent = time;
  elements.clockDate.textContent = date;
  elements.greeting.textContent = greetingText;
}

function initQuotes() {
  const savedQuote = localStorage.getItem(STORAGE_KEYS.quote);
  elements.quoteText.textContent = savedQuote || randomQuote();

  if (!savedQuote) {
    localStorage.setItem(STORAGE_KEYS.quote, elements.quoteText.textContent);
  }

  elements.quoteRefresh.addEventListener("click", () => {
    const nextQuote = randomQuote(elements.quoteText.textContent);
    elements.quoteText.textContent = nextQuote;
    localStorage.setItem(STORAGE_KEYS.quote, nextQuote);
  });
}

function randomQuote(currentQuote = "") {
  const filtered = DEFAULT_QUOTES.filter((quote) => quote !== currentQuote);
  const source = filtered.length ? filtered : DEFAULT_QUOTES;
  return source[Math.floor(Math.random() * source.length)];
}

function initTasks() {
  renderTasks();

  elements.taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = elements.taskInput.value.trim();

    if (!value) {
      showNotice("Please Enter A Task !", "Task cannot be empty....");
      return;
    }

    if (value.length > 60) {
      showNotice("Task is too long.", "Please keep it under 60 characters.");
      return;
    }

    tasks.unshift({
      id: crypto.randomUUID(),
      label: value,
      done: false,
    });

    persistTasks();
    renderTasks();
    elements.taskInput.value = "";
    showNotice("Task added!", "Nice, task is ready to track.", "success");
  });

  elements.taskList.addEventListener("click", (event) => {
    const item = event.target.closest(".task-item");
    if (!item) return;

    const taskId = item.dataset.id;

    if (event.target.closest(".task-del")) {
      tasks = tasks.filter((task) => task.id !== taskId);
      persistTasks();
      renderTasks();
      showNotice("Task deleted", "Removed from your list.", "success");
      return;
    }

    if (event.target.closest(".task-check")) {
      tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      );
      persistTasks();
      renderTasks();
    }
  });
}

function renderTasks() {
  if (!tasks.length) {
    elements.taskList.innerHTML =
      '<li class="task-empty">No tasks yet. Add one to get started.</li>';
  } else {
    elements.taskList.innerHTML = tasks
      .map(
        (task) => `
          <li class="task-item ${task.done ? "done" : ""}" data-id="${task.id}">
            <span class="task-check">${task.done ? '<i class="ri-check-line"></i>' : ""}</span>
            <span class="task-label">${escapeHtml(task.label)}</span>
            <span class="task-del">✕</span>
          </li>
        `
      )
      .join("");
  }

  const remainingCount = tasks.filter((task) => !task.done).length;
  elements.taskCounter.textContent = String(remainingCount);
}

function persistTasks() {
  writeStorage(STORAGE_KEYS.tasks, tasks);
}

function initPlanner() {
  renderPlanner();

  elements.plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const time = elements.plannerTimeInput.value;
    const task = elements.plannerTaskInput.value.trim();

    if (!time || !task) {
      showNotice("Planner needs details", "Add both time and task.");
      return;
    }

    plannerItems.push({
      id: crypto.randomUUID(),
      time,
      task,
    });

    persistPlanner();
    renderPlanner();
    elements.plannerForm.reset();
    showNotice("Plan added!", "Your schedule has been updated.", "success");
  });

  elements.plannerList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".planner-del");
    if (!deleteButton) return;

    plannerItems = plannerItems.filter((item) => item.id !== deleteButton.dataset.id);
    persistPlanner();
    renderPlanner();
  });

  window.setInterval(renderPlanner, 60000);
}

function renderPlanner() {
  const sortedItems = [...plannerItems].sort((first, second) =>
    first.time.localeCompare(second.time)
  );
  const nowMinutes = getCurrentMinutes();
  let activeId = null;

  sortedItems.forEach((item, index) => {
    const currentMinutes = toMinutes(item.time);
    const nextMinutes =
      index < sortedItems.length - 1 ? toMinutes(sortedItems[index + 1].time) : null;

    if (
      nowMinutes >= currentMinutes &&
      (nextMinutes === null || nowMinutes < nextMinutes)
    ) {
      activeId = item.id;
    }
  });

  elements.plannerList.innerHTML = sortedItems
    .map(
      (item) => {
        const itemMinutes = toMinutes(item.time);
        const statusClass =
          item.id === activeId
            ? "current"
            : itemMinutes < nowMinutes
              ? "passed"
              : "";

        return `
        <div class="planner-row ${statusClass}">
          <div class="planner-time">${item.time}</div>
          <div class="planner-task">
            ${escapeHtml(item.task)}
            <button class="planner-del" data-id="${item.id}" title="Delete">✕</button>
          </div>
        </div>
      `;
      }
    )
    .join("");

  const currentRow = elements.plannerList.querySelector(".planner-row.current");
  if (currentRow) {
    currentRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

function persistPlanner() {
  writeStorage(STORAGE_KEYS.planner, plannerItems);
}

function initGoals() {
  renderGoals();

  elements.goalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = elements.goalInput.value.trim();

    if (!value) {
      showNotice("Goal cannot be empty", "Type a daily goal first.");
      return;
    }

    goals.push({
      id: crypto.randomUUID(),
      label: value,
      done: false,
    });

    persistGoals();
    renderGoals();
    elements.goalInput.value = "";
    showNotice("Goal added!", "You can tap it to mark complete.", "success");
  });

  elements.goalList.addEventListener("click", (event) => {
    const chip = event.target.closest(".goal-chip");
    if (!chip) return;

    const goalId = chip.dataset.id;
    if (event.target.closest(".goal-del")) {
      goals = goals.filter((goal) => goal.id !== goalId);
      persistGoals();
      renderGoals();
      showNotice("Goal deleted", "Removed from daily goals.", "success");
      return;
    }

    goals = goals.map((goal) =>
      goal.id === goalId ? { ...goal, done: !goal.done } : goal
    );

    persistGoals();
    renderGoals();
  });
}

function renderGoals() {
  elements.goalList.innerHTML = goals
    .map(
      (goal) => `
        <li class="goal-chip ${goal.done ? "done" : ""}" data-id="${goal.id}">
          <span class="task-check">${goal.done ? '<i class="ri-check-line"></i>' : ""}</span>
          <span class="glabel">${escapeHtml(goal.label)}</span>
          <button class="goal-del" title="Delete goal" aria-label="Delete goal">✕</button>
        </li>
      `
    )
    .join("");

  const total = goals.length || 1;
  const done = goals.filter((goal) => goal.done).length;
  const percent = Math.round((done / total) * 100);
  const circumference = 238.76;
  const offset = circumference * (1 - done / total);

  elements.goalsProgressTag.textContent = `${percent}%`;
  elements.goalTotalText.textContent = `${done} / ${goals.length} done`;
  elements.goalRingProgress.style.strokeDashoffset = String(offset);
}

function persistGoals() {
  writeStorage(STORAGE_KEYS.goals, goals);
}

function initCursor() {
  if (!elements.cursor || window.matchMedia("(pointer: coarse)").matches) {
    if (elements.cursor) {
      elements.cursor.style.display = "none";
    }
    document.documentElement.style.cursor = "auto";
    return;
  }

  window.addEventListener("mousemove", (event) => {
    elements.cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });

  document.addEventListener("mouseleave", () => {
    elements.cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    elements.cursor.style.opacity = "1";
  });
}

function initTimer() {
  syncTimerMode();
  renderTimer();

  elements.timerToggle.addEventListener("click", toggleTimer);
  elements.timerReset.addEventListener("click", resetTimer);
  elements.timerSkip.addEventListener("click", skipTimerMode);

  elements.modeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      timerState.modeIndex = index;
      applyTimerMode(button.dataset.mode, Number(button.dataset.mins));
    });
  });
}

function toggleTimer() {
  if (timerState.intervalId) {
    window.clearInterval(timerState.intervalId);
    timerState.intervalId = null;
    elements.timerToggle.textContent = "▶ Start";
    return;
  }

  elements.timerToggle.textContent = "⏸ Pause";
  timerState.intervalId = window.setInterval(() => {
    if (timerState.remainingSeconds <= 0) {
      window.clearInterval(timerState.intervalId);
      timerState.intervalId = null;
      elements.timerToggle.textContent = "▶ Start";
      showNotice("Completed!", "Time's up. Take a breath.", "success");
      return;
    }

    timerState.remainingSeconds -= 1;
    renderTimer();

    if (timerState.remainingSeconds === 0) {
      window.clearInterval(timerState.intervalId);
      timerState.intervalId = null;
      elements.timerToggle.textContent = "▶ Start";
      showNotice("Completed!", "Time's up. Take a breath.", "success");
    }
  }, 1000);
}

function resetTimer() {
  window.clearInterval(timerState.intervalId);
  timerState.intervalId = null;
  timerState.remainingSeconds = timerState.totalSeconds;
  elements.timerToggle.textContent = "▶ Start";
  renderTimer();
}

function skipTimerMode() {
  timerState.modeIndex = (timerState.modeIndex + 1) % timerState.modes.length;
  const nextMode = timerState.modes[timerState.modeIndex];
  applyTimerMode(nextMode.name, nextMode.minutes);
}

function applyTimerMode(modeName, minutes) {
  window.clearInterval(timerState.intervalId);
  timerState.intervalId = null;
  timerState.totalSeconds = minutes * 60;
  timerState.remainingSeconds = timerState.totalSeconds;
  elements.focusMode.textContent = modeName;
  elements.timerToggle.textContent = "▶ Start";
  syncTimerMode();
  renderTimer();
}

function syncTimerMode() {
  elements.modeButtons.forEach((button, index) => {
    button.classList.toggle("active", index === timerState.modeIndex);
  });
  elements.focusMode.textContent = timerState.modes[timerState.modeIndex].name;
}

function renderTimer() {
  const minutes = Math.floor(timerState.remainingSeconds / 60);
  const seconds = timerState.remainingSeconds % 60;
  const progress = timerState.remainingSeconds / timerState.totalSeconds;
  const elapsedAngle = 360 * (1 - progress);

  elements.timerDisplay.innerHTML = `<span class="min">${String(minutes).padStart(
    2,
    "0"
  )}</span>:<span class="sec">${String(seconds).padStart(2, "0")}</span>`;
  elements.ringProgress.style.strokeDashoffset = String(
    TIMER_RING_CIRCUMFERENCE * (1 - progress)
  );
  elements.ringMarker.style.transform = `rotate(${elapsedAngle}deg)`;
}

async function initWeather() {
  try {
    const location = await getLocation();
    const weatherData = await fetchWeather(location.latitude, location.longitude);
    renderWeather(location.name, weatherData);
  } catch (error) {
    renderWeather("Offline", {
      current_weather: {
        temperature: 28,
        windspeed: 8,
        weathercode: 1,
      },
      hourly: {
        relativehumidity_2m: [50],
        apparent_temperature: [30],
      },
    });
  }
}

function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation unavailable"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: "My Location",
        });
      },
      () => {
        reject(new Error("Location denied"));
      },
      { timeout: 8000 }
    );
  });
}

async function fetchWeather(latitude, longitude) {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&current_weather=true&hourly=apparent_temperature,relativehumidity_2m&forecast_days=1";

  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error("Weather fetch failed");
  }

  return response.json();
}

function renderWeather(place, data) {
  const current = data.current_weather;
  const humidity = data.hourly?.relativehumidity_2m?.[0] ?? 50;
  const feels = data.hourly?.apparent_temperature?.[0] ?? current.temperature;
  const weatherMeta = getWeatherMeta(current.weathercode);

  elements.weatherPlace.textContent = place;
  elements.weatherIcon.textContent = weatherMeta.icon;
  elements.weatherTempVal.textContent = Math.round(current.temperature);
  elements.weatherDesc.textContent = weatherMeta.label;
  elements.weatherFeels.textContent = `${Math.round(feels)}°`;
  elements.weatherHumidity.textContent = `${Math.round(humidity)}%`;
  elements.weatherWind.textContent = `${Math.round(current.windspeed)} km/h`;
}

function getWeatherMeta(code) {
  const codeMap = {
    0: { icon: "☀️", label: "Clear sky" },
    1: { icon: "🌤️", label: "Mostly clear" },
    2: { icon: "⛅", label: "Partly cloudy" },
    3: { icon: "☁️", label: "Cloudy" },
    45: { icon: "🌫️", label: "Foggy" },
    48: { icon: "🌫️", label: "Depositing rime fog" },
    51: { icon: "🌦️", label: "Light drizzle" },
    61: { icon: "🌧️", label: "Rain" },
    63: { icon: "🌧️", label: "Moderate rain" },
    65: { icon: "⛈️", label: "Heavy rain" },
    71: { icon: "🌨️", label: "Snow fall" },
    80: { icon: "🌦️", label: "Rain showers" },
    95: { icon: "⛈️", label: "Thunderstorm" },
  };

  return codeMap[code] || { icon: "🌈", label: "Pleasant weather" };
}

function getCurrentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function toMinutes(timeValue) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initApp() {
  initTheme();
  initNavigation();
  initClock();
  initQuotes();
  initTasks();
  initPlanner();
  initGoals();
  initCursor();
  initTimer();
  initWeather();
}

initApp();