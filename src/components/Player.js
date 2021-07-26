import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents
} from "react-native-track-player";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
  const playbackState = usePlaybackState();
  // useTrackPlayerEvents(["playback-track-changed"], async event => {
  //   if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
  //     const track = await TrackPlayer.getTrack(event.nextTrack);
  //     const { title, artist, artwork } = track || {};
  //     setTrackTitle(title);
  //     setTrackArtist(artist);
  //     setTrackArtwork(artwork);
  //   }
  // });

  const { onTogglePlayback } = props;

  var middleButtonText = (
    <FontAwesome
    name="play-circle-o"
    color="#1DA1F2"
    size={48}
    style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
  />
  )

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = (
      <FontAwesome
    name="pause-circle-o"
    color="#1DA1F2"
    size={48}
    style={{ marginLeft: 10, marginTop: 10, paddingTop: 5 }}
  />
    )
  }

  return (
      <View style={styles.controls}>
        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
      </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  
  controls: {
    marginVertical: 20,
    flexDirection: "row"
  },
});