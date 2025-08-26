$(function () {
    $('header').load('/common/html/inc.html header > div');
    $('footer').load('/common/html/inc.html footer > div');
});

// mouse
$(document).mousemove(function (e) {

    let cursorWidth = $(".cursor").width() / 2;
    let cursorFWidth = $(".cursor").width() / 2;

    gsap.to(".cursor", {
        duration: 0.6,
        left: e.pageX - cursorWidth,
        top: e.pageY - cursorWidth
    });
    gsap.to(".cursor-follower", {
        duration: 1.6,
        left: e.pageX - cursorFWidth,
        top: e.pageY - cursorFWidth
    });
});

//slider
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let currentIndex = 1; // 복제 때문에 시작은 1번
    const totalSlides = slideItems.length;

    // 👉 앞뒤 클론 추가
    const firstClone = slideItems[0].cloneNode(true);
    const lastClone = slideItems[totalSlides - 1].cloneNode(true);
    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, slideItems[0]);

    const allSlides = document.querySelectorAll(".slides img");
    const slideCount = allSlides.length;

    // 👉 dot 생성
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i + 1)); // 클론 때문에 +1
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll("button");

    // 👉 슬라이드 폭 계산
    function getSlideWidth() {
        return document.querySelector(".slider").offsetWidth;
    }

    function updateSlide() {
        slides.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        // 복제 제외하고 실제 인덱스만 반영
        let dotIndex = currentIndex - 1;
        if (currentIndex === 0) dotIndex = totalSlides - 1;
        if (currentIndex === slideCount - 1) dotIndex = 0;
        dots[dotIndex].classList.add("active");
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
    }

    function nextSlide() {
        if (currentIndex >= slideCount - 1) return;
        currentIndex++;
        updateSlide();
    }

    function prevSlide() {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateSlide();
    }

    slides.addEventListener("transitionend", () => {
        if (allSlides[currentIndex].isSameNode(firstClone)) {
            slides.style.transition = "none";
            currentIndex = 1;
            updateSlide();
            setTimeout(() => slides.style.transition = "transform 0.5s ease-in-out");
        }
        if (allSlides[currentIndex].isSameNode(lastClone)) {
            slides.style.transition = "none";
            currentIndex = totalSlides;
            updateSlide();
            setTimeout(() => slides.style.transition = "transform 0.5s ease-in-out");
        }
    });

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // 자동 슬라이드
    let autoSlide = setInterval(nextSlide, 4000);

    // 마우스 올리면 멈춤, 벗어나면 재시작
    document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(autoSlide));
    document.querySelector(".slider").addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, 4000));

    // 처음 위치 세팅
    updateSlide();
    window.addEventListener("resize", updateSlide);
});