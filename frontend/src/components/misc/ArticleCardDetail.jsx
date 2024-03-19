import { Card, Image, Avatar, Text, Group, Button } from '@mantine/core';
import classes from './ArticleCardDetail.module.css';
import { Link } from "react-router-dom";
import useBoundStore from '../../store/Store';

export function ArticleCardDetail({ id, title, category, image, content, userId, username }) {

  const { user } = useBoundStore();
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>

        <div className={classes.body}>
          <Text className={classes.title} mt="xs" mb="md">
            {title} by {username}
          </Text>
          {user.id === userId && (
            <Button>
              <Link to={`/posts/edit/${id.toString()}`}>Edit</Link>
            </Button>
          )}
          <br />
          <br />
          <br />
          <Group gap="xs" wrap="nowrap">
            <Text size="xs">Category: {category}</Text>
          </Group>
          <br />
          <Group gap="xs" wrap="nowrap">
            <Text size="xs">Description: {content}</Text>
          </Group>
          {/* </Group> */}
        </div>
        <Image
          src={image}
          height={300}
          width={200}
        />
      </Group>
      <div>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </div>

    </Card>
  );
}