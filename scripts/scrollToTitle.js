window.addEventListener("load", (e) => {
    try {
        let title = window.location.hash;
        title = title.replace("#", ".");
        scrollToTitle(title);
    } catch (e) {}
});
