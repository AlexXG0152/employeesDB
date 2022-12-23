import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import Employee from "./employee.model.js";
import EmployeesEducation from "./employeeEducation.model.js";
import FamilyMembers from "./employeeFamily.model.js";
import GrowthPlan from "./employeeGrowthPlan.model.js";

Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.employee = Employee;
db.employeeEducation = EmployeesEducation;
db.employeeFamily = FamilyMembers;
db.growthPlan = GrowthPlan;

db.ROLES = ["user", "admin", "moderator"];

export default db;
