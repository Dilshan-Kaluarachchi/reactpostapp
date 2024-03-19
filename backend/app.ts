import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  users,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // sleep delay goes here
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((post) => post.id === id);

  // check if the post exists
  if (post) {
    const user = users.find((user) => user.id === post.userId);

    if (user) {
      // extract the username from the email
      const username = user.email.split("@")[0];

      const postData = { ...post, username };
      res.json(postData);
    } else {
      res.status(404).json({ error: "User not found" }); // send a 404 error if the user is not found
    }
  } else {
    res.status(404).json({ error: "Post not found" }); // send a 404 error if the post is not found
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.post("/api/posts/update", (req, res) => {
  try {
    const { id, values } = req.body;
    updatePost(id, values);
    res
      .status(200)
      .json({ success: true, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error occurred" });
  }
});

function updatePost(id: number, values: any) {
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex !== -1) {
    posts[postIndex] = {
      ...posts[postIndex],
      ...values,
    };
  } else {
    console.error(`Post with the id ${id} is not found`);
  }
}
app.listen(port, () => console.log("Server is running"));
