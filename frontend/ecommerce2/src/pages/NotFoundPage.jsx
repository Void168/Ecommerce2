import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      <div>
        <Link to="/" className="text-3xl">Quay lại trang chủ</Link>
      </div>
      <div>
        <img src="/images/404Pic.png" alt="Not-found" className="shadow-none my-12" />
      </div>
    </div>
  );
}

export default NotFoundPage;
