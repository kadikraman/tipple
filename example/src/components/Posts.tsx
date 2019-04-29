import { Spin, Button } from 'antd';
import React, { FC } from 'react';
import { useFetch, many } from 'tipple';
import { Post } from './Post';

export const Posts: FC = () => {
  const [posts, refetch] = useFetch<PostData[]>('/posts', {
    domains: [many('posts')],
  });

  if (posts.fetching && posts.data === undefined) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (posts.error !== undefined || posts.data === undefined) {
    return <div>Error!</div>;
  }

  return (
    <>
      {posts.data.map(post => (
        <Post key={post.id} post={post} />
      ))}
      {/* 
      // @ts-ignore */}
      <Button onClick={refetch}>Refetch</Button>
    </>
  );
};
