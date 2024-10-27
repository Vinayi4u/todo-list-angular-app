import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from './dummy-tasks';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTask } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isTaskAdding = false;
  tasks = dummyTasks;

  get selectedUserTasks() {
    return this.tasks.filter((task) => task.userId === this.userId);
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  onStartAddTask() {
    this.isTaskAdding = true;
  }

  onCancelAddTask() {
    this.isTaskAdding = false;
  }
  onAddTask(taskData: NewTask) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      title: taskData.title,
      userId: this.userId,
      dueDate: taskData.date,
      summary: taskData.summary,
    });
    this.isTaskAdding = false;
  }
}
