import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import firebase from '../../../firebase';
import { useSelector } from 'react-redux';

import { getDatabase, ref, set, remove, push, child } from "firebase/database";
import { getStorage, ref as strRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function MessageForm() {

  const handleSubmit = () => {}
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        as="textarea"
                        rows={3} />
                </Form.Group>
            </Form>


            <div>
            </div>

            <Row>
                <Col>
                    <button
                        className="message-form-button"
                        style={{ width: '100%' }}
                        // disabled={loading ? true : false}
                    >
                        SEND
                    </button>
                </Col>
                <Col>
                    <button
                        className="message-form-button"
                        style={{ width: '100%' }}
                        // disabled={loading ? true : false}
                    >
                        UPLOAD
                    </button>
                </Col>
            </Row>

            <input
                accept="image/jpeg, image/png"
                style={{ display: 'none' }}
                type="file"
            />

        </div>
    )
}

export default MessageForm
