export default class Argus {
  static commentButtonsList = "#history_tabs-history_form-changes_checkbox_panel > div.ui-selectcheckboxmenu-items-wrapper > ul";
  static deviceLocation = '.entity';
  static openDecisionListButton = document.querySelector("#signal_form-available_transitions > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right");
  static decideButton = document.querySelector("#signal_form-compleate");

  static removeComments() {
    let checkBoxes = document.querySelector(Argus.commentButtonsList).querySelectorAll('.ui-helper-hidden-accessible');
    for (let checkBox of checkBoxes) {
      checkBox.firstElementChild.click();
    }
  }

  static addComment(msg) {
    let messageField = document.querySelector("#history_tabs-history_form-new_comment");
    messageField.value = msg;
    document.querySelector("#history_tabs-history_form-add_comment").click();
  }

  static getDataGroupDamage() {
    let incident = myDecoder.decode('Номер обращения: ') + Number(document.querySelector("#bi_header-header_frame > h3 > span.heading-accent").textContent.replace(/\D+/g, ""));
    let personalAccount = myDecoder.decode('Лицевой счет: ') + Number(document.querySelector("#installation_edit_form > div > dl > dd:nth-child(2)").textContent.replace(/\D+/g, ""));
    let address = myDecoder.decode('Адрес: ') + myDecoder.decode(document.querySelector("#client_address").textContent.trim());
    let location = document.querySelector(Argus.deviceLocation);
    let device = document.querySelector("#inst_tab_view-st_eq-acc_dev > span.entity");
    let locationText = '';
    let deviceText = '';
    if (location && device) {
      locationText = myDecoder.decode('Расположение: ') + myDecoder.decode(location.textContent);
      deviceText = myDecoder.decode('Оборудование: ') + myDecoder.decode(device.textContent);
    }
    let result = `mailto:Andrey.Danilenko@nw.rt.ru; Maksim.Kozlov@nw.rt.ru&cc=Marina.Korkina@nw.rt.ru; Mariya.A.Ischenko@nw.rt.ru&body=${incident}%0D%0A${personalAccount}%0D%0A${address}%0D%0A${locationText}%0D%0A${deviceText}%0D%0A${myDecoder.decode('Плата: ')}%0D%0A${myDecoder.decode('Порт: ')}%0D%0A${myDecoder.decode('Описание: ')}?subject=${myDecoder.decode("Эскалация ГП")}`;
    window.open(result);
  }

  static makeDecision(decision) {
    Argus.openDecisionListButton.click();
    let decisionList = document.querySelector("#signal_form-available_transitions_items").children;
    for (const item of decisionList) {
      if (item.textContent === decision) {
        item.click();
      }
    }
    if (decision === 'Передать в КДГ (диагностика)') {
      let checkKdgUnitsList = "#signal_form-possibleAssignment_input";
      doIfExist(checkKdgUnitsList, () => {
        let kdgUnitsList = document.querySelector("#signal_form-possibleAssignment_input");
        for (const unit of kdgUnitsList) {
          if (unit.textContent === 'КДО СЗ B2C') {
            kdgUnitsList.selectedIndex = unit.index
            Argus.decideButton.dispatchEvent(new Event("click"));
          }
        }
      });
      let checkSaveDecisionButton = "#j_idt2662-save";
      doIfExist(checkSaveDecisionButton, () => {
        let completedWorkButton = document.querySelector("#signal_process_dialog_form-transfer_problem_close_work > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right");
        completedWorkButton.dispatchEvent(new Event("click"));
        let completeWorkList = document.querySelector("#signal_process_dialog_form-transfer_problem_close_work_input");
        completeWorkList.selectedIndex = 1;
        let transferReasonList = document.querySelector("#signal_process_dialog_form-transfer_problem_transfer_reason_input");
        transferReasonList.selectedIndex = 6;
        let saveDecisionButton = document.querySelector("#j_idt2662-save");
        //saveDecisionButton.dispatchEvent(new Event("click"));
      }, 100, 50);
    } else if (decision === 'Закрыть') {
      Argus.decideButton.dispatchEvent(new Event("click"));
    }
  }

  static visit(comment) {
    let tech = document.querySelector("#client_tech").textContent;
    let visitType;
    if (tech.indexOf('MSAN') != -1 || tech.indexOf('ADSL') != -1) {
      visitType = 'ЛИН-Передано на линию по заявке абонента';
    } else {
      visitType = '05-Наряд на оборудование клиента';
    }
    let visitButton = document.querySelector("#incident_form-information-register_problem_btn");
    visitButton.click();
    let checkVisitTypeField = "#create_problem_form-problem_type_list_label"
    doIfExist(checkVisitTypeField, () => {
      let openVisitTypeButton = document.querySelector("#create_problem_form-problem_type_list > div.ui-selectonemenu-trigger.ui-state-default.ui-corner-right");
      openVisitTypeButton.click();
      let visitTypeList = document.querySelector("#create_problem_form-problem_type_list_items").children;
      for (const type of visitTypeList) {
        if (type.textContent === visitType) {
          type.click();
          break;
        }
      }
      setTimeout(() => {
        let commentField = document.getElementById("create_problem_form-new_comment");
        commentField.value = comment;
      }, 1000);


    });
  }

  static waitGP() {
    let reassignButton = document.querySelector("#bi_header-assignTask");
    reassignButton.click();
    let checkUnitsList = "#reassign_dialog_form-select_worksite_input";
    doIfExist(checkUnitsList, () => {
      let unitsList = document.querySelector("#reassign_dialog_form-select_worksite_input");
      for (const unit of unitsList) {
        if (unit.textContent.indexOf('Ожидание') != -1) {
          unitsList.selectedIndex = unit.index;
          break
        }
      }
      let saveReassignButton = document.querySelector("#reassign_dialog_form-reassign");
      saveReassignButton.click();
    });
  }
}

