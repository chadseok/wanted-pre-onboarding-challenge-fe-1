import React from "react";
import { Link } from "react-router-dom";

export function SignUpLinkBtn() {
  return (
    <Link to="/signup" className="text-blue-700 text-sm mt-2">
      회원가입하기
    </Link>
  );
}
