function scrollToNextH1() {
    let first_h1 = document.querySelector(".content > div > h1");
    first_h1.scrollIntoView({ behavior: "smooth", block: "center" });
}