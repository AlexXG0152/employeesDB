import { createReport } from "docx-templates";
import fs from "fs";

const template = fs.readFileSync("certificate-temlpate.docx");

const employee = {
  employee: {
    department: "template department",
    occupation: "template occupation",
    personalData: {
      firstName: "John",
      lastName: "Johnsson",
      since: "01.03.1977",
    },
    date: new Date().toLocaleDateString(),
  },
};

const buffer = await createReport({
  template,
  data: employee,
});

fs.writeFileSync(
  `./temp/certificate-work-place-${employee.employee.personalData.lastName}_${
    employee.employee.personalData.firstName
  }_${Math.floor(Math.random() * 10000000000000)}.docx`,
  buffer
);
