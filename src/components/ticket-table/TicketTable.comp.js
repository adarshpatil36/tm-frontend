import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  // if (isLoading) return <h3>Loading ...</h3>;
  // if (error) return <h3>{error}</h3>;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = searchTicketList.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const renderTickets = () => {
    return currentTickets.length ? (
      currentTickets.map((row) => (
        <tr key={row._id}>
          <td>
            <Link to={`/ticket/${row._id}`}>{row._id}</Link>
          </td>
          <td>
            <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
          </td>
          <td>{row.status}</td>
          <td>{row.severity}</td>
          <td>
            {row.openAt && new Date(row.openAt).toLocaleString()}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center">
          No ticket show{" "}
        </td>
      </tr>
    );
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchTicketList.length / ticketsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => {
      return (
        <li
          key={number}
          className={`page-item${currentPage === number ? " active" : ""}`}
        >
          <a className="page-link" onClick={() => setCurrentPage(number)}>
            {number}
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Opened Date</th>
          </tr>
        </thead>
        <tbody>{renderTickets()}</tbody>
      </Table>
      <nav>
        <ul className="pagination justify-content-center">
          {renderPageNumbers()}
        </ul>
      </nav>
    </>
  );
};

