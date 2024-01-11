// window.addEventListener("load", function () {
//document.addEventListener("DOMContentLoaded", function() {
window.onload = function () {
  curent_window_link = window.location.href;
  delay(3000);
  if (curent_window_link.slice(-6) == ".ipynb") {
    console.log("this is a notebook");
    console.log("adding the colab button");
    colab_link = getColabUrl_fromgitUrl(curent_window_link);
    document.querySelector(
      "#repos-sticky-header > div.Box-sc-g0xbh4-0.ePiodO > div.Box-sc-g0xbh4-0.bESQXL > div.Box-sc-g0xbh4-0.bfkNRF"
    ).innerHTML += getColabIcon(colab_link);
  } else {
    console.log("this is not a notebook");
    console.log("adding the colab button to all anchors");
    anchors = document.querySelectorAll("a");
    anchors = Array.from(anchors).filter((a) => a.href.endsWith(".ipynb"));
    anchors.forEach((a) => {
      colab_link = getColabUrl_fromgitUrl(curent_window_link);

      //this so make it apreare only for the files list
      if (a.parentElement.className == "react-directory-truncate") {
        console.log("found the parent div");
        a.parentElement.parentElement.parentElement.parentElement.innerHTML +=
          getColabIcon(colab_link, 3);
      }
    });
  }
};

function getColabIcon(colab_link, type = 1) {
  if (type == 1) {
    return `<a target="_blank" href="${colab_link}"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a>`;
  } else {
    return `<a target="_blank" href="${colab_link}"><img src="https://ssl.gstatic.com/colaboratory-static/common/3ff74a4cb562df03c356629330761cf9/img/favicon.ico" alt="Open In Colab" width="20" height="20"/></a>`;
  }
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getColabUrl_fromgitUrl(curent_window_link) {
  colab_link = curent_window_link.replace(
    "https://github.com/",
    "https://colab.research.google.com/github/"
  );
  colab_link = colab_link.replace(" ", "_");
  return colab_link;
}
