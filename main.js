"use strict";

// NavBar 투명도 조정
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  window.scrollY > navbarHeight
    ? navbar.classList.add("navbar--dark")
    : navbar.classList.remove("navbar--dark");
});

// NavBar menu Scrolling
const navbarMenu = document.querySelector(".navbar__menu");
const navbarMenuItem = document.querySelectorAll(".navbar__menu__item");
navbarMenu.addEventListener("click", (e) => {
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) return;
  scrollIntoView(link);
  navbarMenu.classList.remove("open");
  selectNavItem(target);
});

// Navbar menu Toggle button
const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// "contact me" Btn Click시 footer로 스크롤
const contactMe = document.querySelector(".home__contact");
contactMe.addEventListener("click", () => {
  scrollIntoView("#contact");
  selectNavItem(navItems[navItems.length - 1]);
});

// 스크롤시 home section 투명도 조절
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow up Btn 스크롤 및 클릭시 동작
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  window.scrollY > homeHeight / 2
    ? arrowUp.classList.add("visible")
    : arrowUp.classList.remove("visible");
});

arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
  selectNavItem(navItems[0]);
});

// Work projects 필터링
const categoryBtn = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

categoryBtn.addEventListener("click", (event) => {
  /*
  data-filter 값 받아오기
  숫자를 누르면 dataset 값이 없으므로 부모 노드의 dataset 값을 받아온다
  */
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) return;

  // remove selection from the prvious item and select the current item
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

  // add animate
  projectContainer.classList.add("anim-out");

  setTimeout(() => {
    // category filtering
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.category) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// function
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

// 1. 모든 섹션 요소들을 가지고 온다
// 2. IntersectionObserver를 이용해서 모든 섹션을 관찰한다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#works",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 나갈때, 현재 화면에 조금이라도 들어와있는 section에만 callback함수 부르게
      console.log(entry);
      const index = sectionIds.indexOf(`#${entry.target.id}`); //현재 section id의 index
      if (entry.boundingClientRect.y < 0) {
        // 스크롤이 아래로 내려갈때
        selectedNavIndex = index + 1;
        console.log(entry.boundingClientRect.y);
      } else {
        // 스크롤이 위로 올라갈때
        // console.log(index);
        console.log(entry.boundingClientRect.y);
        selectedNavIndex = index - 1;
        // console.log(`y좌표 양수일때 ${selectedIndex}`);
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// window scrolling
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    // top일때
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    // bottom일때
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
