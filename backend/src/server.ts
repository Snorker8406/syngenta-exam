import express, { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import { textWordsAnalisys } from "./syngentaExamQuestion2";

const app = express();
const PORT = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // File size limit: 20MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /txt/; // Only accept .txt files
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = file.mimetype === "text/plain";

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only .txt files are allowed."));
    }
  },
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>File Upload Server</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload File</button>
    </form>
    <br>
    <a href="/files">View Uploaded Files</a>
  `);
});

// Route to handle file upload
app.post("/api/upload", upload.single("file"), async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send({
      message: "No file uploaded.",
    });
    return;
  }
  
  const uploadedFilePath = path.join(__dirname, "..", "uploads", req.file.filename);

  res.status(200).send({
    message: "Text file recibed and ready to be analized.",
    file: req.file.originalname, // Return the original file name
    words: await textWordsAnalisys(uploadedFilePath), //PROCESSING THE FILE
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MulterError) {
    res.status(400).send({
      message: "Error uploading the file.",
      error: err.message,
    });
  } else if (err) {
    res.status(500).send({
      message: "Server error.",
      error: err.message,
    });
  } else {
    next();
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});