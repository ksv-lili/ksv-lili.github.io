//File for all things mobile
var activeAnnotation;

window.addEventListener("load", (e) => {
    if (iOS()) {
        let image = document.getElementById("background-image");
        image.style.backgroundAttachment = "scroll";
    }

    let selectedTab = document.location.pathname.replaceAll("/", "");

    let offCanvasElements = document.querySelectorAll("#offcanvas-menu > a");
    let offCanvasElementsDropdown = document.querySelectorAll("#offcanvas-menu > div > a");

    for (const option of [...offCanvasElements, ...offCanvasElementsDropdown]) {
        let tab = option.hasAttribute("href") ?
            option.getAttribute("href").replaceAll("/", "")
            : option.innerHTML;
            console.log(option);
        
        if (tab == selectedTab) {
            const annotation = RoughNotation.annotate(option.classList.contains("mobile-dropdown") ? option.querySelector("div") : option.querySelector("h1"), {
                type: "box",
                color: "#970000",
                animate: 0,
            });
            activeAnnotation = annotation;
            annotation.show();
        }
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
    activeAnnotation.hide();
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
    activeAnnotation.show();
}
