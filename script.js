function themetoggle() {
    const root = document.documentElement;
    const themeBtn = document.querySelector("#theme");

    // Step 1: Pehle check karo localStorage me theme saved hai ya nahi
    const savedTheme = localStorage.getItem("theme");

    // Step 2: Agar dark saved hai to page load hote hi dark laga do
    if (savedTheme === "dark") {
        root.setAttribute("data-theme", "dark");
        themeBtn.innerHTML = `<i class="ri-moon-fill"></i>`;
    } else {
        themeBtn.innerHTML = `<i class="ri-sun-fill"></i>`;
    }

    // Step 3: Button click hone par theme change karo
    themeBtn.addEventListener("click", () => {

        if (root.getAttribute("data-theme") === "dark") {

            // Light Theme
            root.removeAttribute("data-theme");
            themeBtn.innerHTML = `<i class="ri-sun-fill"></i>`;

            // LocalStorage update
            localStorage.setItem("theme", "light");

        } else {

            // Dark Theme
            root.setAttribute("data-theme", "dark");
            themeBtn.innerHTML = `<i class="ri-moon-fill"></i>`;

            // LocalStorage update
            localStorage.setItem("theme", "dark");
        }

    });
}

themetoggle();
function navbar() {
    let navbarlinks = document.querySelectorAll(".nav-link");

    navbarlinks.forEach((elems) => {
        elems.addEventListener("click", () => {

            navbarlinks.forEach((link) => {
                link.classList.remove("active");
            });

            elems.classList.add("active");
            if (elems.getAttribute("data-target") === "planner") {
                document.querySelector(".card-goals").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            } else if (elems.getAttribute("data-target") === "overview") {
                document.querySelector(".topline").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            } else if (elems.getAttribute("data-target") === "tasks") {
                document.querySelector(".topline").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            } else if (elems.getAttribute("data-target") === "goals") {
                document.querySelector(".card-goals").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            }
        });

    });
}
navbar()


function quote() {
    let arr = [
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
        "Your time is valuable—use it wisely.",
        "Stay focused on your mission.",
        "Every day is a fresh start.",
        "The comeback is always stronger.",
        "Good things come to those who work.",
        "Win the morning, win the day."
    ];

    let reload = document.querySelector("#quoteRefresh")
    let quoteinput = document.querySelector("#quoteText")
    let savedquote = localStorage.getItem("quote")

    if (savedquote) {
        quoteinput.textContent = savedquote
    } else {
        let randomQuote = arr[Math.floor(Math.random() * arr.length)];
        quoteinput.textContent = randomQuote;
        localStorage.setItem("quote", randomQuote);
    }
    reload.addEventListener("click", function () {
        let randomQuote = arr[Math.floor(Math.random() * arr.length)];

        quoteinput.textContent = randomQuote;

        // Naya quote save kar do
        localStorage.setItem("quote", randomQuote);
    })
}
quote()


let todotaskinput = document.querySelector("#taskInput")
let todotaskadd = document.querySelector("#todotaskadd")
let todos = document.querySelector("#taskList")
let taskcounter = document.querySelector("#taskcounter")

let task = 0
todotaskadd.addEventListener("click", function () {
    if (todotaskinput.value.trim() === "") {
          document.querySelector("#warning1").innerHTML = "Please Enter A Task !"
        document.querySelector("#warning2").innerHTML = " Task cannot be empty...."
        document.querySelector("#warning1").style.color = "red"
        document.querySelector("#warning2").style.color = "red"
        document.querySelector(".waring").style.transform = "translateY(0%)"
        setTimeout(function () {
            document.querySelector(".waring").style.transform = "translateY(-150%)"
        }, 2000)
    } else if (todotaskinput.value.length > 40) {
        document.querySelector("#warning1").innerHTML = "Task is too long."
        document.querySelector("#warning2").innerHTML = "Please keep it under 40 characters."
        document.querySelector(".waring").style.transform = "translateY(0%)"
        setTimeout(function () {
            document.querySelector(".waring").style.transform = "translateY(-150%)"
        }, 2000)
    } else {
        todos.innerHTML += ` <li class="task-item">
            <span class="task-check"> </span>
            <span class="task-label">${todotaskinput.value}</span>
            <span class="task-del">✕</span>
          </li>`
           document.querySelector("#warning1").innerHTML = "Task added!"
        document.querySelector("#warning2").innerHTML = "ThankYou!"
        document.querySelector("#warning1").style.color = "green"
        document.querySelector("#warning2").style.color = "green"

        document.querySelector(".waring").style.transform = "translateY(0%)"
        setTimeout(function () {
            document.querySelector(".waring").style.transform = "translateY(-150%)"
        }, 2000)
        todotaskinput.value = ""
        addDeleteEvents();
   check()
        task++
        taskcounter.textContent = task
    }
})

