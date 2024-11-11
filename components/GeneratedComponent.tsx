"use client";

import parse, { DOMNode } from "html-react-parser";
import { FC, ReactNode } from "react";

interface GeneratedComponentProps {
  code: string;
}

const GeneratedComponent: FC<GeneratedComponentProps> = ({ code }) => {
  const parsedContent: ReactNode = parse(code) as ReactNode;

  return <div>{parsedContent}</div>;
};

export default GeneratedComponent;
