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
import { fromRootActions, useRoot } from "../../../Context/Root";
import { showToastify } from "../../../Components/Toastify";
import { UserService } from "../../../services";
import localStorageHelper from "../../../Utils/LocalStorageHelper";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

function Login() {
  const theme = useTheme();
  const { dispatch } = useRoot();
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
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

  const loginHandler = async (data: Omit<State, "showPassword">) => {
    try {
      const res = await UserService.users.login(data);
      showToastify.success("Logged in");
      localStorageHelper.setItem("accessToken", res.token);
      dispatch(fromRootActions.login(res.token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        loginHandler(values);
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
          <Grid container justifyContent="center" alignContent="center">
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
            <Grid item xs={12} sx={{ mt: 2.5 }} justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
