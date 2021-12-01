import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import PostsService from "../../../../core/services/PostsService";
import { IPost } from "../../../../core/interfaces/IPosts";

import "./styles.css";

interface Props {
  showModal: boolean;
  id: string | any;
  handleClose: any;
}

const DetailsPostModal = (props: Props) => {
  const postsService: PostsService = new PostsService();

  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost | null>(null);
  const [searchWithError, setSearchWithError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getPost();
    })();
  }, []);

  const getPost = async () => {
    try {
      const result = await postsService.getPostById(props.id);

      setPost(result.data.post);
      setLoading(false);
      setSearchWithError(false);
    } catch (e: any) {
      console.log("Error", e);

      setPost(null);
      setLoading(false);
      setSearchWithError(true);
    }
  };

  return (
    <Modal
      show={props.showModal}
      onHide={props.handleClose}
      size="lg"
      animation={false}
      centered={true}
      onEscapeKeyDown={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Post Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && (
          <div className="spinner-container">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        )}

        {loading && searchWithError && (
          <Container fluid>
            <p>
              <i className="fas fa-exclamation-triangle"></i> An error has
              occurred. Try it again later
            </p>
          </Container>
        )}

        {!loading && !searchWithError && post != null && (
          <Container>
            <Row>
              <Col>
                <h4>Title</h4>
                <p>{post.title}</p>
              </Col>

              <Col>
                <h4>Post Id</h4>
                <p>{post.userId}</p>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Body</h4>
                <p>{post.body}</p>
              </Col>
            </Row>
          </Container>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsPostModal;
