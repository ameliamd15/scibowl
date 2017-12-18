import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionsPage} from "../questions";
import {Question} from "../../app/question";
import {QuestionService} from "../../app/question.service";
import {QuestionBank} from "../../app/question-bank";

@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html'
})
export class TopicsPage {

  items = [];
  questions: Question[];
  contests = {};

  constructor(public nav: NavController, private questionService: QuestionService) {
    let me = this;
    let topics = Object.keys(QuestionBank.bank.questionsByCategory).sort(), sets = {"Topics": []};

    for (var i = 0; i < topics.length; ++i) {
      sets["Topics"].push({
        label: topics[i],
        key: topics[i],
        count: QuestionBank.bank.questionsByCategory[topics[i]].length
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
    this.nav.push(QuestionsPage, { viewMode: 1, pageLabel: round.label, questionIndexes: QuestionBank.bank.questionsByCategory[round.key] });
  }

}
