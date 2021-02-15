'use strict'
// make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    console.log(`navbarHeight: ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link==null) {
        return;
    }
    scrollIntoView(link);
});

// scoll to contact when click on "contact me"
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', (event) => {
    scrollIntoView('#contact')
});

// make transparent home section when it scrolled
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
   home.style.opacity = 1 - window.scrollY/homeHeight;
    });

// Handle click on the arrow up button
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight/2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// filtering work projects
const categoryBtn = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project'); //프로젝트들을 배열로 받아옴

categoryBtn.addEventListener('click', (event) => {
    // data-filter 값 받아오기
    // 숫자를 누르면 dataset 값이 없으므로 부모 노드의 dataset 값을 받아온다
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // category filtering
    projects.forEach((project) => {
        console.log(project.dataset.category);
        if (filter==='*' || filter === project.dataset.category) {
            project.classList.remove('invisible');
        } else {
            project.classList.add('invisible');
        }

    });
});


// function
    function scrollIntoView(selector) {
        const scrollTo = document.querySelector(selector);
        scrollTo.scrollIntoView({behavior: "smooth"});
    }