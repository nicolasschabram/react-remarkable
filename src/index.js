"use strict";

import React, { useMemo } from "react";
import Markdown from "remarkable";

export default function Remarkable({
  options = {},
  source,
  container: Container = "div",
  children,
}) {
  const md = useMemo(() => new Markdown(options), [options]);

  const content = useMemo(() => {
    if (source) {
      return <span dangerouslySetInnerHTML={{ __html: md.render(source) }} />;
    } else {
      return React.Children.map(children, (child) =>
        typeof child === "string" ? (
          <span dangerouslySetInnerHTML={{ __html: md.render(child) }} />
        ) : (
          child
        )
      );
    }
  }, [source, children, md]);

  return <Container>{content}</Container>;
}
