import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";

import WeatherTesting from "./components/WeatherTesting";

import { API_KEY } from "./utils/WeatherAPICall";

export default class App extends React.Component {
  state = {
    isLoading: true,
    weatherCondition: null,
    temperature: 0,
    error: null,
  };

  componentDidMount() {
    Location.installWebGeolocationPolyfill();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        this.setState({
          error: "Error Unable To Receive Weather Datal!",
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=25&lon=25&appid=1176ed431887c083a7a5ab07d2c1f384&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
        });
      });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <WeatherTesting
            weather={weatherCondition}
            temperature={temperature}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
});
