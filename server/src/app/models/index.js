import mongoose from "mongoose";
import User from "./user.model";
import Role from "./role.model";
import Employee from "./employee.model";
import EmployeesEducation from "./employeeEducation.model";
import FamilyMembers from "./employeeFamily.model";
import GrowthPlan from "./employeeGrowthPlan.model";

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
