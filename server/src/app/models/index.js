import mongoose from "mongoose";
Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import User from './user.model'
db.user = User;

import Role from './role.model'
db.role = Role;

import Employee from './employee.model'
db.employee = Employee;

import EmployeesEducation from './employeeEducation.model'
db.employeeEducation = EmployeesEducation;

import FamilyMembers from './employeeFamily.model'
db.employeeFamily = FamilyMembers;

import GrowthPlan from './employeeGrowthPlan.model'
db.growthPlan = GrowthPlan;

db.ROLES = ["user", "admin", "moderator"];

export default db;
