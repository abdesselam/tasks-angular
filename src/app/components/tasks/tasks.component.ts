import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  myTask : Task = {
      label : "",
      completed : false  
  }
  tasks : Task[] = [] ;
  resultTasks : Task[] = [] ;
  editForm= false;
  showForm = false;
  searchText = ""

  constructor( private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }


  getTasks(){
    this.taskService.findAll()
        .subscribe(
         tasks => this.resultTasks = this.tasks = tasks
        )
  }
  deleteTask(id? :number){
    this.taskService.delete(id).subscribe(
      ()=>{
        this.resultTasks = this.tasks = this.tasks.filter(task=>task.id != id)
      }
    )
  }
persistTask(){
  this.taskService.persist(this.myTask).subscribe(
    task => {
      this.resultTasks = this.tasks = [task,...this.tasks]
      this.restTask();
      this.showForm = false;
    }
  )
}
restTask(){
  this.myTask ={
    label:"",
    completed:false
  }
}
toggleCmpleted(task: Task){
  this.taskService.completed(task).subscribe(
    (taskT)=>{
      task.completed = taskT.completed
    }
  )
}
editTask(task: Task){
  this.myTask = task;
  this.editForm = true;
  this.showForm = true;
}
updateTask(){
    this.taskService.update(this.myTask).subscribe(
      task => {
        this.restTask();
        this.editForm = false;
        this.showForm = false;
      }
    )
}
searchTasks(){
  this.resultTasks = this.tasks.filter((task)=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))
}


}
