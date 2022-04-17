import React from "react";
import indicator from '../../../Images/graphic-arrow-pngrepo-com.png'
class IndicatorIcon extends React.Component {
  render() {
    return (
        <a 
        style={{
            width:"20px",
            height:"20px"
        }}
        href="https://www.freepnglogos.com/pics/rocket" title="Image from freepnglogos.com"><img src={indicator} width="200" alt="rocket icon download png and vector" /></a>
    );
  }
}

export default IndicatorIcon;