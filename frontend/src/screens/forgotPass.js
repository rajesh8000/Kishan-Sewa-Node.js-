// import React, {useRef, useState, useEffect} from "react";
// import { useHistory, useParams,  Link, } from "react-router-dom";
// import { Form, Button, Row, Col, Toast } from 'react-bootstrap'
// import FormContainer from '../components/FormContainer'

// const ForgotPass =({location})=>{

//     const {id, token}= useParams()
//     const history = useHistory()

//     const [password, setPassword]= useState("")
//     const [message, setMessage]= useState("")

//     const userValid= async()=>{
//         const res = await fetch(`http://localhost:5000/api/users/forgot/${id}/${token}`,{

        
//             method:"GET",
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }
          
//         )
       
        
//         const data = await res.json()
//         if(data.status === 201){
//             console.log("user valid")
//         }else{
//             // history("*")

//         }
    
//     }

//     const setVal =(e)=>{
//       setPassword(e.target.value)

//     }

//     const sendPassword =async(e)=>{
//       e.preventDefault()

      
//         const res = await fetch(`http://localhost:5000/api/users/${id}/${token}`,{

//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({password})
//         })

//         const data = await res.json()
//         if(data.status === 201){
//             setPassword("")
//             setMessage(true)
//         }else{
          

//         }
        

//     }

//     useEffect(()=>{
//         userValid()
//     },[])
//     const redirect = location.search ? location.search.split('=')[1] : '/'

//   return (
//     <FormContainer>
//             <h1>Enter Your New Password</h1>

    
//       <Form >
//         <Form.Group controlId='email'>
//           <Form.Label>New Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter Password'
//             value ={password}
//             onChange={setVal}
//           ></Form.Control>
//         </Form.Group>
  
//         <Button type='submit' variant='primary' onClick={sendPassword}>
//           Send Password
//         </Button>
//       </Form>

//       <Row className='py-3'>
//         <Col>
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
//             Login
//           </Link>
//         </Col>
//       </Row>

//       </FormContainer>
//   )
// }

// export default ForgotPass
