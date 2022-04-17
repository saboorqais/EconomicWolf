import React from "react";
import indicator from '../../../Images/loudspeaker.png'
class Avertisement extends React.Component {
  render() {
    return (
        <a 
        style={{
            width:"25px",
            height:"25px"
        }}
        href="https://www.freepnglogos.com/pics/rocket" title="Image from freepnglogos.com"><img src={indicator} width="300" alt="rocket icon download png and vector" /></a>
    );
  }
}

export default Avertisement;