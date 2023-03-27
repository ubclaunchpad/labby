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
        fk_survey_id: req.body.fk_survey_id,
        fk_form_id: req.body.fk_form_id,
        fk_project_id: req.body.fk_project_id,
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

  //add subtask given taskID
  saveSubtaskByTask(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.subtask_title || !req.body.subtask_state || !req.params.taskId) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      const subtaskData = {
        subtask_id: req.body.subtask_id,
        subtask_title: req.body.subtask_title,
        subtask_description: req.body.subtask_description,
        subtask_state: req.body.subtask_state,
        // task_id: req.params.taskId,
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

  updateSubtaskStatus(req) {
    return new Promise((resolve, reject) => {
      if (!req.body.status) {
        return reject({ error: "Error with request body." });
      }
      const TaskModel = new Task();
      TaskModel.updateSubtaskStatus(
        req.params.subtaskId,
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

  loadSubtasksWithID(taskId) {
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

  filterTasksByProject(req) {
    return new Promise((resolve, reject) => {
      const TaskModel = new Task();
      TaskModel.filterTasksByProject(req.params.projectId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
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
}