import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { TicketTable } from '../ticket-table/TicketTable.comp';
import { ModalTable } from '../ticket-table/ModalTable.comp';

export function ResultModal({keyword,searchTicketList,  show, handleClose}) {
return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{textTransform: "capitalize"}}>Voice Search Results by Keyword: {keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ModalTable searchTicketList={searchTicketList}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}