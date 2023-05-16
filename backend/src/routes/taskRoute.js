import { Router } from "express";
import authorize from "../auth/authorize.js";
import TaskController from "../controllers/taskController.js";

const router = Router();
const taskController = new TaskController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  taskController
    .saveTask(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/status/:taskId", authorize(), (req, res) => {
  taskController
    .updateTaskStatus(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/title/:taskId", authorize(), (req, res) => {
  taskController
    .updateTaskTitle(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/description/:taskId", authorize(), (req, res) => {
  taskController
    .updateTaskDescription(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//add subtask given task_id
router.post("/addsubtask/:taskId", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  taskController
    .saveSubtaskByTask(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//edit subtask status
router.post("/subtask/status/:subtaskId", authorize(), (req, res) => {
  taskController
    .updateSubtaskStatus(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/", authorize(), (_, res) => {
  taskController
    .loadTasks()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/assignee", authorize(), (_, res) => {
  taskController
    .loadAssignee()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/search", authorize(), (req, res) => {
  taskController
    .loadTasksWithSearch(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/subtasks", authorize(), (_, res) => {
  taskController
    .loadAllSubtasks()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/subtask/:subtaskId", authorize(), (_, res) => {
  taskController
    .loadSubtasks(req.params.subtaskId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

//load subtasks for given taskId
router.get("/subtasks/:taskId", authorize(), (req, res) => {
  taskController
    .loadSubtasksWithID(req.params.taskId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:taskId", authorize(), (req, res) => {
  questionController
    .deleteTask(req.params.taskId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/subtask/:subtaskId", authorize(), (req, res) => {
  questionController
    .deleteSubtask(req.params.subtaskId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;