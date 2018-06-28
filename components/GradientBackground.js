// @flow
import React from "react";
import { LinearGradient } from "expo";
import type { Theme } from "../constants/Types";

type Props = {
  theme: Theme,
  secondary?: boolean
};

export default class GradientBackground extends React.PureComponent<Props> {
  render() {
    const { theme, secondary, ...otherProps } = this.props;

    return (
      <LinearGradient
        colors={
          secondary
            ? [
                theme.colors.secondaryLight || "red",
                theme.colors.secondary || "blue"
              ]
            : [
                theme.colors.primaryLight || "red",
                theme.colors.primary || "blue"
              ]
        }
        style={{ flex: 1 }}
        start={[0, 0]}
        end={[1, 0]}
        {...otherProps}
      />
    );
  }
}
