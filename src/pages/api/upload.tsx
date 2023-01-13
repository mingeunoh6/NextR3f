import multer from "multer";
import path from "path";
import nc from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Wrong");
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    };
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 100 } });

const uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post((req, res) => {
  console.log("req", req.file);
  console.log("body", req.body);
  let filename = req.file.filename;
  res.status(200).send("Uploaded File");
});

export default handler;

// const uploadFile = upload.single("file");

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     console.log(req.data);
//     res.status(200).json({ result: "success" });
//   } else {
//     res.status(400).json({ result: "error" });
//   }
// }

// router.post("api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   const path = file.path.replace(/^public/, "");
//   return res.json({ path });
// });
