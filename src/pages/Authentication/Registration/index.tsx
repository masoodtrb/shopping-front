import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { UserService } from "../../../services";
import { showToastify } from "../../../Components/Toastify";
import localStorageHelper from "../../../Utils/LocalStorageHelper";
import { fromRootActions, useRoot } from "../../../Context/Root";
import { omit } from "lodash";

interface Props {}
interface State {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  showPassword: boolean;
}

type RegistrationType = Omit<State, "showPassword">;

function Registeration(props: Props) {
  const { dispatch } = useRoot();
  const theme = useTheme();
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    showPassword: false
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const registerHandler = async (data: RegistrationType) => {
    try {
      await UserService.users.register(omit(data, 'showPassword'));
      const login = await UserService.users.login({
        email: data.email,
        password: data.password
      });
      showToastify.success("Logged in");
      localStorageHelper.setItem("accessToken", login.token);
      dispatch(fromRootActions.login(login.token));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        registerHandler(values);
      }}
    >
      <Grid container justifyContent="center" alignContent="center">
        <Grid
          sx={{
            marginTop: 20,
            borderRadius: 3,
            border: `1px solid ${theme.palette.primary.main}`,
            p: 4
          }}
          item
          xs={4}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
          >
            <Grid item xs={6}>
              <TextField
                required
                sx={{ width: "100%", mt: 2.5 }}
                value={values.firstName}
                onChange={handleChange("firstName")}
                label="First Name"
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                sx={{ width: "100%", mt: 2.5 }}
                value={values.lastName}
                onChange={handleChange("lastName")}
                label="Last Name"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                sx={{ width: "100%", mt: 2.5 }}
                value={values.email}
                onChange={handleChange("email")}
                label="Email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                sx={{ width: "100%", mt: 2.5 }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: 2.5 }}
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Registeration;
