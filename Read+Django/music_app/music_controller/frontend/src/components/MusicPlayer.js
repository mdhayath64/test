import React, { Component } from "react";
import {Grid, Typography, Card, Iconbutton} from "@material-ui/core"
import { PlayArrwIcon, SkipNextIcon, PauseIcon} from "@material-ui/icons"

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Card>
            <Grid container alignItems="certer">
                <Grid item align="center" xs={4}>
                    <img src={this.props.image_url} height="100%" width="100%" />
                </Grid>
                <Grid item align="center" xs={8}>
                    <Typography color="textsecondary" variant="subtitle1">
                        {this.props.title}
                    </Typography>
                    <div>
                        <Iconbutton>
                            {this.props.is_playing ? <PauseIcon /> : <PlayArrwIcon />}
                        </Iconbutton>
                    </div>
                    
                </Grid>
            </Grid>
        </Card>
        );
    }
}