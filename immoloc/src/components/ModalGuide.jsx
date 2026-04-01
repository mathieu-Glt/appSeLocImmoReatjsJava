import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalGuide({ selectedOption, setSelectedOption, handleOptionChange, handleSubmit }) {
    const [show, setShow] = useState(false);
    
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    

  return (
    <div>
    <>
      <Button style={{ position: 'absolute', top: '20', left: '0', right: '0', margin: 'auto' }} variant="primary" onClick={handleShow}>
        Que recherchez vous ?
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: 'center' }}>Quel est votre projet ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
      <Form.Check
        type="radio"
        label="Achat"
        id="achat"
        name="options"
        value="achat"
        checked={selectedOption === 'achat'}
        onChange={handleOptionChange}
        custom
        style={{ marginRight: '15px' }}
      />

      <Form.Check
        type="radio"
        label="Louer"
        id="louer"
        name="options"
        value="louer"
        checked={selectedOption === 'louer'}
        onChange={handleOptionChange}
        custom
        style={{ marginRight: '15px' }}
      />

      <Button type="submit">Submit</Button>
    </Form>     
            {/* <Button type="submit">Submit</Button> */}

    
        {/* <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="6" controlId="TypeOfSale">
          <Form.Label>Achat ou Location</Form.Label>
          <Form.Control type="text" placeholder="TypeOfSale" required onChange={(e) => handleInputChange(e.target.value)}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid input.
          </Form.Control.Feedback>
        </Form.Group> */}
      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group> */}
      <br />
      {/* <Button type="submit">Submit</Button> */}
    {/* </Form> */}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>

      </Modal>
    </>
    </div>
  )
}

export default ModalGuide