import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { ArticleCardDetail } from "../../components/misc/ArticleCardDetail";


function PostDetailsPage() {
  const post = useLoaderData();


  return (
    <>
      <Container>
        <p>This page shows details for {post.title}</p>
        <ArticleCardDetail key={post.title} {...post} />
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id.toString()}`);
  return res.data;
};

export default PostDetailsPage;
