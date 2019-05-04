import { Card, Button, Input, Row, Col } from 'antd';
import React, { useState, useCallback, useRef } from 'react';
import { usePush, single } from 'tipple';

export const AddPost = () => {
  const [body, setBody] = useState<any>({ author: 'user', title: '' });
  const [response, addPost, clearResponse] = usePush<PostData>('/posts', {
    domains: post => [single('posts', post.id)],
    fetchOptions: { method: 'POST', body: JSON.stringify(body) },
  });

  const handleInput = useCallback(
    (e: any) => setBody({ ...body, title: e.target.value }),
    [body]
  );

  if (response.data !== undefined) {
    clearResponse();
    setBody({ author: 'user', title: '' });
  }

  return (
    <Row>
      <Card>
        <Row gutter={8}>
          <Col span={19}>
            <Input
              placeholder={'Enter a post'}
              value={body.title}
              onChange={handleInput}
            />
          </Col>
          <Col span={5}>
            {/* 
            // @ts-ignore */}
            <Button type="primary" onClick={addPost}>
              Add post
            </Button>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
