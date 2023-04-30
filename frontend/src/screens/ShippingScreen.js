import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [phoneNumber, setPhoneNo] = useState(shippingAddress.phoneNumber)
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    if (phoneNumber.length !== 10) {
      setPhoneNumberValid(false);
      setPhoneNumberError('Phone number must be exactly 10 digits');
      return;
    }

    dispatch(saveShippingAddress({ address, city, phoneNumber, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
  <Form.Label>Phone Number</Form.Label>
  <Form.Control
    type='tel'
    placeholder='Enter phone number'
    value={phoneNumber}
    onChange={(e) => {
      const inputPhoneNumber = e.target.value.replace(/\D/g, '');
      if (inputPhoneNumber.length <= 10) {
        setPhoneNo(inputPhoneNumber);
        setPhoneNumberValid(true); // input is valid, clear error message
      } else {
        setPhoneNumberValid(false); // input is invalid, show error message
      }
    }}
    isInvalid={!phoneNumberValid} // apply "is-invalid" class to control if input is invalid
  ></Form.Control>
  <Form.Control.Feedback type='invalid'>
    Please enter a valid phone number (exactly 10 digits)
  </Form.Control.Feedback>
</Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
