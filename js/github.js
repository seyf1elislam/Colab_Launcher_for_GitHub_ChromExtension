// window.addEventListener("load", function () {
//document.addEventListener("DOMContentLoaded", function() {
window.onload = function () {
  curent_window_link = window.location.href;
  delay(3000);
  if (curent_window_link.slice(-6) == ".ipynb") {
    //this is a notebook link
    colab_link = getColabUrl_fromgitUrl(curent_window_link);
    document.querySelector(
      "#repos-sticky-header > div.Box-sc-g0xbh4-0.ePiodO > div.Box-sc-g0xbh4-0.bESQXL > div.Box-sc-g0xbh4-0.bfkNRF"
    ).innerHTML += getColabIcon(colab_link);
  } else {
    //this is not a notebook link
    //adding the colab button to all anchors
    anchors = document.querySelectorAll("a");
    anchors = Array.from(anchors).filter((a) => a.href.endsWith(".ipynb"));
    anchors.forEach((a) => {
      colab_link = getColabUrl_fromgitUrl(curent_window_link);

      //this so make it apreare only for the files list
      if (a.parentElement.className == "react-directory-truncate") {
        a.parentElement.parentElement.parentElement.parentElement.innerHTML +=
          getColabIcon(colab_link, 3);
      } else {
        a.innerHTML += getColabIcon(colab_link, 3);
      }
    });
  }
};

img1_link = "https://colab.research.google.com/assets/colab-badge.svg";
img2_link =
  "https://ssl.gstatic.com/colaboratory-static/common/3ff74a4cb562df03c356629330761cf9/img/favicon.ico";
img3_link = "";
function getColabIcon(colab_link, type = 1) {
  if (type == 1) {
    return `<a target="_blank" href="${colab_link}"><img src="${img1_link}" alt="Open In Colab" /></a>`;
  } else {
    return `<a target="_blank" href="${colab_link}"><img src="${img2_link}" alt="Open In Colab" width="20" height="20"/></a>`;
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
