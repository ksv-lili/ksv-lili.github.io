//File for all things mobile

window.addEventListener("load", (e) => {
    if (iOS()) {
        let image = document.getElementById("background-image");
        image.style.backgroundAttachment = "scroll";
    }
});

function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

function toggleOffCanvasMenu() {
    let offcanvasElementList = [].slice.call(
        document.querySelectorAll(".offcanvas")
    );
    let offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new bootstrap.Offcanvas(offcanvasEl);
    });
    offcanvasList[0].toggle();
}

function toggleMobileDropdown(id) {
    let dropdown_items = document.getElementById(id)
        .parentElement
        .querySelectorAll("a > h2");

    for (const item of dropdown_items) {
        if (item.style.display == "none") {
            item.style.display = "unset";
        } else {
            item.style.display = "none";
        }
    }
}
