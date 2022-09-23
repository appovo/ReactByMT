import React, { useState, useEffect } from "react";

export default function InspirationalQuote() {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    import("inspirational-quotes")
      .then((Quotes) => {
        setQuote(Quotes.getQuote());
      })
      .catch(() => console.log("Couldn't load quote"));
  }, []);

  return (
    <figure>
      <blockquote>{quote?.text}</blockquote>
      <figcaption>
        <cite>{quote?.author}</cite>
      </figcaption>
    </figure>
  );
}
