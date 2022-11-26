import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { fetchWeathers } from "../store/actions"
import moment from "moment";
import Chart from "./Chart";
const Sity = () => {

  const dispatch = useDispatch()
  const { data } = useSelector(store => store)
  const [key, setkey] = useState()
  const ListObj = {};
  const ListArrays = [];

  useEffect(() => {
    dispatch(fetchWeathers())
  }, [dispatch]);

  function filterdata() {

    for (let i = 0; i <= data?.list?.length; i++) {
      const date = data.list[i]?.dt_txt?.split(" ")[0];

      if (ListObj[date]) {
        ListObj[date].push(data.list[i]);
      } else {
        ListObj[date] = [data.list[i]];
      }
    }
    for (const key of Object.keys(ListObj)) {
      const result = ListObj[key];
      ListArrays.push(result);
    }
  }
  filterdata();
  ListArrays.pop();
  


  function showMoreFunc() {
    const filteredData = ListArrays?.filter(
      (el) => moment(el[0].dt_txt).format("LL") === key
    );
    return filteredData;
  }
  return (
    <Wrapper>
      <div className="city-container" >
        <h3 className="vaqt">{data.list?.length > 0 && moment(data?.list[0]?.dt_txt).format("LL")}</h3>
        <h1>{data?.city?.name}</h1>
        <h1>{data.list?.length > 0 && data.list[0].main.temp_max}℃</h1>
             <div className="datas-weather" >
             <div>
                <p>Wind Gust: {data.list?.length > 0 && data?.list[0]?.wind.gust}</p>
              </div>
              <div>
                <p>Humidity: {data.list?.length > 0 && data?.list[0]?.main.humidity}%</p>
                <p>1007hPa</p>
              </div>
              <div>
                <p>Pressure: {data.list?.length > 0 && data?.list[0]?.main.pressure}</p>
                <p>Visibility: {data.list?.length > 0 && data?.list[0]?.visibility / 1000}km</p>
              </div>
             </div>
              
      </div>
        
      <Container>
        <Box>
          {ListArrays.map(item => {
            return (
              <div className="daysinfo"
                onMouseEnter={() =>
                  setkey(moment(item[0].dt_txt).format("LL"))}
                onMouseLeave={() =>
                  setkey()}>
                <h2>{moment(item[0]?.dt_txt).format("ddd")}</h2>
                <img
                  src={`http://openweathermap.org/img/wn/${item[0].weather[0].icon}@2x.png`}
                  alt=""
                />
                <h3>{item[0]?.main.temp.toFixed(0)}℃</h3>
              </div>
            )
          })}
        </Box>
        <Time>
          {showMoreFunc()[0]?.map((el) => {
            return (
              <div className="timedata" >
                <p>{ moment(key).format("LL")}</p>
                <p>{moment(el.dt_txt).format("LT")}</p>
                <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="" />
                <p>{el.main.temp_max.toFixed(0)}℃</p>
                {/* <p>{el.main.temp_min.toFixed(0)}℃</p> */}
              </div>
            );
          })}
        </Time>
        <div className="chart" >
        { data && <Chart data={data?.list} /> }
        </div>

      </Container>
    </Wrapper>
  )
}
export default Sity;
const Wrapper = styled.div`
      display: flex;
      z-index: 2;
      width: 100%;
      background-color: antiquewhite;
      border: 1px solid red;
     .city-container{
         width: 500px;
         height: 400px;
         margin: 20px;
         border: 1px solid red;
         background-color : white;
         box-shadow: 5px 10px #888888;
         padding: 0 50px;
         p{
         padding: 10px;
         font-size: 25px;
         }
         h1 {
          padding: 5px;
         }
       
         .datas-weather {
          border-left: 3px solid red;
         }
     }
     @media(max-width: 520px) {
      display: block;
      width: 400px;
      .city-container{
       width: 100%;
       height: 110px;
       background-color: white;
       text-align: center;
       margin : 0;
       p{
        padding: 5px;
       }
       h1 {
        padding: 5px;
       }
       .datas-weather{
        display: none;
       }
     }   
}  
`;

const Container = styled.div`
    height: 100vh;
    display: grid;
    margin : 50px auto;
    @media (max-width: 520px){
      .chart{
      display: none;
    }
    }
    

`;
const Box = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 50px;
      margin-bottom: 20px;
       .daysinfo{
         margin: 0 auto;
         width: 150px;
         height: 160px;
         border: 1px solid red;
         text-align: center;
         box-shadow: 5px 10px #888888;
         cursor: pointer;

        img {
          margin: 0;
          padding: 0;
        }
        }   
        @media (max-width: 520px) {
              width: 100%;
              padding: 0;
              display: grid;
              grid-template-columns:  1fr 1fr;
              z-index: 5;
             .daysinfo{
                  /* margin: 0 20px; */
                  text-align: center;
        }
      }
`;
const Time = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    margin: 0 auto;
        
    
    .timedata{
      width: 200px;
      height: 170px;
      border: 1px solid red;
      text-align: center;
      background-color: white;
      z-index: 6;
    }

    @media (max-width: 520px) {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 3px;
        margin: 0 auto;
        align-items: center;
       
       .timedata{
        width: 90px;
        height: 180px;
        border: 1px solid yellow;
        text-align: center;
        gap: 5px;
    }

    }
`;