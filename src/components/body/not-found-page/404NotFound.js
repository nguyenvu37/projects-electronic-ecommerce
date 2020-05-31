import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">404 Not Found</h4>
        <p>Không Tìm Thấy Gì</p>
        <hr />
        <p className="mb-0">Vui lòng kiểm tra lại URL</p>
      </div>
    </div>
  );
};
export default NotFound;
