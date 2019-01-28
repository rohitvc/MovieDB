import React from "react";
import { Button } from "reactstrap";
import { InputGroup, Input } from "reactstrap";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  state = {
    input: ""
  };
  onButtonClick = () => {
    if (this.state.input === "") {
      this.props.history.push("/results", { query: "avatar" });
    } else {
      this.props.history.push("/results", { query: this.state.input });
    }
  };

  checkEnter = e => {
    if (e.keyCode === 13) {
      this.onButtonClick();
      this.setState({ input: "" });
    }
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <Container>
        <div className="d-flex mt-3 mr-auto">
          <InputGroup className="w-80">
            <Input
              onKeyDown={this.checkEnter}
              value={this.state.input}
              onChange={this.onInputChange}
              placeholder="Enter query here"
              required
            />
          </InputGroup>
          <Button onClick={this.onButtonClick} className="ml-3" color="primary">
            Search
          </Button>{" "}
        </div>
      </Container>
    );
  }
}

export default withRouter(Header);
