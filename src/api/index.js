import axios from "axios";

const url = "https://covid19.mathdro.id/api";

// API 가져오기(데이터패칭)
export const fetchData = async (country) => {
  // 데이터를 동적으로 가져오기
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// 차트데이터 가져오기

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    // 배열 데이터를 필요한 데이터만 가져와서 루프 돌리기

    const modifiedDailyData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedDailyData;
  } catch (error) {
    return error;
  }
};

// 국가 데이터
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
