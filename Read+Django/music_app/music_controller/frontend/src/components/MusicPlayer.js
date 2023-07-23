import React, { Component } from "react";
import {
    Grid, 
    Typography, 
    Card, 
    IconButton,
    LinearProgress,
} from "@material-ui/core";
import PlayArrwIcon from "@material-ui/icons/PlayArrow"; 
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    pauseSong() {
        const requestOption = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
          };
        fetch("/sportify/pause", requestOption);
    }

    playSong() {
        const requestOption = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
        };
        fetch("/sportify/play", requestOption);
    }

    skipSong() {
        const requestOption = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        };
        fetch("/sportify/skip", requestOption);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        return (
        <Card>
            <Grid container alignItems="center" >
                <Grid item align="center" xs={4}>
                    <img src={this.props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography component="h5" variant="h5">
                        {this.props.title}
                    </Typography>
                    <Typography color="textsecondary" variant="subtitle1">
                        {this.props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={ () => this.props.is_playing ? this.pauseSong() : this.playSong() }>
                            {this.props.is_playing ? <PauseIcon /> : <PlayArrwIcon />}
                        </IconButton>
                        <IconButton onClick={ () => this.skipSong()}>
                            {this.props.votes} /  {" "}
                            {this.props.votes_required}
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={ songProgress } />
        </Card>
        );
    }
}