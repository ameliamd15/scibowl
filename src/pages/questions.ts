import {Component} from "@angular/core";
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  items;

  constructor(params: NavParams, public alertCtrl: AlertController) {
    for (var i = 0; i < params.data.questions.length; ++i) {
      var question = params.data.questions[i];
      if (question.choices) {
        question.multipleChoice = true;
        var keys = Object.keys(question.choices);
        question.choicesArray = [];
        for (var j = 0; j < keys.length; ++j) {
          question.choicesArray.push({
            option: keys[j],
            value: question.choices[keys[j]]
          })
        }
      }
    }
    this.items = params.data.questions;
  }

  showAnswer(item) {
    let alert = this.alertCtrl.create({
      title: 'Answer',
      subTitle: item.answer,
      buttons: ['OK']
    });
    alert.present();
  }
}
