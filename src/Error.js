import React from "react";
import Search from "./Component/Search/Search";
import {
  Segment,
  Container,
  Image,
  Button,
  List,
  Grid,
} from "semantic-ui-react";

const Error = ({ statusCode, message, suggestion }) => {
  const messages = message || "The Page you are looking for no longer exists";
  const suggestions = suggestion || (
    <div>
      <p>
        <b>
          <strong>Search for another movie</strong>
        </b>
      </p>

      <Search />
    </div>
  );

  const mobile = window.innerWidth < 480;

  return (
    <div style={{ minHeight: "100vh" }} className="py-3">
      <Grid
        centered
        container
        verticalAlign="middle"
        reversed="mobile vertically"
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1 className="" style={{ lineHeight: "30px" }}>
              404
            </h1>

            <h3>Not Found</h3>
            <p>
              {messages}
              <span>
                {" "}
                or has been{" "}
                <strong>
                  <b>Petrified</b>
                </strong>
              </span>
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column
            computer="8"
            tablet="8"
            mobile="16"
            textAlign={mobile ? "center" : "left"}
          >
            <div className="py-3">
              <p>
                <b>Try the folowing </b>
                <List bulleted>
                  <List.Item>Please check your network settings</List.Item>
                  <List.Item>Try reloading the Page</List.Item>
                  <List.Item>
                    If the error still persist, Use the spell{" "}
                    <i>"Expecto Patronum"</i>
                  </List.Item>
                </List>
              </p>
            </div>
            {suggestions}
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Image src="/assets/not-found.png" centered size="big" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Error;
