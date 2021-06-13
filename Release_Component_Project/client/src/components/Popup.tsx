import {Modal,Button} from 'react-bootstrap'

function MyVerticallyCenteredModal(props:any) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h5>{props.header}</h5>
          <p>
            {props.body}
          </p>
        </Modal.Body>
          <Button className='btn btn-dark' onClick={props.onHide}>Close</Button>
      </Modal>
    );
  }
 export {MyVerticallyCenteredModal}