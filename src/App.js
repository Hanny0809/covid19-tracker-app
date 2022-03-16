import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

// API로 불러온 데이터를 컴포넌트로 가져갈 수 있도록 state 설정하기
// constructor은 백엔드에서 설정되니 따로 표기하지 않아도 된다.
class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  // 렌더되기 전에 API 불러오기
  async componentDidMount() {
    const fetchedData = await fetchData();
    // 데이터 설정
    this.setState({ data: fetchedData });
  }

  // 국가 변경 처리
  handleCountryChange = async (country) => {
    // fetch the data
    const fetchedData = await fetchData(country);
    // set the state
    this.setState({
      data: fetchedData,
      country: country,
    });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
