import { Link } from "react-router-dom";
import WhiteSpaceLogo from "../index_icon/logo_block.svg";

function Header({ dataImgs }) {
  return (
    <header className="room-header">
      <div>
        <Link to="/">
          <img src={WhiteSpaceLogo} className="room-header-logo" />
        </Link>
      </div>
      <div className="room-header-items">
        <div className="room-header-item0">
          <img src={dataImgs[0]} className="room-header-img" />
        </div>
        <div className="room-header-item1">
          <img src={dataImgs[1]} className="room-header-img" />
        </div>
        <div className="room-header-item2">
          <img src={dataImgs[2]} className="room-header-img" />
        </div>
      </div>
    </header>
  );
}

export default Header;
