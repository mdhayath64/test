import React, { Component } from "react";
import { Grid, Button, Typography, Link } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage"

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
      song: {}
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this)
    this.renderSettingButtton = this.renderSettingButtton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok){
          this.props.leaveRoomCallback();
          this.props.history.push('/');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (this.state.isHost){
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch('/sportify/is-authenticated')
      .then((response) => response.json())
      .then((data) => {
        this.setState({spotifyAuthenticated: data.status});
        if(!data.status) {
          fetch('/sportify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url); 
            });
        }
      });
  }

  getCurrentSong() {
    fetch('/sportify/current-song')
    .then((response) => {
      if (!response.ok) {
        return {};
      } else {
        return response.json();
      }
    })
    .then((data) => {
      this.setState({ song: data });
      console.log(data);
    });
  }

  leaveButtonPressed() {
    const requestOption = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    };
    fetch('/api/leave-room', requestOption)
    .then((_response)=>{
      this.props.leaveRoomCallback();
      this.props.history.push('/');
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    })
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage 
            update={true} 
            votesToSkip={this.state.votesToSkip} 
            guestCanPause={this.state.guestCanPause} 
            roomCode={this.roomCode}
            updateCallBack={this.getRoomDetails}
            />
        </Grid>
        <Grid item xs={12} align="center">
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>);
  }

  renderSettingButtton() {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {this.roomCode}
          </Typography>
        </Grid>

        {/* {this.state.song} */}


        {this.state.isHost ? this.renderSettingButtton() : null}
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed} component={Link}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
