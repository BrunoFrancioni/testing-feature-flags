import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { IPhoto } from "../../../../core/interfaces/IPhotos";
import PhotosService from "../../../../core/services/PhotosService";

interface Props {
  showModal: boolean;
  id: string | any;
  handleClose: any;
}

const DetailsPhotosModal = (props: Props) => {
  const photosService: PhotosService = new PhotosService();

  const [loading, setLoading] = useState<boolean>(true);
  const [photo, setPhoto] = useState<IPhoto | null>(null);
  const [searchWithError, setSearchWithError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await getPhoto();
    })();
  }, []);

  const getPhoto = async () => {
    try {
      const result = await photosService.getPhotosById(props.id);

      setPhoto(result.data.photo);
      setLoading(false);
      setSearchWithError(false);
    } catch (e: any) {
      console.log("Error", e);

      setPhoto(null);
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
        <Modal.Title>Photo Details</Modal.Title>
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

        {!loading && !searchWithError && photo != null && (
          <Container>
            <Row>
              <Col>
                <h4>Title</h4>
                <p>{photo.title}</p>
              </Col>

              <Col>
                <h4>Album Id</h4>
                <p>{photo.albumId}</p>
              </Col>
            </Row>

            <hr />

            <Row>
              <Col>
                <h4>Image</h4>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </Col>
            </Row>
          </Container>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsPhotosModal;
