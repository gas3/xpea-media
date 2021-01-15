import React from "react";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import * as Icon from "react-feather";
import classnames from "classnames";
import ReactCountryFlag from "react-country-flag";
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent";
import { useAuth0 } from "../../../authServices/auth0/auth0Service";
import { history } from "../../../history";
import { IntlContext } from "../../../utility/context/Internationalization";

const handleNavigation = (e, path) => {
  e.preventDefault();
  history.push(path);
};

const UserDropdown = (props) => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    <DropdownMenu right>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          if (isAuthenticated) {
            return logout({
              returnTo:
                window.location.origin + process.env.REACT_APP_PUBLIC_PATH,
            });
          } else {
            const provider = props.loggedInWith;
            if (provider !== null) {
              if (provider === "jwt") {
                return props.logoutWithJWT();
              }
              if (provider === "firebase") {
                return props.logoutWithFirebase();
              }
            } else {
              history.push("/login");
            }
          }
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    shoppingCart: [],
    suggestions: [],
  };

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult });
    });
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  removeItem = (id) => {
    let cart = this.state.shoppingCart;

    let updatedCart = cart.filter((i) => i.id !== id);

    this.setState({
      shoppingCart: updatedCart,
    });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  render() {
    const renderCartItems = this.state.shoppingCart.map((item) => {
      return (
        <div className="cart-item" key={item.id}>
          <Media
            className="p-0"
            onClick={() => history.push("/ecommerce/product-detail")}
          >
            <Media className="text-center pr-0 mr-1" left>
              <img
                className={`${
                  item.imgClass
                    ? item.imgClass + " cart-item-img"
                    : "cart-item-img"
                }`}
                src={item.img}
                width={item.width}
                alt="Cart Item"
              />
            </Media>
            <Media className="overflow-hidden pr-1 py-1 pl-0" body>
              <span className="item-title text-truncate text-bold-500 d-block mb-50">
                {item.name}
              </span>
              <span className="item-desc font-small-2 text-truncate d-block">
                {item.desc}
              </span>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <span className="align-middle d-block">1 x {item.price}</span>
                <Icon.X
                  className="danger"
                  size={15}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.removeItem(item.id);
                  }}
                />
              </div>
            </Media>
          </Media>
        </div>
      );
    });

    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownMenu
            tag="ul"
            right
            className={`dropdown-menu-media dropdown-cart ${
              this.state.shoppingCart.length === 0 ? "empty-cart" : ""
            }`}
          >
            <li
              className={`dropdown-menu-header ${
                this.state.shoppingCart.length === 0 ? "d-none" : "d-block"
              }`}
            >
              <div className="dropdown-header m-0">
                <h3 className="white">
                  {this.state.shoppingCart.length} Items
                </h3>
                <span className="notification-title">In Your Cart</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false,
              }}
            >
              {renderCartItems}
            </PerfectScrollbar>
            <li
              className={`dropdown-menu-footer border-top ${
                this.state.shoppingCart.length === 0 ? "d-none" : "d-block"
              }`}
            >
              <div
                className="dropdown-item p-1 text-center text-primary"
                onClick={() => history.push("/ecommerce/checkout")}
              >
                <Icon.ShoppingCart size={15} />
                <span className="align-middle text-bold-600 ml-50">
                  Checkout
                </span>
              </div>
            </li>
            <li
              className={`empty-cart ${
                this.state.shoppingCart.length > 0 ? "d-none" : "d-block"
              } p-2`}
            >
              Your Cart Is Empty
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            <Icon.Bell size={21} />
            <Badge pill color="primary" className="badge-up">
              {" "}
              5{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">5 New</h3>
                <span className="notification-title">App Notifications</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false,
              }}
            >
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.PlusSquare
                      className="font-medium-5 primary"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="primary media-heading" tag="h6">
                      You have new order!
                    </Media>
                    <p className="notification-text">
                      Are your going to meet me tonight?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      9 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.DownloadCloud
                      className="font-medium-5 success"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="success media-heading" tag="h6">
                      99% Server load
                    </Media>
                    <p className="notification-text">
                      You got new order of goods?
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      5 hours ago
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.AlertTriangle
                      className="font-medium-5 danger"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="danger media-heading" tag="h6">
                      Warning Notification
                    </Media>
                    <p className="notification-text">
                      Server has used 99% of CPU
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Today
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.CheckCircle
                      className="font-medium-5 info"
                      size={21}
                    />
                  </Media>
                  <Media body>
                    <Media heading className="info media-heading" tag="h6">
                      Complete the task
                    </Media>
                    <p className="notification-text">
                      One of your task is pending.
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last week
                    </time>
                  </small>
                </Media>
              </div>
              <div className="d-flex justify-content-between">
                <Media className="d-flex align-items-start">
                  <Media left href="#">
                    <Icon.File className="font-medium-5 warning" size={21} />
                  </Media>
                  <Media body>
                    <Media heading className="warning media-heading" tag="h6">
                      Generate monthly report
                    </Media>
                    <p className="notification-text">
                      Reminder to generate monthly report
                    </p>
                  </Media>
                  <small>
                    <time
                      className="media-meta"
                      dateTime="2015-06-11T18:29:20+08:00"
                    >
                      Last month
                    </time>
                  </small>
                </Media>
              </div>
            </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <span className="align-middle">Read all notifications</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;
