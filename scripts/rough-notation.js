//File for all things RoughNotation

const dropdown_selector = "ul > li > a.dropdown-item > span";
let annotations = {};

function addRoughNotation(list) {
    let selectedTab = document.location.pathname.replaceAll("/", "");

    for (const option of list) {
        let tab = option.hasAttribute("href") ?
            option.getAttribute("href").replaceAll("/", "")
            : option.innerHTML;
        if (tab == selectedTab) {
            const annotation = RoughNotation.annotate(option, {
                type: "box",
                color: "#970000",
            });
            annotation.show();

            if (option.classList.contains("dropdown-toggle")) {
                let dropdown_options = option.parentElement.querySelectorAll(dropdown_selector);
                addRoughNotation(dropdown_options);
            }
        } else {
            annotations[tab] = RoughNotation.annotate(option, {
                type: "underline",
                color: "red",
            });

            if (option.classList.contains("dropdown-toggle")) {
                let dropdown_options = option.parentElement.querySelectorAll(dropdown_selector);
                addRoughNotation(dropdown_options);
            }

            if (option.tagName.toLowerCase() == "span") {
                option.parentElement.addEventListener("mouseover", function (e) {
                    annotations[tab].show();
                });

                option.parentElement.addEventListener("mouseleave", function (e) {
                    annotations[tab].hide();
                });
            }

            option.addEventListener("mouseover", function (e) {
                annotations[tab].show();
            });

            option.addEventListener("mouseleave", function (e) {
                annotations[tab].hide();
            });
        }
    }
}

window.addEventListener("load", (e) => {
    let name = document.getElementById("name");
    let name_underline = RoughNotation.annotate(name, {
        type: "underline",
        color: "red"
    });
    name.addEventListener("mouseover", function (e) {
        name_underline.show();
    });

    name.addEventListener("mouseleave", function (e) {
        name_underline.hide();
    });

    let tabOptionsDesktop = document.querySelectorAll("#menu > li > a");
    addRoughNotation(tabOptionsDesktop);
});
