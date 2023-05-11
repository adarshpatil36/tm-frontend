import React from "react";
import { useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { Link } from "react-router-dom";

export const ModalTable = ({searchTicketList}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Issue ID</th>
          <th>Subjects</th>
          <th>Status</th>
          <th>Severity</th>
          <th>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {searchTicketList.length ? (
          searchTicketList.map((row) => (
            <tr key={row._id}>
              <td>
              <Link to={`/ticket/${row._id}`}>{row._id}</Link>
                </td>
              <td>
                <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
              </td>
              <td>{row.status}</td>
              <td>{row.severity}</td>
              <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No ticket show{" "}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
