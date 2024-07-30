import React, { Suspense } from "react";
import { CircleLoading } from "@/components/loading";
import PropTypes from "prop-types";

function Wrapper({ children }) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
