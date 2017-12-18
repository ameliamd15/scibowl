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
  mode = 0;
  color = 'black';
  viewMode;
  pages = 0;
  currentPage = 0;
  questions = [];
  constructor(params: NavParams, public alertCtrl: AlertController) {
    debugger;
    for (let i = 0; i < params.data.questionIndexes.length; ++i) {
      if (QuestionBank.bank.allQuestions[params.data.questionIndexes[i] - 1])
        this.questions.push(QuestionBank.bank.allQuestions[params.data.questionIndexes[i] - 1])
    }
    for (let i = 0; i < this.questions.length; ++i) {
      var question = this.questions[i];

      if (question && question.choices && Object.keys(question.choices).length > 0) {
        question.multipleChoice = true;
        let keys = Object.keys(question.choices);
        question.choicesArray = [];
        for (let j = 0; j < keys.length; ++j) {
          question.choicesArray.push({
            option: keys[j],
            value: question.choices[keys[j]]
          })
        }
      }
      else if (question) question.multipleChoice = false;
    }


    this.pageLabel = params.data.pageLabel;
    this.viewMode = params.data.viewMode;

    if (this.viewMode == 0) {
      this.questions.sort(function(a,b){ return a.questionNumber - b.questionNumber;})
    }
    else {
      this.questions.sort(function(a,b){
        if (a.setIndex != b.setIndex) return a.setIndex - b.setIndex;
        else if (a.round != b.round) {
          if (a.questionSet.indexOf('Set') == 0)
            return a.round.split(' ')[1] - b.round.split(' ')[1];
          else return (a.round.localeCompare(b.round));
        }
        else return a.questionNumber - b.questionNumber;
      })
    }
    this.pages = Math.floor(this.questions.length / 50);
    this.currentPage = 1;
    if (this.questions.length >= 50) {
      this.items = this.questions.slice(0, 50);
    }
    else this.items = this.questions;
  }

  showAnswer(item) {
    let alert = this.alertCtrl.create({
      title: 'Answer',
      subTitle: item.answer,
      buttons: ['OK']
    });
    alert.present();
  }

  toggleMode() {
    this.mode = this.mode ? 0 : 1;
    this.color = this.mode ? 'blue' : 'black';
  }

  previous(){
    if (this.currentPage > 1) --this.currentPage;
    this.items = this.questions.slice(this.currentPage * 50, Math.min((this.currentPage + 1) * 50, this.questions.length));
  }

  next() {
    if (this.currentPage < this.pages) ++this.currentPage;
    this.items = this.questions.slice(this.currentPage * 50, Math.min((this.currentPage + 1) * 50, this.questions.length));
  }
}
