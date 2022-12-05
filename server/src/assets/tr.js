const createReport = require("docx-templates").default;
const { readFileSync, writeFileSync } = require("fs");

const template = readFileSync("certificate-temlpate.docx");

const data = {
  Beers: [
    { Brand: "Carlsberg", Price: 1 },
    { Brand: "Leaf Blonde", Price: 2 },
    { Brand: "Weihenstephan", Price: 1.5 },
  ],
};

async function da() {
  const buffer = await createReport({
    template,
    data,
  });
  return buffer
}

let rr;
da().then(data => this.rr = data)

writeFileSync("report.docx", rr);
