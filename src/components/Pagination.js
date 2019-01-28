import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

const PaginationBar = props => {
  const activePage = Number(props.activePage);
  const totalPages = props.totalPages > 10 ? 10 : props.totalPages;
  const list = [];
  for (let i = 1; i <= totalPages; i++) {
    list.push(i);
  }
  return (
    <div className="d-flex justify-content-center mt-2">
      <Pagination
        className="flex-{grow|shrink}-1"
        aria-label="Page navigation example"
      >
        <PaginationItem disabled={activePage === 1}>
          <Link
            to={{
              pathname: "/results",
              search: activePage > 1 ? `?page=${activePage - 1}` : `?page=${activePage}`,
              state: { query: props.searchItem }
            }}
          >
            <PaginationLink previous />
          </Link>
        </PaginationItem>

        {list.map(pageNum => {
          return (
            <PaginationItem active={activePage === pageNum} key={pageNum}>
              <Link
                to={{
                  pathname: "/results",
                  search: `?page=${pageNum}`,
                  state: { query: props.searchItem }
                }}
              >
                <PaginationLink value={pageNum}>{pageNum}</PaginationLink>
              </Link>
            </PaginationItem>
          );
        })}

        <PaginationItem disabled={activePage === totalPages}>
          <Link
            to={{
              pathname: "/results",
              search:
                activePage !== totalPages
                  ? `?page=${activePage + 1}`
                  : `page=${activePage}`,
              state: { query: props.searchItem }
            }}
          >
            <PaginationLink next />
          </Link>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default withRouter(PaginationBar);
