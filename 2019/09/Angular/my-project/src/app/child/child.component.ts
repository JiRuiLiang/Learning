import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  @Input() // 向外公开skill属性，用于组件通信
  skill = ''


  @Output() // 向外暴露事件
  getMoney = new EventEmitter()

  handleClick () {
    this.getMoney.emit('哈哈哈哈')
  }
}
