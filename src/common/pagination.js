import React from "react";

const MyPagination = (props) => {
  let maxPage = Math.ceil(props.data.length / props._limit);
  console.log("maxPage :>> ", maxPage);
  return maxPage <= 1 ? (
    ""
  ) : (
    <div
      style={{
        width: "180px",
        marginLeft: "auto",
      }}
      aria-label="Page navigation example"
      className=""
    >
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={1 >= props.currentPage ? true : false}
            onClick={() => props.prePage(props.currentPage)}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button className="page-link">{props.currentPage}</button>
        </li>
        <li
          disabled={maxPage <= props.currentPage ? true : false}
          className="page-item"
        >
          <button
            className="page-link"
            disabled={maxPage <= props.currentPage ? true : false}
            onClick={() => props.nextPage(props.currentPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyPagination;
