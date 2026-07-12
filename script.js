// =============================
// Tab Navigation Script
// =============================

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

/**
 * Activate a tab and its corresponding panel.
 * @param {string} target - ID of the panel to activate.
 * @param {boolean} updateHash - Whether to update the URL hash.
 */
function activateTab(target, updateHash = false) {

    tabs.forEach(tab => {

        const selected = tab.dataset.tab === target;

        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", selected);
        tab.tabIndex = selected ? 0 : -1;

    });

    panels.forEach(panel => {

        if (panel.id === target) {

            // Restart CSS animation
            panel.classList.remove("active");
            void panel.offsetWidth;
            panel.classList.add("active");

            panel.focus();

        } else {

            panel.classList.remove("active");

        }

    });

    if (updateHash) {

        history.replaceState(null, "", "#" + target);

    }

}

/* =============================
   Mouse Click
============================= */

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        activateTab(tab.dataset.tab, true);

    });

});


/* =============================
   Keyboard Navigation
============================= */

tabs.forEach((tab, index) => {

    tab.addEventListener("keydown", e => {

        let nextIndex;

        switch (e.key) {

            case "ArrowRight":
                nextIndex = (index + 1) % tabs.length;
                break;

            case "ArrowLeft":
                nextIndex = (index - 1 + tabs.length) % tabs.length;
                break;

            case "Home":
                nextIndex = 0;
                break;

            case "End":
                nextIndex = tabs.length - 1;
                break;

            case "Enter":
            case " ":
                activateTab(tab.dataset.tab, true);
                return;

            default:
                return;

        }

        e.preventDefault();

        tabs[nextIndex].focus();

        activateTab(tabs[nextIndex].dataset.tab, true);

    });

});


/* =============================
   Browser Back / Forward
============================= */

window.addEventListener("hashchange", () => {

    const hash = location.hash.substring(1);

    if (document.getElementById(hash)) {

        activateTab(hash);

    }

});


/* =============================
   Initial Page Load
============================= */

document.addEventListener("DOMContentLoaded", () => {

    const initialTab = location.hash.substring(1);

    if (document.getElementById(initialTab)) {

        activateTab(initialTab);

    } else {

        activateTab("academic");

    }

});

/* ============================
   Publication Search
============================ */

const searchBox = document.getElementById("publicationSearch");

if(searchBox){

searchBox.addEventListener("keyup", function(){

const keyword = this.value.toLowerCase();

const papers = document.querySelectorAll("#publicationList li");

papers.forEach(paper=>{

const text = paper.textContent.toLowerCase();

paper.style.display =
text.includes(keyword)
? ""
: "none";

});

});

}


/* ============================
   Back To Top
============================ */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

topBtn.style.display =
window.scrollY>300
?
"block"
:
"none";

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
