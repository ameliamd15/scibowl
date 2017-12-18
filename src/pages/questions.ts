import {Component} from "@angular/core";
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {QuestionBank} from "../app/question-bank";

@Component({
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  items;
  pageLabel;
  constructor(params: NavParams, public alertCtrl: AlertController) {
    debugger;
    let questions = [];
    for (let i = 0; i < params.data.questionIndexes.length; ++i) {
      questions.push(QuestionBank.bank.allQuestions[params.data.questionIndexes[i]])
    }
    for (let i = 0; i < questions.length; ++i) {
      var question = questions[i];
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
    questions.sort(function(a,b){ return a.questionNumber - b.questionNumber;})
    this.items = questions;
    this.pageLabel = params.data.pageLabel;
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
