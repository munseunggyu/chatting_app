import React from "react"
import { Container } from "react-bootstrap"
import Message from "./Message"
import MessageForm from "./MessageForm"
import MessageHeader from "./MessageHeader"


function MainPanel(){
  return(
    <Container>
    <MessageHeader />
    <MessageForm />
    </Container>
  )
}

export default React.memo(MainPanel)