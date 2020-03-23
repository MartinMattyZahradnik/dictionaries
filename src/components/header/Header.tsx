import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import { AppBar, Button, Grid } from "@material-ui/core";

// Actions
import { logout } from "redux/user/userActions";

// Selectors
import { selectIsUserLoggedIn } from "redux/user/userSelectors";

const StyledAppBar = styled(AppBar)`
  width: 100%;

  height: 7rem;
  justify-content: center;
`;

const StyledAppBarContent = styled(Grid)`
  width: 120rem;
  margin: auto;
`;

const StyledButton = styled(Button)<{ onClick?: () => void }>`
  width: 7rem;
  margin-left: auto;
`;

const StyledLogoutLink = styled(Link)`
  margin-left: auto;
`;

const Header = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <StyledAppBar position="static">
      <StyledAppBarContent container>
        {isUserLoggedIn ? (
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => dispatch(logout())}
          >
            Logout
          </StyledButton>
        ) : (
          <StyledLogoutLink to="/login">
            <StyledButton variant="contained" color="secondary">
              Login
            </StyledButton>
          </StyledLogoutLink>
        )}
      </StyledAppBarContent>
    </StyledAppBar>
  );
};

export default Header;
