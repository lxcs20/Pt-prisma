import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import PostServices from "./services";

dotenv.config();
const PORT: number = (process.env.PORT as unknown as number) || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const insPostServices = new PostServices();

app.get("/api/hello", (req: Request, res: Response) => {
  return res.json({
    message: "hello, world",
  });
});

app.get("/posts", async (req, res) => {
  const posts = await insPostServices.getPostsAll();
  return res.json(posts);
});
app.post("/post", async (req, res) => {
  try {
    let { title, content } = req.body;
    title = title as string;
    content = content as string;
    const data = {
      title: title as string,
      content: content as string,
    };
    // console.log(data);

    const post = await insPostServices.create(data);
    return res.json(post);
  } catch (error) {
    console.log(`errpr: `, error);
    return res.json({
      error,
    });
  }
});

app.use("*", (req, res) => {
  return res.status(404).json({
    message: `can't ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
