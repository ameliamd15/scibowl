import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionService} from "../../app/question.service";
import {Question} from "../../app/question";
import {QuestionsPage} from "../questions";
import {QuestionBank} from "../../app/question-bank";

@Component({
  selector: 'page-contests',
  templateUrl: 'contests.html'
})
export class ContestsPage {

  items = [];
  questions: Question[];
  contests = {};

  constructor(public nav: NavController, private questionService: QuestionService) {
    let me = this;
    let contests = Object.keys(QuestionBank.bank.questionsByContest).sort(), sets = {};

    for (var i = 0; i < contests.length; ++i) {
      let split = contests[i].split("#");
      if (!sets[split[1]]) sets[split[1]] = [];

      sets[split[1]].push({
        label: split[2],
        key: contests[i]
      });
    }

    var setKeys = Object.keys(sets);
    for (var i = 0; i < setKeys.length; ++i) {
      if (setKeys[i].indexOf("Set") == 0) {
        sets[setKeys[i]].sort(function (a, b) {
          return a.label.split(' ')[1] - b.label.split(' ')[1];
        });
      }
      this.items.push({
        group: setKeys[i],
        rounds: sets[setKeys[i]]
      });
    }
  }

  openContestPage(round) {
    this.nav.push(QuestionsPage, { pageLabel: round.label, questionIndexes: QuestionBank.bank.questionsByContest[round.key] });
  }
}
