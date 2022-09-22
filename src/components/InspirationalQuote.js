import React from "react";

export default class InspirationalQuote extends React.Component {
  state = {
    quote: null,
  };
  componentDidMount() {
    import("inspirational-quotes")
      .then((Quotes) => {
        this.setState({ quote: Quotes.getQuote() });
      })
      .catch(() => console.log("Couldn't load quote"));
  }
  render() {
    return (
      <figure>
        <blockquote>{this.state.quote?.text}</blockquote>
        <figcaption>
          <cite>{this.state.quote?.author}</cite>
        </figcaption>
      </figure>
    );
  }
}
