import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useState } from 'react';

function FormExample({ handleSubmitModalLeft, commune, post, setPost, handleChange, selectedOptionType, handleSelectChange, handleSelectChangePiece, selectedOptionPiece, minPrice, maxPrice,  handlePriceChange, handleSliderChangeMax, handleSliderChange }) {
  console.log("🚀 ~ FormExample ~ commune:", commune)
  console.log("🚀 ~ FormExample ~ handleSelectChange:", handleSelectChange)
  console.log("🚀 ~ FormExample ~ selectedOptionType:", selectedOptionType)
  console.log("🚀 ~ FormExample ~ handleSubmitModalLeft:", handleSubmitModalLeft)
  console.log("🚀 ~ FormExample ~ handleChange:", handleChange)
  console.log("🚀 ~ FormExample ~ post:", post)
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

  return (
    // <Formik
    //   validationSchema={schema}
    //   onSubmit={handleSubmitModalLeft}
    //   initialValues={{
    //     type: '',
    //     price: '',
    //     surface: '',
    //     localisation: '',
    //     zip: '',
    //     nbrpiece: '',
    //     terms: false
    //   }}
    // >
      // {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmitModalLeft} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
          <Row className="mb-3">
            <Form.Label htmlFor="inputPassword5" className='title_form_left'>Spécifiez votre recherche</Form.Label>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choisir une option</Form.Label>
            <Form.Control as="select" custom onChange={handleSelectChange} value={selectedOptionType}>
              <option value="">Sélectionner...</option>
              <option value="Appartement">Appartement</option>
              <option value="House">House</option>
            </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikUsername">
              <Form.Label>Surface du bien</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Surface du bien"
                  aria-describedby="inputGroupPrepend"
                  name="surface"
                  value={post.surface}
                  onChange={(evt) => handleChange(evt)}
                  // isInvalid={!!errors.surface}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {errors.surface}
                </Form.Control.Feedback> */}
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
              <Form.Label>Localisation du bien</Form.Label>
              <Form.Control
                type="text"
                placeholder="localisation"
                name="localisation"
                value={post.localisation}
                onChange={(evt) => handleChange(evt)}
                // isInvalid={!!errors.localisation}
              />

              {/* <Form.Control.Feedback type="invalid">
                {errors.localisation}
              </Form.Control.Feedback> */}
            </Form.Group>
            {/* <Form.Group as={Col} md="3" controlId="validationFormik04">
              <Form.Label>Code postale</Form.Label>
              <Form.Control
                type="text"
                placeholder="code postale"
                name="zip"
                value={post.zip}
                onChange={(evt) => handleChange(evt)} */}
                {/* isInvalid={!!errors.zip} */}
              {/* /> */}
              {/* <Form.Control.Feedback type="invalid">
                {errors.zip}
              </Form.Control.Feedback> */}
            {/* </Form.Group> */}
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Sélectionnez un code postale </Form.Label>
            <Form.Control as="select" custom onChange={handleSelectChange} value={selectedOptionType}>
              <option value="">Sélectionner...</option>
              <option value={commune}>{commune}</option>
              <option value="78000">78000</option>
              <option value="92000">92000</option>
              <option value="92500">92500</option>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choisir une option</Form.Label>
            <Form.Control as="select" custom onChange={handleSelectChangePiece} value={selectedOptionPiece}>
              <option value="">Sélectionner type de logement</option>
              <option value="studio">Studio</option>
              <option value="2">F2</option>
              <option value="3">F3</option>
              <option value="4">F4</option>
              <option value="5">F5</option>
              <option value=">5">Supérieur à 5 piéces</option>
            </Form.Control>
            </Form.Group>
             <Row>
        <Col sm={9}>
          <Form.Group controlId="exampleForm.ControlRangeMin">
            <Form.Label>Choisir un prix minimum</Form.Label>
            <Form.Control type="range" min="500" max="3000" step="100" value={minPrice} onChange={handleSliderChange} className="custom-slidermin"/>
          </Form.Group>
        </Col>
        <div>
            Prix minimum sélectionné : <span>{minPrice}</span>
          </div>
          <Col sm={9}>
          <Form.Group controlId="exampleForm.ControlRangeMax">
            <Form.Label>Choisir un prix maximum</Form.Label>
            <Form.Control type="range" min="500" max="3000" step="100" value={maxPrice} onChange={handleSliderChangeMax} className="custom-slidermax"/>
          </Form.Group>
        </Col>
        <div>
            Prix maximum sélectionné : <span>{maxPrice}</span>
          </div>


      </Row>

          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={(evt) => handleChange(evt)}
              // isInvalid={!!errors.terms}
              // feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      // )}
    // </Formik>
  );
}

export default FormExample;