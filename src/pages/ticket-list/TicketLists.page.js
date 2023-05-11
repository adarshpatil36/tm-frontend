import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";
import Mic from "./Mic.png";

import { Container, Row, Col, Button } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import { getTicketByDesc } from "../../api/ticketApi";

import { Link } from "react-router-dom";
import { ResultModal } from "../../components/resultmodal/ResultModal";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export const TicketLists = () => {
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [voiceResult, setVoiceResult] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleOnSubmit = async (desc) => {
    try {
      const isAuth = await getTicketByDesc(desc);
      console.log(isAuth.status);
      console.log(isAuth.data.result);
      setVoiceResult(isAuth.data.result)
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoiceSearch = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      console.log("Result >> ", speechToText)
      recognition.stop();
      setKeyword(speechToText)
      handleOnSubmit(speechToText);
      handleShow();
    };
  };

  return (
    <>
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket Lists" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/add-ticket">
            <Button
              style={{
                border: "0px",
                backgroundColor: "#662D91",
              }}
            >
              Add New Ticket
            </Button>
          </Link>
        </Col>
        <Col>
          <label>Voice Search: </label>
          <img
            src={Mic}
            style={{ width: "40px", marginLeft: "30px", cursor: "pointer" }}
            onClick={handleVoiceSearch}
          />
        </Col>
        <Col className="text-right">
          <SearchForm />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
    <ResultModal
    keyword={keyword}
    searchTicketList= {voiceResult}
    show= {show} handleClose ={handleClose}
    />
    </>
  );
};
