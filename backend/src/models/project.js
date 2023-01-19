import con from "../config/Database.js";

export class Project {
  loadProjectCall(result) {
    con.query("CALL load_project", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadProjectAssignment(result) {
    con.query("CALL load_organization_projects", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  saveProjectAssignment(projectAssignment, result) {
    con.query(
      "CALL save_organization_projects(?,?,?)",
      [
        projectAssignment.assignment_id,
        projectAssignment.project_id,
        projectAssignment.organization_id,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  deleteProjectAssignment(organizationId, result) {
    con.query(
      "CALL delete_organization_projects(?)",
      organizationId,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  deleteProject(projectId, result) {
    con.query("CALL delete_project(?)", projectId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  saveProject(project, result) {
    con.query(
      "CALL save_project(?,?,?)",
      [
        project.project_id,
        project.project_name,
        project.project_description,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }
}
