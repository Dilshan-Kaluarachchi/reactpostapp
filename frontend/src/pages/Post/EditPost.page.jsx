import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate } from "react-router-dom";

function EditPostPage() {
    const postData = useLoaderData();
    const navigate = useNavigate();
    const form = useForm({
    initialValues: {
      title: postData.title,
      category: postData.category,
      image: postData.image,
      content: postData.content,
    },
  });

  const handleSubmit = async (values) => {
    //const res = await axios.post(`${DOMAIN}/api/posts/update/`, values);
    //console.log("Inside handleSubmit: "{id});
    console.log("Inside handleSubmit: ", postData.id);
    //const res = await axios.post(`${DOMAIN}/api/posts/update`, { postData.id, values });
    const res = await axios.post(`${DOMAIN}/api/posts/update`, { id: postData.id, values });

    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
          {/* <Button type="submit"> */}
          {/* Use Link component to navigate to {`/posts/edit/${id.toString()}`} */}
          {/* <Link to={`/posts/update/${id.toString()}`}>Update</Link> */}
            {/* </Button> */}
        </Group>
      </form>
    </Box>
  );
}

export default EditPostPage;
