import { Task } from "../models/task.js";

export default class TaskController {
  tasksMap = new Map();
  isTaskLoaded = false;

  saveTask(req) {
    return new Promise((resolve, reject) => {
      if (
        !req.body.task_title ||
        !req.body.task_state ||
        !req.body.task_description
      ) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      const taskData = {
        task_id: req.body.task_id,
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_state: req.body.task_state,
      };
      TaskModel.insertTask(taskData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        this.isTaskLoaded = false;
        resolve(result);
      });
    });
  }

  updateTaskStatus(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.status) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      TaskModel.updateStatus(
        req.params.taskId,
        req.body.status,
        (err, result) => {
          if (err) {
            reject({ error: err });
          }
          this.isTaskLoaded = false;
          resolve(result);
        }
      );
    });
  }

  updateTaskDescription(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.description) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      TaskModel.updateDescription(
        req.params.taskId,
        req.body.description,
        (err, result) => {
          if (err) {
            reject({ error: err });
          }
          this.isTaskLoaded = false;
          resolve(result);
        }
      );
    });
  }

  saveSubtask(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.task_title || !req.body.task_state || !req.body.task_id) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      const subtaskData = {
        subtask_id: Math.floor(Math.random() * 100),
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_state: req.body.task_state,
        task_id: req.body.task_id,
      };
      TaskModel.insertSubtask(subtaskData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        this.isTaskLoaded = false;
        resolve(result);
      });
    });
  }

  loadAssignee() {
    // added
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.loadAssignee((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadTasks() {
    // added
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.loadTasks((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadTasksWithSearch(req) {
    let state = req.body.state;
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.loadTasksWithSearch(state, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadAllSubtasks() {
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.loadSubtasks((err, result) => {
        if (err) {
          reject({ error: err });
        }
        let subtaskArr;
        for (let subtask in result) {
          let task_id = subtask.fk_task_id;
          if (!this.tasksMap.has(task_id)) {
            subtaskArr = [subtask];
          } else {
            subtaskArr = this.tasksMap.get(task_id);
            subtaskArr.push(subtask);
          }
          this.tasksMap.set(task_id, subtaskArr);
        }
        resolve(result);
      });
    });
  }

  async loadSubtasks(taskId) {
    if (!this.isTaskLoaded) {
      try {
        await loadAllSubtasks();
      } catch (err) {
        console.log(err);
        return;
      }
      this.isTaskLoaded = true;
    }
    if (this.tasksMap.has(taskId)) {
      return this.tasksMap.get(taskId);
    } else {
      return [];
    }
  }

  deleteTask(id) {
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.deleteTask(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        this.isTaskLoaded = false;
        resolve(result);
      });
    });
  }

  deleteSubtask(id) {
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.deleteSubtask(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        this.isTaskLoaded = false;
        resolve(result);
      });
    });
  }
  
  loadSubtasksbyTaskId(taskId) {
  return new Promise((resolve, reject) => {
    const TaskModel = new Task();

    TaskModel.loadSubtasksByTaskId(taskId, (err, result) => {
      if (err) {
        reject({ error: err });
      }
      resolve(result);
    });
  });
}


}


