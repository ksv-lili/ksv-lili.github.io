window.addEventListener("load", (e) => {
    let title = window.location.hash;
    title = title.replace("#", ".");
    let element = document.querySelector(title);

    const y = element.getBoundingClientRect().top + window.scrollY - document.getElementById("top").getBoundingClientRect().bottom - 30;
    setTimeout(() => {
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, 0);
});
