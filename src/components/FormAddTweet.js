import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { validationFormAddTweetAction } from "../actions/validationsActions";
import { addTweetAction } from "../actions/tweetsActions";
import { openCloseAddTweetModalAction } from "../actions/modalsActions";
import uuid from "uuid/v4";
import moment from "moment";

export default function FormAddTweet() {
  const [formValue, setFormValue] = useState({
    name: "",
    tweet: ""
  });

  // Inicializacion del dispach y ejecucion de las acciones.
  const dispatch = useDispatch();
  const errorForm = state => dispatch(validationFormAddTweetAction(state));
  const addTweet = state => dispatch(addTweetAction(state));
  const closeModal = state => dispatch(openCloseAddTweetModalAction(state));

  // Obtener estado de la validacion del fomrulario
  const errorFormValue = useSelector(
    state => state.validations.errorFormAddTweet
  );

  const onChange = e => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const { name, tweet } = formValue;

    if (!name || !tweet) {
      errorForm(true);
    } else {
      errorForm(false);
      addTweet({
        id: uuid(),
        name,
        tweet,
        date: moment()
      });
      closeModal(false);
    }
  };

  return (
    <Form className="m-3" onChange={onChange} onSubmit={onSubmit}>
      <Form.Group className="text-center">
        <h1>Nuevo Tweet</h1>
      </Form.Group>
      <Form.Group>
        <Form.Control type="text" name="name" placeholder="Escribe tu nombre" />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="tweet"
          row="3"
          placeholder="Escribe lo que quieres comunicar..."
        />
      </Form.Group>
      <Button varian="primary" type="submit">
        Enviar Tweet
      </Button>

      {errorFormValue && (
        <Alert variant="danger" className="mt-4">
          Todos los campos son obligatorios
        </Alert>
      )}
    </Form>
  );
}