function addDeleteEvents() {
    let taskcancel = document.querySelectorAll(".task-del");

    taskcancel.forEach((elem) => {
        elem.onclick = function () {
            elem.parentElement.remove();
           if(task>0){
              task--
           }else{
            task = 0
           }
            taskcounter.textContent = task
 document.querySelector("#warning1").innerHTML = "Task Deleted"
        document.querySelector("#warning2").innerHTML = "ThankYou!"
        document.querySelector("#warning1").style.color = "green"
        document.querySelector("#warning2").style.color = "green"

        document.querySelector(".waring").style.transform = "translateY(0%)"
        setTimeout(function () {
            document.querySelector(".waring").style.transform = "translateY(-150%)"
        }, 2000)

        };
    });
}

function check() {
  let checbox = document.querySelectorAll(".task-check");

  checbox.forEach((val) => {

    val.onclick = function () {

      let label = val.parentElement.querySelector(".task-label");

      if (val.innerHTML.trim() === "") {
        val.innerHTML = `<i class="ri-check-line"></i>`;
        label.style.textDecoration = "line-through";

        if(task>0){
              task--
           }else{
            task = 0
           }
        taskcounter.textContent = task;

      } else {

        val.innerHTML = "";
        label.style.textDecoration = "none";

        task++;
        taskcounter.textContent = task;
      }

    };

  });
}
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // baaki code
});

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Mouse window ke bahar jaye
document.addEventListener("mouseleave", function () {
    cursor.style.opacity = "0";
});

// Mouse window me wapas aaye
document.addEventListener("mouseenter", function () {
    cursor.style.opacity = "1";
});


let min = document.querySelector(".min");
let sec = document.querySelector(".sec");
let timerbtn = document.querySelector("#timerToggle");

let realsec = Number(sec.textContent);
let realmin = Number(min.textContent);

let interval;

timerbtn.addEventListener("click", function () {

    if (interval) return; // Dobara click par naya interval nahi banega

    interval = setInterval(function () {

        if (realmin === 0 && realsec === 0) {
            clearInterval(interval);

            document.querySelector("#warning1").innerHTML = "Completed!";
            document.querySelector("#warning2").innerHTML = "Time's Up!....";
            document.querySelector("#warning1").style.color = "green";
            document.querySelector("#warning2").style.color = "green";
            document.querySelector(".waring").style.transform = "translateY(0%)";

            setTimeout(function () {
                document.querySelector(".waring").style.transform = "translateY(-150%)";
            }, 2000);

            return;
        }

        if (realsec === 0) {
            realmin--;
            realsec = 59;
        } else {
            realsec--;
        }

        min.textContent = String(realmin).padStart(2, "0");
        sec.textContent = String(realsec).padStart(2, "0");

    }, 1000);

});
let  longmin = document.querySelector("#longmin")

longmin.addEventListener("click",function(){
    realsec = 0
    realmin = 25
    sec.textContent = String(realsec).padStart(2, "0");
min.textContent = String(realmin).padStart(2, "0");
 
 medmin.classList.remove("active")
 longmin.classList.add("active")
 shortmin.classList.remove("active")
})

let  shortmin = document.querySelector("#shortmin")

shortmin.addEventListener("click",function(){
    realsec = 0
    realmin = 5
    sec.textContent = String(realsec).padStart(2, "0");
min.textContent = String(realmin).padStart(2, "0");
 medmin.classList.remove("active")
 longmin.classList.remove("active")
 shortmin.classList.add("active")
 

})

let  medmin = document.querySelector("#medmin")

medmin.addEventListener("click",function(){
    realsec = 0
    realmin = 15
    sec.textContent = String(realsec).padStart(2, "0");
min.textContent = String(realmin).padStart(2, "0");
longmin.classList.remove("active")
 shortmin.classList.remove("active")
 medmin.classList.add("active")

})
