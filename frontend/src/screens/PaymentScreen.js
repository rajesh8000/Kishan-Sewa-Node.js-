import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState("")

  const dispatch = useDispatch()

  const onChangeHandler = (e)=>{
    setPaymentMethod(e.target.value)
  }

  const submitHandler = (e) => {
    
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Khalti'
              name='paymentMethod'
              value='Khalti'
              onChange={(e)=>onChangeHandler(e)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' disabled={!paymentMethod}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
