import * as React from "react"
import Svg, { Rect } from "react-native-svg";

const ThreeDotsVertical = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="#000000" fill="none" {...props}>
    <Rect x="10.5" y="3" width="3" height="3" rx="1" stroke="currentColor" strokeWidth={props.strokeWidth} />
    <Rect x="10.5" y="10.5" width="3" height="3" rx="1" stroke="currentColor" strokeWidth={props.strokeWidth}/>
    <Rect x="10.5" y="18" width="3" height="3" rx="1" stroke="currentColor" strokeWidth={props.strokeWidth}/>
  </Svg>
);

export default ThreeDotsVertical;
