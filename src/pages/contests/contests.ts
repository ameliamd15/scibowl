import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {QuestionService} from "../../app/question.service";
import {Question} from "../../app/question";
import {QuestionsPage} from "../questions";

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
    me.questionService.getQuestions()
      .subscribe(questions => {
        let label: string;
        me.questions = questions;
        for (var i = 0; i < me.questions.length; ++i) {
          label = questions[i].round + " (" + questions[i].file + ")";
          if (!me.contests[label]) {
            me.items.push({
              title: label, color:'#F46529', icon:'aperture'
            });
            me.contests[label] = [];
          }
          me.contests[label].push(questions[i]);
        }
        me.items.sort(function(a, b){return a.title.localeCompare(b.title);})
      });


  }

  openContestPage(item) {
    this.nav.push(QuestionsPage, { questions: this.contests[item.title] });
  }
}
