import React from "react";
import { ListItem } from "react-native-paper";
import { connect } from "react-redux";
import { selectors as collectionSelectors } from "../redux/modules/collection";

const mapStateToProps = (state, ownProps) => {
  return {
    rock: collectionSelectors.byId(state)[ownProps.id]
  };
};

class RockListItem extends React.PureComponent {
  render() {
    const { rock } = this.props;
    return <ListItem title={rock.name} description={rock.mineralComposition} />;
  }
}

export default connect(mapStateToProps)(RockListItem);
