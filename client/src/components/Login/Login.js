import { Container, Box, Paper, Avatar, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, removeError } from "../../features/user/userSlice";
import ErrorBox from "../Notifications/ErrorBox";

const Login = () => {
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);
    const dispatch = useDispatch();

    const loginHandler = e => {
        e.preventDefault();

        // using it as an uncontrolled component.
        const email = e.target.email.value;
        const password = e.target.password.value;

        dispatch(loginUser({ email, password }));
    };

    return (
        <Container component="main" sx={{ width: "50%" }}>
            {status === "error" && <ErrorBox error={error} removeError={removeError} />}
            <Paper elevation={6} sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 1,
            }}>
                <Box
                    sx={{
                        // marginTop: 5,
                        p: 4,
                        // p: "1rem 5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: "600px",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/auth/register">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;