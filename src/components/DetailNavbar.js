import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    backIcon: {
      fontSize: theme.spacing.unit * 6,
      color: '#fff',
      cursor: 'pointer'
    }
  })

class DetailNavbar extends React.Component {
  onArrowClick = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Navbar className="dt-top-header" light expand="md">
        <NavbarBrand className="iconSmall" onClick={this.onArrowClick}>
          <ArrowBackIcon className={this.props.classes.backIcon} />
        </NavbarBrand>
        <Nav className="mx-sm-auto dt-header-title" navbar>
          <NavItem className="d-flex align-self-center dt-back">
            <span>{this.props.details.Title}</span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(withStyles(styles)(DetailNavbar));
