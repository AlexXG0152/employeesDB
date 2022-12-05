import fs from "fs";
import { createReport } from "docx-templates";
import asyncHandler from "express-async-handler";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

export const download = asyncHandler(async (req, res) => {
  try {
    const template = fs.readFileSync(
      __dirname + "/src/assets/certificate-temlpate.docx"
    );

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
      __dirname +
        `/src/assets/temp/[Certificate-work-place]-${
          employee.employee.personalData.lastName
        }_${employee.employee.personalData.firstName}-${Math.floor(
          Math.random() * 10000000000000
        )}.docx`,
      buffer
    );
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
});
