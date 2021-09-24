import React, { Fragment, ReactNode } from "react";
import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Stack,
  Button,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import LinkBehavior from "../LinkBehavior";
import { fromRootActions, useRoot } from "../../Context/Root";
import localStorageHelper from "../../Utils/LocalStorageHelper";

const Item = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.primary.contrastText
}));

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    state: { hasAuth, user },
    dispatch
  } = useRoot();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    await localStorageHelper.removeItem("accessToken");
    dispatch(fromRootActions.logout());
  };

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
                {!hasAuth ? (
                  <>
                    <Item
                      LinkComponent={LinkBehavior}
                      href="/login"
                      variant="text"
                    >
                      Login
                    </Item>
                    <Item
                      LinkComponent={LinkBehavior}
                      href="/register"
                      variant="text"
                    >
                      Sign Up
                    </Item>
                  </>
                ) : (
                  <>
                    <Item LinkComponent={LinkBehavior} href="/" variant="text">
                      Shop
                    </Item>
                    <Button
                      variant="text"
                      sx={{ color: "#fff" }}
                      onClick={async () => await logoutHandler()}
                    >
                      Logout
                    </Button>
                    <Typography display="flex" justifyContent="center" alignSelf="center">
                        Hi {user.firstName} {user.lastName}
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>

            {/* {hasAuth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )} */}
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          mt: 5,
          minHeight: "500px"
        }}
      >
        {props.children}
      </Container>
    </Fragment>
  );
}
