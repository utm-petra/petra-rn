import React from "react";
import { List } from "react-native-paper";
import { connect } from "react-redux";
import { selectors as getCollection } from "../redux/modules/collection";

const mapStateToProps = (state, ownProps) => {
  return {
    rock: getCollection.byId(state)[ownProps.id]
  };
};

class RockListItem extends React.PureComponent {
  render() {
    const { rock, visited } = this.props;
    return (
      <List.Item
        title={rock.name}
        description={rock.mineralComposition}
        {...this.props}
        icon={visited ? "check" : ""}
      />
    );
  }
}

export default connect(mapStateToProps)(RockListItem);
