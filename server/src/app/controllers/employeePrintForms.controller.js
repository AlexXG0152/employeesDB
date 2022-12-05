const fs = require("fs");
const asyncHandler = require("express-async-handler");


exports.download = asyncHandler(async (req, res) => {
  // const importDotx = new ImportDotx();
  // const filePath = "../server/src/assets/certificate-temlpate.docx";

  // fs.readFile(filePath, { encoding: "binary" }, (err, data) => {
  //   if (err) {
  //     throw new Error(`Failed to read file ${filePath}.`);
  //   }

  //   importDotx.extract(data).then((templateDocument) => {
  //     const doc = new Document(
  //       {
  //         sections: [
  //           {
  //             headers: templateDocument.headers,
  //             properties: {
  //               titlePage: templateDocument.titlePageIsDefined,
  //             },
  //             children: [new Paragraph("Hello World")],
  //           },
  //         ],
  //       }, 
  //       {
  //         template: templateDocument,
  //       }
  //     );

  //     Packer.toBuffer(doc).then((buffer) => {
  //       fs.writeFileSync(`../server/src/assets/kkk.docx`, buffer);
  //     });
  //   });
  // });
});
