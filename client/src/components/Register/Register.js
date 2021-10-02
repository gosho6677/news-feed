import { Container, Box, Paper, Avatar, Typography, TextField, Button, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../Notifications/ErrorBox";
import { registerUser } from "../../features/user/userSlice";

const Register = () => {
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);
    const dispatch = useDispatch();

    const registerHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const rePass = e.target.rePass.value;
        const photoUrl = e.target.photoUrl.value;

        dispatch(registerUser({
            email,
            name,
            password,
            rePass,
            photoUrl
        }));
    };

    return (
        <Container component="main" sx={{ width: "50%" }}>
            {status === 'error' && <ErrorBox error={error} />}
            <Paper elevation={6} sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1,
            }}>
                <Box
                    sx={{
                        // marginTop: 5,
                        // p: "1rem 5rem",
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '600px',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={registerHandler} noValidate sx={{ mt: 1 }}>
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
                            id="name"
                            label="Name"
                            name="name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="photo"
                            label="Photo URL"
                            name="photoUrl"
                        />
                        {/* <TextField
                            id="date"
                            margin="normal"
                            label="Birthday"
                            type="date"
                            fullWidth
                            name="birthday"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rePass"
                            label="Repeat Password"
                            type="password"
                            id="rePass"
                            autoComplete="current-password"
                        />
                        {/* <TextField
                            margin="normal"
                            fullWidth
                            id="jobDescription"
                            label="Job Description"
                            name="jobDescription"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="homeLocation"
                            label="Home Location e.g. Sofia, Bulgaria"
                            name="homeLocation"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/auth/login">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;