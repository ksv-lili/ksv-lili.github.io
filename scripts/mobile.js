//File for all things mobile
var activeAnnotation;

function setActive() {
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
                strokeWidth: iOS() ? 4 : 1
            });
            activeAnnotation = annotation;
            annotation.show();
        }
    }
}

window.addEventListener("load", (e) => {
    if (iOS()) {
        let image = document.getElementById("background-image");
        image.style.backgroundAttachment = "scroll";
        return;
    }

    setActive();
});

function navigateMobile(slug) {
    if (iOS()) {
        window.location = window.location.origin + `${slug}`;
    }
    window.location.href = window.location.origin + `${slug}`;
}

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

var done = false;

function toggleOffCanvasMenu() {
    if (iOS() && !done) {
        setActive();
        done = true;
    }

    let offcanvasElementList = [].slice.call(
        document.querySelectorAll(".offcanvas")
    );
    let offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
        return new bootstrap.Offcanvas(offcanvasEl);
    });
    offcanvasList[0].toggle();
}

function toggleMobileDropdown(id) {
    try {
        activeAnnotation.hide();
    } catch (e) { }
    let dropdown_items = document.getElementById(id)
        .parentElement
        .querySelectorAll("a > h2");
    
    let parent = document.getElementById(id)
        .parentElement;
    
    let hide = document.getElementById(id)
        .parentElement
        .parentElement
        .childNodes;
    
    for (const el of hide) {
        if (el != parent && el.nodeName != "#text") {
            if (el.style.display == "none") {
                if (el.nodeName == "DIV") {
                    el.style.display = "grid";
                } else {
                    el.style.display = "";
                }
            } else {
                el.style.display = "none";
            }
        }
    }

    for (const item of dropdown_items) {
        if (item.style.display == "none") {
            item.style.display = "unset";
        } else {
            item.style.display = "none";
        }
    }
    try {
        activeAnnotation.show();
    } catch (e) { }
}
