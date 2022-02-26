import WhiteSpace from "../index_icon/logo_white.svg";
import Instagram from "../index_icon/instagram-brands.svg";
import Facebook from "../index_icon/facebook-square-brands.svg";
import Phone from "../index_icon/phone-alt-solid.svg";
import Email from "../index_icon/envelope-solid.svg";
import Home from "../index_icon/home-solid.svg";
import { Link } from "react-router-dom";

function HRContainer({ datas }) {
  const roomName = datas.map((data) => {
    return (
      <div key={data.id} className="room-card">
        <Link to={`/room/${data.id}`}>
          <img className="room-card-img" src={data.imageUrl} />
        </Link>
        <div className="room-card-content">
          <h2>{data.name}</h2>
          <div className="room-card-prices">
            <span className="room-card-price1">
              NT$
              {data.normalDayPrice}
            </span>
            <span className="room-card-price2">weekday</span>
            <span className="room-card-price3">
              NT${data.holidayPrice}weekend
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <header className="main_logo">
          <div className="logo_wrapper">
            <div className="logo_wrapper-space">
              <img src={WhiteSpace} className="logo" />
            </div>
            <div className="logo_content">
              <div className="logo_content-left">
                <img src={Instagram} className="logo_content-left-icon" />
                <img src={Facebook} className="logo_content-left-icon" />
              </div>
              <div className="logo_content-right">
                <div className="logo_content-right-item">
                  <img src={Phone} className="logo_content-right-icon" />
                  <span className="logo_content-right-text">
                    +49 (0) 271/740-5120
                  </span>
                </div>
                <div className="logo_content-right-item">
                  <img src={Email} className="logo_content-right-icon" />
                  <span className="logo_content-right-text">
                    contact@whitespace.com
                  </span>
                </div>
                <div className="logo_content-right-item">
                  <img src={Home} className="logo_content-right-icon" />
                  <span className="logo_content-right-text">
                    Talblick 268, Siegen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade slideshow"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
                className="d-block w-100 slideshow-img"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                className="d-block w-100 slideshow-img"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1526913621366-a4583840d736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                className="d-block w-100 slideshow-img"
              />
            </div>
          </div>
        </div>

        <div className="room-cards">{roomName}</div>
      </div>
    </>
  );
}

export default HRContainer;
