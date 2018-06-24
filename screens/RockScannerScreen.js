//@flow

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Headline,
  Dialog,
  DialogContent,
  DialogTitle,
  Paragraph,
  DialogActions,
  Button,
  Text
} from "react-native-paper";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";
import { selectors as getCollection } from "../redux/modules/collection";

const mapStateToProps = state => ({
  byId: getCollection.byId(state),
  ids: getCollection.ids(state)
});

class RockScannerScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    dialogVisible: false,
    qrCode: "",
    scannedRockId: "",
    showCamera: true
  };
  didBlurSub: any;
  didFocusSub: any;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });

    this.didFocusSub = this.props.navigation.addListener(
      "didFocus",
      payload => {
        this.setState({ showCamera: true, dialogVisible: false });
      }
    );

    this.didBlurSub = this.props.navigation.addListener("didBlur", payload => {
      this.setState({ showCamera: false, dialogVisible: false });
    });
  }

  _hideDialog = () => this.setState({ dialogVisible: false });

  _navigate = () => {
    this.setState({ dialogVisible: false, showCamera: false }, () =>
      this.props.navigation.push("RockDetail", {
        rockId: this.state.scannedRockId
      })
    );
  };

  render() {
    const {
      hasCameraPermission,
      dialogVisible,
      showCamera,
      scannedRockId,
      qrCode
    } = this.state;
    const { byId, ids } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {hasCameraPermission === null ? (
          <Headline>Requesting camera permission...</Headline>
        ) : hasCameraPermission === false ? (
          <Headline>No access to camera!</Headline>
        ) : showCamera ? (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View />
        )}
        <Dialog visible={dialogVisible} onDismiss={this._hideDialog}>
          <DialogTitle>{"Rock Scanned"}</DialogTitle>
          <DialogContent>
            <Paragraph>
              {(byId[scannedRockId] &&
                `🔎 Looks like... ${byId[scannedRockId].name}!`) ||
                ""}
            </Paragraph>
          </DialogContent>
          <DialogActions>
            <Button onPress={this._hideDialog}>Dismiss</Button>
            <Button primary onPress={this._navigate}>
              Details
            </Button>
          </DialogActions>
        </Dialog>
        <View
          style={{
            position: "absolute",
            top: 60,
            left: 20,
            backgroundColor: "rgba(255,255,255,0.5)"
          }}
        >
          <Text>{`${qrCode}-${scannedRockId}`}</Text>
        </View>
      </View>
    );
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState({ qrCode: data });
    if (!this.state.dialogVisible) {
      this.setState({ dialogVisible: true });
      const rocks = this.props.ids
        .map(id => this.props.byId[id])
        .filter(o => o.qrCode === data);
      if (rocks.length > 0) {
        const rock = rocks[0];
        this.setState({ scannedRockId: rock.key });
      }
    }
  };
}

export default connect(mapStateToProps)(RockScannerScreen);
