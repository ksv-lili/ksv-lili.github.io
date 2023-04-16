function scrollToNextH1() {
    let first_h1 = document.querySelector(".content > div > h1");
    first_h1.scrollIntoView({ behavior: "smooth", block: "center" });
}

function scrollToTitle(title) {
    let element = document.querySelector(title);

    const y = element.getBoundingClientRect().top + window.scrollY - document.getElementById("top").getBoundingClientRect().bottom - 20;
    setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 0);
}

function navigateToSlug(slug) {
    let page = slug.split("#")[0].replaceAll("/", "")
    let current = window.location.pathname.replaceAll("/", "");

    console.log(page);
    console.log(current);

    if (current !== page) {
        window.location = slug;
    }

    let header = slug.split("#")[1];

    console.log(header);

    scrollToTitle(`.${header}`);
}