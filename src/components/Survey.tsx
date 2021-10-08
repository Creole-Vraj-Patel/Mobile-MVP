import React, { useEffect, useState } from "react";
import SurveyHeader from "./SurveyHeader";
import { ProgressBar, Spinner } from "react-bootstrap";
import SurveyData from "./SurveyData";
import SurveySidebar from "./Sidebar/SurveySidebar";
import AlertModal from "./Modal/AlertModal";
import InfoModal from "./Modal/InfoModal";
import Successful from "../components/Successful";
import { useParams } from "react-router";
import { nanoid } from "nanoid";
import { MarketOptiontype, MarketType } from "../types";
import { Howl, Howler } from "howler";
import axios from "axios";
import AlertSound from "../assets/sounds/Alert.mp3";

const Survey = () => {
  const localSurveyData = localStorage.getItem("survey_data");
  const localCartData = localStorage.getItem("cart_data");
  const localThankYouPage = localStorage.getItem("thank_you_page");
  const localDefaultData = localStorage.getItem("default_data");
  const localTimer = localStorage.getItem("timer");

  const [fetchedData, setFetchedData] = useState<any>([]);
  const [defaultData, setDefaultData] = useState<MarketType[] | []>(
    localDefaultData !== null && localDefaultData !== undefined ? JSON.parse(localDefaultData) : []
  );
  const [surveyData, setSurveyData] = useState<MarketType[] | []>(
    localSurveyData !== null ? JSON.parse(localSurveyData) : []
  );
  const [cartData, setCartData] = useState<MarketType[] | []>(localCartData !== null ? JSON.parse(localCartData) : []);
  const [timer, setTimer] = useState<number>(0);
  const [showThankyouPage, setShowThankyouPage] = useState<boolean>(
    localThankYouPage !== null ? JSON.parse(localThankYouPage) : false
  );
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showInfoPopup, setShowInfoPopup] = useState<boolean>(false);
  const [showTimerAlert, setShowTimerAlert] = useState<boolean>(false);
  const [infoID, setInfoID] = useState<number>(0);
  const { userId } = useParams<{ userId: string }>();  

  useEffect(() => {
    showTimerPopUp();

    let formData = new FormData();
    formData.append("rid", userId);
    fetch("https://market-flask-app.herokuapp.com/api/start_survey", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (fetchedData.length === 0) {
      console.log("API is not fetched yet......");
    } else if (fetchedData.message === "rid is already used") {
      // debugger
      localSurveyData !== null && setSurveyData(JSON.parse(localSurveyData));
    } else {
      let fetched_data = [
        {
          id: fetchedData.body[0].market1[0].id,
          question: "Which Kodiak product will sell the most?",
          subtotal: 0,
          options: [
            {
              id: fetchedData.body[0].market1[0].option1.id,
              name: "Bacon, Egg and Cheese Biscuit Protein Breakfast Sandwich",
              price: fetchedData.body[0].market1[0].option1.price_1
                ? fetchedData.body[0].market1[0].option1.price_1
                : 0.0,
              quantity: fetchedData.body[0].market1[0].option1.bet_1,
              total: fetchedData.body[0].market1[0].option1.money_bet_1,
            },
            {
              id: fetchedData.body[0].market1[0].option2.id,
              name: "Kids Chocolate Blueberry Power Waffle",
              price: fetchedData.body[0].market1[0].option2.price_2
                ? fetchedData.body[0].market1[0].option2.price_2
                : 0.0,
              quantity: fetchedData.body[0].market1[0].option2.bet_2,
              total: fetchedData.body[0].market1[0].option2.money_bet_2,
            },
            {
              id: fetchedData.body[0].market1[0].option3.id,
              name: "High Protein Multi-Purpose Cake Flour",
              price: fetchedData.body[0].market1[0].option3.price_3
                ? fetchedData.body[0].market1[0].option3.price_3
                : 0.0,
              quantity: fetchedData.body[0].market1[0].option3.bet_3,
              total: fetchedData.body[0].market1[0].option3.money_bet_3,
            },
            {
              id: fetchedData.body[0].market1[0].option4.id,
              name: "Protein Power To-Go Bars",
              price: fetchedData.body[0].market1[0].option4.price_4
                ? fetchedData.body[0].market1[0].option4.price_4
                : 0.0,
              quantity: fetchedData.body[0].market1[0].option4.bet_4,
              total: fetchedData.body[0].market1[0].option4.money_bet_4,
            },
          ],
        },
        {
          id: fetchedData.body[0].market2[0].id,
          question: "Who will be the host of Jeopardy! for the next season?",
          subtotal: 0,
          options: [
            {
              id: fetchedData.body[0].market2[0].option1.id,
              name: "Ken Jennings",
              price: fetchedData.body[0].market2[0].option1.price_1
                ? fetchedData.body[0].market2[0].option1.price_1
                : 0.0,
              quantity: fetchedData.body[0].market2[0].option1.bet_1,
              total: fetchedData.body[0].market2[0].option1.money_bet_1,
            },
            {
              id: fetchedData.body[0].market2[0].option2.id,
              name: "LaVar Burton",
              price: fetchedData.body[0].market2[0].option2.price_2
                ? fetchedData.body[0].market2[0].option2.price_2
                : 0.0,
              quantity: fetchedData.body[0].market2[0].option2.bet_2,
              total: fetchedData.body[0].market2[0].option2.money_bet_2,
            },
            {
              id: fetchedData.body[0].market2[0].option3.id,
              name: "Aaron Rodgers",
              price: fetchedData.body[0].market2[0].option3.price_3
                ? fetchedData.body[0].market2[0].option3.price_3
                : 0.0,
              quantity: fetchedData.body[0].market2[0].option3.bet_3,
              total: fetchedData.body[0].market2[0].option3.money_bet_3,
            },
            {
              id: fetchedData.body[0].market2[0].option4.id,
              name: "Somebody else",
              price: fetchedData.body[0].market2[0].option4.price_4
                ? fetchedData.body[0].market2[0].option4.price_4
                : 0.0,
              quantity: fetchedData.body[0].market2[0].option4.bet_4,
              total: fetchedData.body[0].market2[0].option4.money_bet_4,
            },
          ],
        },
        {
          id: fetchedData.body[0].market3[0].id,
          question: "How many games will BYU’s football team win?",
          subtotal: 0,
          options: [
            {
              id: fetchedData.body[0].market3[0].option1.id,
              name: "6 or fewer",
              price: fetchedData.body[0].market3[0].option1.price_1
                ? fetchedData.body[0].market3[0].option1.price_1
                : 0.0,
              quantity: fetchedData.body[0].market3[0].option1.bet_1,
              total: fetchedData.body[0].market3[0].option1.money_bet_1,
            },
            {
              id: fetchedData.body[0].market3[0].option2.id,
              name: "7",
              price: fetchedData.body[0].market3[0].option2.price_2
                ? fetchedData.body[0].market3[0].option2.price_2
                : 0.0,
              quantity: fetchedData.body[0].market3[0].option2.bet_2,
              total: fetchedData.body[0].market3[0].option2.money_bet_2,
            },
            {
              id: fetchedData.body[0].market3[0].option3.id,
              name: "8",
              price: fetchedData.body[0].market3[0].option3.price_3
                ? fetchedData.body[0].market3[0].option3.price_3
                : 0.0,
              quantity: fetchedData.body[0].market3[0].option3.bet_3,
              total: fetchedData.body[0].market3[0].option3.money_bet_3,
            },
            {
              id: fetchedData.body[0].market3[0].option4.id,
              name: "9 or more",
              price: fetchedData.body[0].market3[0].option4.price_4
                ? fetchedData.body[0].market3[0].option4.price_4
                : 0.0,
              quantity: fetchedData.body[0].market3[0].option4.bet_4,
              total: fetchedData.body[0].market3[0].option4.money_bet_4,
            },
          ],
        },
        {
          id: fetchedData.body[0].market4[0].id,
          question: "Will upcoming James Bond film “No Time To Die” be “Certified Fresh” by Rotten Tomatoes?",
          subtotal: 0,
          options: [
            {
              id: fetchedData.body[0].market4[0].option1.id,
              name: "Yes",
              price: fetchedData.body[0].market4[0].option1.price_1
                ? fetchedData.body[0].market4[0].option1.price_1
                : 0.0,
              quantity: fetchedData.body[0].market4[0].option1.bet_1,
              total: fetchedData.body[0].market4[0].option1.money_bet_1,
            },
            {
              id: fetchedData.body[0].market4[0].option2.id,
              name: "No",
              price: fetchedData.body[0].market4[0].option2.price_2
                ? fetchedData.body[0].market4[0].option2.price_2
                : 0.0,
              quantity: fetchedData.body[0].market4[0].option2.bet_2,
              total: fetchedData.body[0].market4[0].option2.money_bet_2,
            },
          ],
        },
      ];

      setDefaultData(fetched_data);
      setSurveyData(fetched_data);
      localStorage.setItem("default_data", JSON.stringify(fetched_data));
      localStorage.setItem("survey_data", JSON.stringify(fetched_data));
    }
  }, [fetchedData]);

  localStorage.setItem("survey_data", JSON.stringify(surveyData));
  localStorage.setItem("userId", userId);
  localStorage.setItem("cart_data", JSON.stringify(cartData));

  let totalPurchase;
  let totalShares;

  const playNotification = () => {
    Howler.volume(1.0);
    const sound = new Howl({
      src: [AlertSound],
      autoplay: true,
    });
    sound.play();
  };

  const submitData = () => {
    const l_cart_data = localStorage.getItem("cart_data");
    console.log(l_cart_data !== null && JSON.parse(l_cart_data));

    if (l_cart_data !== null && JSON.parse(l_cart_data).length !== 0) {
      console.log("data in cart");
      const parse_l_cart_data = JSON.parse(l_cart_data);
      let convertedData = {};

      const marketIDs = parse_l_cart_data.map((market: any) => market.id);
      const marketOptions = parse_l_cart_data.map((market: any) => market.options);

      for (let d in parse_l_cart_data) {
        const optId = marketOptions[d].map((m: any) => m.id);
        const optBet = marketOptions[d].map((m: any) => m.quantity);
        let opts: any = [];
        for (let i in optId) {
          opts = [
            ...opts,
            {
              id: optId[i],
              bet: optBet[i],
            },
          ];
        }
        let marketName = `market${parseInt(d) + 1}`;
        convertedData = {
          ...convertedData,
          [marketName]: {
            id: marketIDs[d],
            options: opts,
          },
        };
      }
      axios
        .post("https://market-flask-app.herokuapp.com/api/end_survey", JSON.stringify(convertedData), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setShowThankyouPage(true);
          localStorage.setItem("thank_you_page", "true");
        })
        .catch((err) => console.log(err));

      axios.get("https://market-flask-app.herokuapp.com/api/prices");
    } else {
      console.log("after 10 min");
      const localData = localStorage.getItem("timer");
      if (localData !== null && JSON.parse(localData) >= 599) {
        console.log("inside data");

        axios
          .post(
            "https://market-flask-app.herokuapp.com/api/end_survey",
            JSON.stringify({
              market1: { id: 1, options: [{ id: 11, bet: 0 }] },
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            setShowThankyouPage(true);
            localStorage.setItem("thank_you_page", "true");
          })
          .catch((err) => console.log(err));
        axios.get("https://market-flask-app.herokuapp.com/api/prices");
      } else {
        console.log("there is no Shares in Cart");
      }
    }
    localStorage.setItem("thank_you_page", "true");
  };

  const showTimerPopUp = () => {
    if (surveyData) {
      const timeLimit = 480;
      const localTimer = localStorage.getItem("timer");
      const localTimerCount = localStorage.getItem("timer_count");
      let i = localTimer !== null ? JSON.parse(localTimer) : 0;
      let count = localTimerCount !== null ? JSON.parse(localTimerCount) : 0;
      const timer = setInterval(() => {
        i++;
        if (i === timeLimit && count == 0) {
          count++;
          localStorage.setItem("timer_count", JSON.stringify(count));
          setShowTimerAlert(true);
          setShowWarning(true);
          playNotification();
        }
        if (i >= 600) {
          submitData();
          clearInterval(timer);
          localStorage.setItem("thank_you_page", "true");
          setShowThankyouPage(true);
        }
        setTimer(i);
        localStorage.setItem("timer", JSON.stringify(i));
        localStorage.setItem("thank_you_page", "false");
      }, 1000);
    }
  };

  const showBalancePopup = () => {
    setShowTimerAlert(false);
    setShowWarning(true);
    playNotification();
  };

  if (cartData) {
    const optionsData = cartData.map((market) => market.options);
    optionsData.map((option) => option);
    const onlyOpt: MarketOptiontype[] = Array.prototype.concat.apply(
      [],
      optionsData.map((option) => option)
    );
    const subtotalArr = onlyOpt.map((opt) => opt.total);
    const totalSharesArr = onlyOpt.map((opt) => opt.quantity);

    totalPurchase = parseFloat(subtotalArr.reduce((p, c) => p + c, 0).toFixed(2));
    totalShares = totalSharesArr.reduce((p, c) => p + c, 0);
  }

  return (
    <>
      {/* {surveyData.length !== 0 ? ( */}
      <>
        {!showThankyouPage && (
          <div className="app_background_overlay" style={{ display: toggleSidebar ? "block" : "none", zIndex: 9 }} />
        )}
        <div className="survey">
          {surveyData.length !== 0 ? (
            <>
              <AlertModal
                showWarning={showWarning}
                setShowWarning={setShowWarning}
                type={showTimerAlert ? "time" : "balance"}
                timer={timer}
                toggleSidebar={toggleSidebar}
                setToggleSidebar={setToggleSidebar}
              />
              <InfoModal
                showInfoPopup={showInfoPopup}
                setShowInfoPopup={setShowInfoPopup}
                surveyData={surveyData}
                infoID={infoID}
              />
              {!showThankyouPage ? (
                <>
                  <SurveySidebar
                    totalShares={totalShares}
                    totalPurchase={totalPurchase}
                    surveyData={surveyData}
                    setSurveyData={setSurveyData}
                    cartData={cartData}
                    setCartData={setCartData}
                    toggleSidebar={toggleSidebar}
                    setToggleSidebar={setToggleSidebar}
                    setShowThankyouPage={setShowThankyouPage}
                    submitData={submitData}
                  />
                  <SurveyHeader
                    totalPurchase={totalPurchase}
                    toggleSidebar={toggleSidebar}
                    setToggleSidebar={setToggleSidebar}
                    timer={timer}
                  />
                  <p className="text-center font-italic my-2" style={{ color: "#727272" }}>
                    <em>Tap an option to purchase a share</em>
                  </p>
                  <SurveyData
                    showBalancePopup={showBalancePopup}
                    totalPurchase={totalPurchase}
                    surveyData={surveyData}
                    setSurveyData={setSurveyData}
                    cartData={cartData}
                    setCartData={setCartData}
                    showInfoPopup={showInfoPopup}
                    setShowInfoPopup={setShowInfoPopup}
                    setInfoID={setInfoID}
                    infoID={infoID}
                  />
                </>
              ) : (
                  <div  className='d-flex justify-content-center align-items-center w-100' style={{height: '100vh'}}>
                    <Successful />
                  </div>
              )}
            </>
          ) : (
            <div className='d-flex justify-content-center align-items-center w-100' style={{height: '100vh'}}>
              <Spinner animation="border" />
            </div>
          )}
        </div>
      </>
      {/* ) : (
        <div>Loading...</div>
      )} */}
    </>
  );
};

export default Survey;
