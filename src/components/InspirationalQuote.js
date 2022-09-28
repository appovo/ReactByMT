import { useState, useEffect } from "react";

export default function InspirationalQuote({ render }) {
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    import("inspirational-quotes")
      .then((Quotes) => {
        setQuote(Quotes.getQuote());
      })
      .catch(() => console.log("Couldn't load quote"));
  }, []);
  return render(quote?.text, quote?.author);
}
