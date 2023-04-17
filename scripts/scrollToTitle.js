window.addEventListener("load", (e) => {
    setTimeout(() => {
        try {
            let title = window.location.hash;
            title = title.replace("#", ".");
            if (title == "") return
            scrollToTitle(title);
        } catch (e) { }
    }, 100);
});
