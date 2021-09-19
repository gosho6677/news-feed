import { Avatar, Button, Card, Container, Divider, Grid, Input, Paper, Stack, TextareaAutosize, Typography, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';
import './Feed.css';

const Feed = () => {
    return (
        <Container component="main" className="feed">
            <Box component="aside" className="profile">
                <Card className="profile-card">
                    <Typography sx={{ maxWidth: '100%' }} variant="h6">Georgi Palovaki</Typography>
                    <Avatar className="profile-card-avatar">G</Avatar>
                    <Divider className="profile-divider" />
                    <div className="profile-card-user">
                        <Typography className="profile-card-user-p" variant="body1">
                            <CreateIcon /> Web Developer
                        </Typography>
                        <Typography className="profile-card-user-p" variant="body1">
                            <HomeIcon /> Petrich, Bulgaria
                        </Typography>
                        <Typography className="profile-card-user-p" variant="body1">
                            <CakeIcon /> 19.03.1997
                        </Typography>
                    </div>
                </Card>
            </Box>
            <Box component="section" className="news">
                <Paper className="news-post">
                    <Typography variant="body1">Status:</Typography>
                    <TextareaAutosize
                        id="outlined-basic"
                        className="news-post-desc"
                        label="Outlined"
                        variant="outlined"
                    />
                    <div className="news-inputs">
                        <Input className="news-post-imgUrl" placeholder="Image URL" />
                        <Button variant="contained" className="news-post-btn">POST</Button>
                    </div>
                </Paper>

                <Grid className="news-cards-container" container direction="column">
                    <Grid className="news-card" item>
                        {/* <div className="news-card-user"> */}
                        <Typography className="news-card-user" display="inline-block" variant="h5">
                            <Avatar display="inline-block">G</Avatar>
                        </Typography>
                        <Typography display="inline-block" paragraph>Georgi Palovski</Typography>
                        {/* </div> */}
                        <Divider className="profile-divider" />
                        <Typography className="news-card-desc" paragraph>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore eveniet est sapiente libero culpa rem tempora nostrum autem neque incidunt.
                        </Typography>
                        <img
                            className="news-card-img"
                            src="https://learnenglishteens.britishcouncil.org/sites/teens/files/styles/article/public/field/image/rs930_135120665-low.jpg?itok=g5LI5W4C"
                            alt="forest"
                        />
                        <Typography className="news-card-likes" variant="h6">
                            <FavoriteBorderIcon /> 45 likes
                            <ChatBubbleOutlineTwoToneIcon sx={{ marginLeft: '2rem' }} /> 10 comments
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" className="news-post-btn">Like</Button>
                            <Button variant="contained" className="news-post-btn">Comment</Button>
                        </Stack>
                    </Grid>

                </Grid>
            </Box>
            <Box component="aside" className="events">
                <Typography paragraph>adsdsads</Typography>
            </Box>
        </Container>
    );
};

export default Feed;