import { useState, useEffect } from "react";
import WiFi from "../info_icon/wifi.svg";
import Breakfast from "../info_icon/breakfast.svg";
import AirConditioner from "../info_icon/breeze.svg";
import ChildFriendly from "../info_icon/crawling-baby-silhouette.svg";
import GreatView from "../info_icon/mountain-range.svg";
import MiniBar from "../info_icon/bar.svg";
import PetFriendly from "../info_icon/dog.svg";
import RoomService from "../info_icon/room_service.svg";
import SmokeFree from "../info_icon/no-smoke-symbol.svg";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Datepicker from "../components/Datepicker";
import Header from "../components/Header";

function HRBooking() {
  let { id } = useParams();

  const [roomCardName, setRoomCardName] = useState("");
  const [roomCardTel, setRoomCardTel] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataImgs, setDataImgs] = useState([]);
  const [roomName, setRoomName] = useState([]);
  const [roomDescriptionShort, setRoomDescriptionShort] = useState([]);
  const [roomDescription, setRoomDescription] = useState("");
  const [roomCheck, setRoomCheck] = useState("");
  const [roomAmenities, setRoomAmenities] = useState([]);
  const [roomNormalDayPrice, setRoomNormalDayPrice] = useState(0);
  const [roomHolidayPrice, setRoomHolidayPrice] = useState(0);
  const [roomBanDate, setRoomBanDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [normalDay, setNormalDay] = useState(0);
  const [holiDay, setHoliDay] = useState(0);

  const today = new Date();

  const momentToday = moment(
    new Date(today.getTime() + 24 * 60 * 60 * 1000)
  ).format("YYYY-MM-DD");

  const getRoomData = () => {
    axios
      .get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, {
        headers: {
          AUTHORIZATION: `Bearer gDA5B5AOsQDH7rae1DTL7a8TajjUIyKcFZNTW4HHVmTREkBU1vLcT8IW9Szf`,
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setDataImgs(data.data.room[0].imageUrl);
        setRoomName(data.data.room[0].name);
        setRoomDescriptionShort(data.data.room[0].descriptionShort);
        setRoomDescription(data.data.room[0].description);
        setRoomCheck(data.data.room[0].checkInAndOut);
        setRoomAmenities(data.data.room[0].amenities);
        setRoomNormalDayPrice(data.data.room[0].normalDayPrice);
        setRoomHolidayPrice(data.data.room[0].holidayPrice);
        setRoomBanDate(
          data.data.booking.map((e) => {
            return new Date(e.date);
          })
        );
        console.log(data.data);
      });
  };

  const dataPost = (e) => {
    e.preventDefault();
    const headers = {
      AUTHORIZATION:
        "Bearer gDA5B5AOsQDH7rae1DTL7a8TajjUIyKcFZNTW4HHVmTREkBU1vLcT8IW9Szf",
      "Content-Type": "application/json",
    };
    axios({
      url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`,
      method: "post",
      headers,
      data: {
        name: roomCardName,
        tel: roomCardTel,
        date: getDates(),
      },
    })
      .then(() => {
        getRoomData();
        setStartDate(null);
        setEndDate(null);
        setRoomCardName("");
        setRoomCardTel("");
        alert(`訂房成功！
Welcome to White Space.`);
      })
      .catch(function (error) {
        if (error.response) {
          alert("您所提供的訂房時間已有訂房。請重新選擇。");
        }
      });
  };

  useEffect(() => {
    getRoomData();
  }, []);

  const amenities = [
    {
      label: "Wi-Fi",
      img: WiFi,
    },
    {
      label: "Breakfast",
      img: Breakfast,
    },
    {
      label: "Air-Conditioner",
      img: AirConditioner,
    },
    {
      label: "Child-Friendly",
      img: ChildFriendly,
    },
    {
      label: "Great-View",
      img: GreatView,
    },
    {
      label: "Mini-Bar",
      img: MiniBar,
    },
    {
      label: "Pet-Friendly",
      img: PetFriendly,
    },
    {
      label: "Room-Service",
      img: RoomService,
    },
    {
      label: "Smoke-Free",
      img: SmokeFree,
    },
  ];

  const amenitiesMap = amenities.map((a) => {
    return (
      <li
        key={a.label}
        className={
          roomAmenities[a.label]
            ? "main-left-amenities-item"
            : "main-left-amenities-item__opacity"
        }
      >
        <img src={a.img} className="main-left-amenities-icon" />
        <span className="main-left-amenities-title">{a.label}</span>
      </li>
    );
  });

  useEffect(() => {
    if (startDate && endDate) {
      getDates();
    }
    roomTotalPriceAdd();
  }, [startDate, endDate]);

  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const getDates = () => {
    const dateArray = new Array();
    let currentDate = startDate;
    if (currentDate && endDate) {
      while (currentDate < endDate) {
        dateArray.push(moment(new Date(currentDate)).format("YYYY-MM-DD"));
        currentDate = currentDate.addDays(1);
      }
    }
    return dateArray;
  };

  const roomTotalPriceAdd = () => {
    let totalPrice = 0;
    let normalDay = 0;
    let holiDay = 0;
    if (getDates()) {
      getDates().map((e) => {
        const weekday = String(new Date(e)).substring(0, 3);
        if (weekday === "Fri" || weekday === "Sat") {
          totalPrice += roomHolidayPrice;
          holiDay += 1;
        } else {
          totalPrice += roomNormalDayPrice;
          normalDay += 1;
        }
      });
    }
    setTotalPrice(totalPrice);
    setNormalDay(normalDay);
    setHoliDay(holiDay);
  };

  return (
    <>
      <Header dataImgs={dataImgs} />
      <main className="main">
        <div className="main-left">
          <div className="main-left-top">
            <h2 className="main-left-title">{roomName}</h2>
            <ul className="main-left-list">
              <li className="main-left-list-item">
                Max number of guests: {roomDescriptionShort.GuestMin}-
                {roomDescriptionShort.GuestMax}
              </li>
              <li className="main-left-list-item">
                Room size: {roomDescriptionShort.Footage}m²
              </li>
              <li className="main-left-list-item">
                Bed size: {roomDescriptionShort.Bed}
              </li>
              <li className="main-left-list-item">
                Private bath: {roomDescriptionShort["Private-Bath"]}
              </li>
            </ul>
            <p className="main-left-description">{roomDescription}</p>
          </div>
          <div className="main-line-break">
            <span className="line-break"></span>
            <span className="line-break"></span>
            <span className="line-break"></span>
          </div>
          <div className="main-left-checks">
            <div className="main-left-check">
              <span className="main-left-check-title">Check in</span>
              <span className="main-left-check-time">
                {roomCheck.checkInEarly} - {roomCheck.checkInLate}
              </span>
            </div>
            <div className="main-left-check">
              <span className="main-left-check-title">Check out</span>
              <span className="main-left-check-time">{roomCheck.checkOut}</span>
            </div>
          </div>
          <hr></hr>
          <div className="main-left-amenities">
            <ul className="main-left-amenities-list">{amenitiesMap}</ul>
          </div>
        </div>
        <div className="main-right">
          <div className="booking-card">
            <div className="booking-card-wrapper">
              <div className="booking-card-price">
                <div className="booking-card-price-item">
                  <span className="booking-card-price-title">
                    Mon-Thu per night
                  </span>
                  <span className="booking-card-price-night">
                    NT{roomNormalDayPrice}
                  </span>
                </div>
                <div className="booking-card-price-item">
                  <span className="booking-card-price-title">
                    Fri-Sun per night
                  </span>
                  <span className="booking-card-price-night">
                    NT{roomHolidayPrice}
                  </span>
                </div>
              </div>
              <div className="booking-card-form">
                <form className="form" onSubmit={dataPost}>
                  <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                      selected={roomCardName}
                      onChange={(e) => setRoomCardName(e.target.value)}
                      value={roomCardName}
                      placeholder="請輸入姓名"
                      type="text"
                      className="form-input"
                      name="guestName"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Tel</label>
                    <input
                      selected={roomCardTel}
                      onChange={(e) => setRoomCardTel(e.target.value)}
                      value={roomCardTel}
                      placeholder="請輸入手機或電話"
                      type="text"
                      className="form-input"
                      name="tel"
                      required
                    />
                  </div>
                  <Datepicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    roomBanDate={roomBanDate}
                    momentToday={momentToday}
                  />
                  {startDate && endDate && (
                    <div className="form-price">
                      <div className="form-normalDayPrice">
                        <p>
                          Weekday $ {roomNormalDayPrice} x {normalDay} night(s)
                        </p>
                        <p>NT${roomNormalDayPrice * normalDay}</p>
                      </div>
                      <hr />
                      <div className="form-holiDayPrice">
                        <p>
                          Weekday $ {roomHolidayPrice} x {holiDay} night(s)
                        </p>
                        <p>NT${roomHolidayPrice * holiDay}</p>
                      </div>
                      <hr />
                      <div className="form-totalPrice">
                        <p>Total</p>
                        <p>NT${totalPrice}</p>
                      </div>
                      <hr />
                    </div>
                  )}
                  <div className="form-btn">
                    <button type="submit" className="form-submit-btn">
                      Reserve
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default HRBooking;
