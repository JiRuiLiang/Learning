import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-project';
  todos = [
    {id: 1, name: '完成', done: true},
    {id: 2, name: '休息', done: false},
    {id: 3, name: '工作', done: true}
  ]
  msg = this.todos[0].name
  todoName = ''
  trackByToDo(index, item) {
    return item.id
  }
  add () {
    // console.log(this.todoName)
    if(this.todoName.trim() === '') {
      return
    }
    let id
    if (this.todos.length === 0) {
      id = 1
    } else {
      id = this.todos[this.todos.length-1].id + 1
    }
    this.msg = this.todoName
  this.todos.push({
      id:id,
      name: this.todoName,
      done: false
    })
    this.todoName = ''
  }

  deleClick (id, e) {
    e.preventDefault()
    this.todos.splice(id, 1)
  }

  toggle (e, id) {
    e.preventDefault()
    this.todos[id].done = !this.todos[id].done
    this.msg = this.todos[id].name
  }

  giveMoney (e) {
    console.log(e)
  }
}
