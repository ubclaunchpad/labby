import { Organization } from "../models/organization.js";

export default class OrganizationController {

  getOrganization() {
    return new Promise((resolve, reject) => {
      const OrganizationModel = new Organization();

      OrganizationModel.getOrganization((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteOrganization(id) {
    return new Promise((resolve, reject) => {
      const OrganizationModel = new Organization();

      OrganizationModel.deleteOrganization(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveOrganization(req) {
    return new Promise((resolve, reject) => {
      const OrganizationModel = new Organization();

      const organization = {
        organization_id: req.body.organization_id,
        organization_name: req.body.organization_name,
        organization_contact: req.body.organization_contact,
        organization_email: req.body.organization_email,
        organization_address: req.body.organization_address,
        organization_type: req.body.organization_type,
        internal_department: req.body.internal_department,
      };

      OrganizationModel.insertOrganization(organization, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}