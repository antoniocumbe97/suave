import React, { Fragment } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './pagination.css';

export function Pagination({
  totalRows = 0,
  perPage = 10,
  currentPage = 0,
  setCurrentPage,
  extraClass,
}) {
  return (
    <Fragment>
      <div className={`d-flex gap-3 ${extraClass}`}>
        <ReactPaginate
          previousLabel={<IoIosArrowBack />}
          nextLabel={<IoIosArrowForward />}
          breakLabel="..."
          pageCount={Math.ceil(Number((totalRows / perPage).toFixed(1))) || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName="active"
          forcePage={currentPage}
          onPageChange={(page) => setCurrentPage(page.selected)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={
            "pagination react-paginate separated-pagination justify-content-end pe-1 mb-0"
          }
        />
      </div>
    </Fragment>
  );
}
