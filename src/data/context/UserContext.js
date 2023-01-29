import React, { Component } from "react";
import { getDevOrProdAPIURL } from "../getStonks";
import { get, post } from "../fetchWrapper";
import defaultStonks from "../defaultStonks";
import reducer from "../../components/SortCardsReducer";

const UserContext = React.createContext();
export default UserContext;

export class UserProvider extends Component {
  state = {
    user: {},
    stonks: [],
    sortedStonks: [],
    updated: false,
    isLoading: true,
    isMobile: false,
    VOO: {},
  };
  apiUrl = getDevOrProdAPIURL();

  async componentDidMount() {
    if (this.state.stonks.length) return;
    this.setIsMobile(window.innerWidth <= 640);
    try {
      await this.setUserAndStonks();
    } catch (error) {
      console.log("Error in componentDidMount: ", error);
    }
  }

  async setUserAndStonks() {
    try {
      const VOOResult = await get(`${this.apiUrl}/api/stock/quote/VOO`);

      const userResult = await get(
        `${this.apiUrl}/api/user/3a2d78d0-fccb-11e9-89d5-ed165fddd755`
      );

      VOOResult &&
        userResult &&
        this.setState({
          VOO: VOOResult,
          user: userResult,
          isLoading: false,
          stonks: userResult.stonks,
        });
    } catch (error) {
      console.log("An error occurred: ", error);
      this.useDefaults();
    }
  }

  useDefaults() {
    this.setState({
      isLoading: false,
      stonks: defaultStonks,
      user: { name: "Ben" },
      VOO: { changePercent: 0.01, latestPrice: 1 },
    });
  }

  addStonkToStonks = async (userId, stonk) => {
    try {
      const payload = { userId, stonk };

      // change this to add it to the user
      const result = await post(`${this.apiUrl}/api/stock/add`, payload);
      result && this.setState({ stonks: [...this.state.stonks, result] });
      return true;
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  sortStonks = (sortValue) => {
    // Where do we want to handle negative values when sorting undervalued
    const sortedStonks = reducer(this.state.stonks, sortValue);
    this.setState({ sortedStonks });
  };

  setIsMobile(isMobile) {
    this.setState({ isMobile });
  }

  removeStonk = async (stonkSymbol) => {
    try {
      const result = await post(`${this.apiUrl}/api/stock/remove`, stonkSymbol);
      if (result)
        return this.setState({
          stonks: this.state.stonks.filter(
            (stonk) => stonk.symbol !== stonkSymbol
          ),
        });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          addStonkToStonks: this.addStonkToStonks,
          removeStonk: this.removeStonk,
          sortStonks: this.sortStonks,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
