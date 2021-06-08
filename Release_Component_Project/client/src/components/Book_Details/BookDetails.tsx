import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import SingleBookDetails from "./SingleBookDetails";

interface Props {}

interface MatchParams {
  paramId: string;
}

export default function BookDetails({}: Props): ReactElement {
  const { paramId } = useParams<MatchParams>();

  return (
    <>
      <SingleBookDetails></SingleBookDetails>
    </>
  );
}
