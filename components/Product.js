import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Advisory from "./Advisory";
import ExchangeTradedFund from "./ExchangeTradedFund";
import MoneyMarketFund from "./MoneyMarketFund";
import NovaDollarFund from "./NovaDollarFund";

const FirstRoute = () => <NovaDollarFund />;

const SecondRoute = () => <MoneyMarketFund />;

const ThirdRoute = () => <ExchangeTradedFund />;

const FourthRoute = () => <Advisory />;

export default function Product() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Nova Dollar Fund" },
    { key: "second", title: "Money Market Fund" },
    { key: "third", title: "Exchange Traded Fund" },
    { key: "fourth", title: "Advisory" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"white"}
      inactiveColor={"black"}
      style={{
        marginTop: 5,
        backgroundColor: "#4682B4",
        borderTopRightRadius: 75,
        borderTopLeftRadius: 75,
      }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
