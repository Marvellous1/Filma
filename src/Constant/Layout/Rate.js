import React, { Component } from "react";
import { Button, Input, Form, Label, TextArea, Radio } from "semantic-ui-react";

class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      commentValue: "",
      rateValue: "",
      visible: "none",
      msg: "",
      value: null,
    };
  }

  hideForm = () => {
    const { visible } = this.state;
    if (visible === "block") {
      this.setState({ visible: "none" });
    } else {
      this.setState({ visible: "block" });
      localStorage.setItem("voted", "true");
    }
  };
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <div>
        <h2 onClick={this.hideForm}>Leave a comment</h2>
        <Form
          style={{ display: this.state.visible }}
          as="form"
          action="https://gmail.us8.list-manage.com/subscribe/post-json"
          method="POST"
          noValidate
          target="_blank"
        >
          <input type="hidden" name="u" value="81c9a2f30430f26413e4af796" />
          <input type="hidden" name="id" value="8b55d5dec1" />
          <input type="hidden" name="c" value="?" />
          <Form.Field>
            <Form.Input
              as="input"
              type="email"
              name="EMAIL"
              id="EMAIL"
              placeholder="Email Address"
              value={this.state.emailValue}
              onChange={(e) => {
                this.setState({ emailValue: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Group inline>
            <label className="label">
              <p>Rate</p>
            </label>
            <Form.Field
              name="RATE"
              control={Radio}
              label={{
                children: (
                  <p style={{ fontWeight: "lighter" }}>0-3 &#128530;</p>
                ),
              }}
              value="0-3"
              checked={value === "0-3"}
              onChange={this.handleChange}
            />
            <Form.Field
              name="RATE"
              control={Radio}
              label={{
                children: (
                  <p style={{ fontWeight: "lighter" }}>4-6 &#128529;</p>
                ),
              }}
              value="4-6"
              checked={value === "4-6"}
              onChange={this.handleChange}
            />
            <Form.Field
              name="RATE"
              control={Radio}
              label={{
                children: (
                  <p style={{ fontWeight: "lighter" }}>7-9 &#128516;</p>
                ),
              }}
              value="7-9"
              checked={value === "7-9"}
              onChange={this.handleChange}
            />
            <Form.Field
              name="RATE"
              control={Radio}
              label={{
                children: <p style={{ fontWeight: "lighter" }}>10 &#128523;</p>,
              }}
              value="10"
              checked={value === "10"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field>
            <Form.TextArea
              as="textarea"
              name="COMMENT"
              id="COMMENT"
              type="text"
              placeholder="Comment"
              value={this.state.commentValue}
              onChange={(e) => {
                this.setState({ commentValue: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Button
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="button"
          >
            Send
          </Form.Button>

          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
            aria-label="Please leave the following three fields empty"
          >
            <label htmlFor="b_name">Name: </label>
            <input
              type="text"
              name="b_name"
              tabIndex="-1"
              value=""
              placeholder="Freddie"
              id="b_name"
            />

            <label htmlFor="b_email">Email: </label>
            <input
              type="email"
              name="b_email"
              tabIndex="-1"
              value=""
              placeholder="youremail@gmail.com"
              id="b_email"
            />

            <label htmlFor="b_comment">Comment: </label>
            <textarea
              name="b_comment"
              tabIndex="-1"
              placeholder="Please comment"
              id="b_comment"
            ></textarea>
          </div>
        </Form>
        <iframe
          name="hiddenFrame"
          src="about:blank"
          style={{ display: "none" }}
        ></iframe>
        <p style={{ color: "green" }}>{this.state.msg}</p>
        <style jsx>{`
          .label {
            color: white;
          }
        `}</style>
      </div>
    );
  }
}

export default Rate;
