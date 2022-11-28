export default class Sipal {
  static getInfo() {
    let copyButton = document.querySelector("body > div.webix_view.webix_scrollview > div > div > div.webix_view.webix_layout_wide > div.webix_view.webix_layout_clean > div.webix_view.webix_layout_clean > div.webix_view.webix_multiview > div > div.webix_view.webix_layout_space > div:nth-child(2) > div").lastElementChild.lastElementChild;
    copyButton.click();
    let info = document.querySelector("body > div:nth-child(80) > div > div.webix_win_body > div > div > div.webix_view.webix_control.webix_el_textarea > div").firstElementChild;
    info.select();
    document.execCommand("copy");
    let buttonClose = document.querySelector("body > div:nth-child(80) > div > div.webix_win_body > div > div > div.webix_view.webix_control.webix_el_button > div > button");
    buttonClose.click();
  }
}
