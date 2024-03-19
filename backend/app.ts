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
  // Sleep delay goes here
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  //const id = req.params.id;
  // The line below should be fixed.
  //res.json(posts[0]);
  // Find the post with the specified ID
  const id = parseInt(req.params.id,10);
  const post = posts.find(post => post.id === id);

// Check if the post with the given ID exists
  if (post) {
    // Find the user associated with the userId in the post
    const user = users.find(user => user.id === post.userId);

    if (user) {
      // Extract the username from the user email
      const username = user.email.split('@')[0];

      // Combine post and username data into a single object
      const postData = { ...post, username };
      res.json(postData); // Send the post data with username as JSON response
    } else {
      res.status(404).json({ error: 'User not found' }); // Send a 404 error if the user is not found
    }
  } else {
    res.status(404).json({ error: 'Post not found' }); // Send a 404 error if the post is not found
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

// 2024-03-10  START
app.post("/api/posts/update", (req, res) => {
 
  try {
    const { id, values } = req.body; // Assuming your request body contains the id of the post and the updated values
    // Update the post in your database or wherever you're storing posts
    // For now, let's assume you have a function to update posts
    // You can replace this with your actual logic to update the posts
    updatePost(id, values);
    res.status(200).json({ success: true, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


function updatePost(id: number, values: any) {
  console.log("Inside updatePost: ", id);
  // Find the post with the given id
  const postIndex = posts.findIndex(post => post.id === id);

  // If the post with the given id exists
  if (postIndex !== -1) {
      // Update the post properties with the provided values
      posts[postIndex] = {
          ...posts[postIndex], // Keep existing properties
          ...values // Update with new values
      };
  } else {
      // Handle case where post with the given id doesn't exist
      console.error(`Post with id ${id} not found`);
  }
}

// 2024-03-10  END

app.listen(port, () => console.log("Server is running"));
