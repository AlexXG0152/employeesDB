import fs from "fs";
import { createReport } from "docx-templates";
import asyncHandler from "express-async-handler";
import path from "path";

const __dirname = path.resolve(path.dirname(""));

export const create = asyncHandler(async (req, res) => {
  try {
    const template = fs.readFileSync(
      __dirname + "/src/assets/certificate-temlpate.docx"
    );

    // const employee = {
    //   employee: {
    //     department: "template department",
    //     occupation: "template occupation",
    //     personalData: {
    //       firstName: "John",
    //       lastName: "Johnsson",
    //       since: "01.03.1977",
    //     },
    //     date: new Date().toLocaleDateString(),
    //   },
    // };

    const employee = {employee:req.body};

    const buffer = await createReport({
      template,
      data: employee,
    });
    const fileName = `${__dirname}/src/assets/temp/[Certificate-work-place]-${
      employee.employee.personalData.lastName
    }_${employee.employee.personalData.firstName}-${Math.floor(
      Math.random() * 10000000000000
    )}.docx`;

    if (!fs.existsSync(`${__dirname}/src/assets/temp/`)) {
      fs.mkdirSync(`${__dirname}/src/assets/temp/`);
    }

    fs.writeFileSync(fileName, buffer);
    res.status(200).json(fileName);
  } catch (error) {
    console.log(error);
  }
});

export const send = asyncHandler(async (req, res) => {
  try {
    const fileName = req.params.fileName;
    res.sendFile(`${__dirname}/src/assets/temp/${fileName}`, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("File Sent:", fileName);
        check();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

async function check() {
  fs.readdir(`${__dirname}/src/assets/temp/`, (err, files) => {
    console.log(files.length);
    if (files.length > 30) {
      fs.rm(
        `${__dirname}/src/assets/temp/`,
        { recursive: true, force: true, age: { seconds: 3600 } },
        (err) => {
          if (err) {
            throw err;
          }
          console.log(`${__dirname}/src/assets/temp/ is deleted!`);
        }
      );
    }
  });
}
