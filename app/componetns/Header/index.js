import React from "react";
import { View, Animated, Image ,Text} from "react-native";
export default class index extends React.Component {
    render() {
    let { params } = this.props.state;
        return (
            <Animated.View
                style={{
                    height: 
                      params !== undefined &&
                      params.changingHeight !== undefined
                        ? params.changingHeight
                        : 120,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "#fff",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center"
                }}
            >
                <Text>自定义头部</Text>
            </Animated.View>
        );
    }
}