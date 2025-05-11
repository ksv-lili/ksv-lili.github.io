//File for all things RoughNotation

const dropdown_selector = "ul > li > a.dropdown-item > span";
let annotations = {};

function addRoughNotation(list) {
  let selectedTab = document.location.pathname.replaceAll("/", "");

  for (const option of list) {
    let tab = option.hasAttribute("href")
      ? option.getAttribute("href").replaceAll("/", "")
      : option.innerHTML;
    if (tab == selectedTab) {
      const annotation = RoughNotation.annotate(option, {
        type: "box",
        color: "#970000",
      });
      annotation.show();

      if (option.classList.contains("dropdown-toggle")) {
        let dropdown_options =
          option.parentElement.querySelectorAll(dropdown_selector);
        addRoughNotation(dropdown_options);
      }
    } else {
      annotations[tab] = RoughNotation.annotate(option, {
        type: "underline",
        color: "red",
      });

      if (option.classList.contains("dropdown-toggle")) {
        let dropdown_options =
          option.parentElement.querySelectorAll(dropdown_selector);
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
    color: "red",
  });
  name.addEventListener("mouseover", function (e) {
    name_underline.show();
  });

  name.addEventListener("mouseleave", function (e) {
    name_underline.hide();
  });

  let tabOptionsDesktop = document.querySelectorAll("#menu > li > a");
  addRoughNotation(tabOptionsDesktop);

  let headings = document
    .querySelector("#content-actual")
    .querySelectorAll("h2");
  headings.forEach((el) => {
    RoughNotation.annotate(el, {
      type: "highlight",
      color: "#ffc107",
    }).show();
  });

  let buttons = document.querySelectorAll(".btn.rough-hover");
  buttons.forEach((btn) => {
    let btn_box = RoughNotation.annotate(btn, {
        type: "box",
        color: "black",
        strokeWidth: 7,
        padding: [20, 30, 30, 20]
    });
    btn.addEventListener("mouseover", function (e) {
      btn_box.show();
    });

    btn.addEventListener("mouseleave", function (e) {
      btn_box.hide();
    });
  });
});