function themetoggle() {
    const root = document.documentElement;
    const themeBtn = document.querySelector("#theme");

    themeBtn.addEventListener("click", () => {
        if (root.getAttribute("data-theme") === "dark") {
            root.removeAttribute("data-theme");
            themeBtn.innerHTML = `<i class="ri-sun-fill"></i>`;
        } else {
            root.setAttribute("data-theme", "dark");
            themeBtn.innerHTML = `<i class="ri-moon-fill"></i>`;
        }
    });
}
themetoggle() 
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
            }else  if(elems.getAttribute("data-target") === "overview"){
                 document.querySelector(".topline").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            }else if(elems.getAttribute("data-target") === "tasks"){
               document.querySelector(".topline").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            }else  if(elems.getAttribute("data-target") === "goals"){
                document.querySelector(".card-goals").scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                })
            }
        });

    });
}
navbar() 


 function quote(){
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

let  reload  = document.querySelector("#quoteRefresh")
let quoteinput  = document.querySelector("#quoteText")
 let savedquote = localStorage.getItem("quote")

 if(savedquote){
    quoteinput.textContent = savedquote
 }else{
     let randomQuote = arr[Math.floor(Math.random() * arr.length)];
      quoteinput.textContent = randomQuote;
        localStorage.setItem("quote", randomQuote);
 }
 reload.addEventListener("click",function(){
      let randomQuote = arr[Math.floor(Math.random() * arr.length)];

    quoteinput.textContent = randomQuote;

    // Naya quote save kar do
    localStorage.setItem("quote", randomQuote);
 })
 }
quote()