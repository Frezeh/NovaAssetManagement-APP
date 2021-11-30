import React from "react";
import { Text, ScrollView, SafeAreaView } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import AppLoading from "expo-app-loading";
import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";

export default function Advisory() {
  let [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  function Advisory1() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <Card
          title="08 MAY 2021"
          titleStyle={{ fontFamily: "Ubuntu_400Regular" }}
        >
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            UNDERSTANDING INVESTMENT RISKS VS RETURNS
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            What does risk mean to you? It could be making certain business or
            personal decisions, skydiving, or even as simple as eating a new
            delicacy you haven’t tried before. When we hear the word “risk”, we
            instantly become worried about what happens next, especially if it
            involves finances – no one really wants to lose money. It is
            important to understand the concept of risk to return and ensure
            that the right investment opportunities are what you should
            consider. Risk and return are opposite concepts in the financial
            world. Risk-return shows that the more the potential returns, the
            higher the risk. However, risk does not always mean the possibility
            of losing your money, it could mean that investment outcomes could
            vary actual expectations. As you embark on your investment journey,
            it is key to examine and make calculated risks in order to minimise
            loss and reap returns that are consistent with your financial
            objectives.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Here are a few tips on what you need to know about risk vs return:
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            1. Learn the variety of risks in investments– This could be interest
            rate risk, which is a risk that arises from fluctuating interest
            rates; business risks, usually influenced from the profit or loss of
            a business; or dividend risk – which is basically a drop in share
            prices. Be sure to understand what level of risk applies to your
            investment to guide you in making an objective investment decision.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            2. Diversify your assets- Diversification simply means investing in
            more than one industry or financial product so that all your eggs
            are not in one basket. This will help you spread your risks. By
            selecting different investments in various asset classes, you are
            reducing your exposure to risks.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            3. You need a financial expert or risk advisor– A professional asset
            manager sets you on the right path to risk mitigation. They can help
            you evaluate, predict, and ascertain potential risks. They can
            identify high risk to high return products, low risk with minimal
            returns and more. Most importantly, an expert will show you the best
            ways to manage your risks.
          </Text>
        </Card>
      );
    }
  }

  function Advisory2() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <Card
          title="28 JAN 2021"
          titleStyle={{ fontFamily: "Ubuntu_400Regular" }}
        >
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            CONTEXTUALISING RETURN OF INVESTMENT
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            The word “return” in general terms is a measure of profit generated
            over a period of time on an invested amount. The concept of return
            can sometimes be confusing because of the varying measures that can
            be used to compute return. This article seeks to identify the
            popular measures of return and how to apply them in evaluating
            investment performance and in making apple-to-apple comparisons
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Relative Return: Relative return is an important measure of return
            because it provides a reasonable basis for measuring/comparing the
            performance of actively managed funds or investment managers.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            A question that is often asked is: how does an investor or analyst
            determine if a Fund Manager is doing a good job or note? A Fund
            Manger’s performance should be judged relative to peers and the
            state of economy e.g. a gain of 3% in a bull market (market where
            stocks are generally performing well) may be considered poor if peer
            Fund Managers are recording gains of 10% conversely a 1% gain in a
            bear market (market where stocks are generally performing poorly) is
            good where compared to peer fund managers making losses of 6%.
            Therefore, an absolute return figure of 10% does not say much; for
            this figure to be meaningful it must be evaluated in the context of
            current market conditions and relative to peers.
          </Text>
        </Card>
      );
    }
  }

  function Advisory3() {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <Card
          title="02 JAN 2021"
          titleStyle={{ fontFamily: "Ubuntu_400Regular" }}
        >
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            5 STEPS TO START INVESTING
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Investing is simply using your money to create wealth for yourself
            by making the conscious decision to be financially smart through
            structured long or short term investments. Changing your spending
            habits so you can set aside money to invest may not seem so easy at
            first, but the benefits and the opportunity to improve your future
            makes it worth it.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            5 steps to start investing;
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Make wiser spending decisions: focus on your needs rather than your
            wants. Once you have made the decision to begin your investment
            journey, it is important to cut down on unnecessary expenses.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Master the art of budgeting: set a goal on how much you can invest
            either monthly or quarterly. Create a realistic monthly budget and
            set aside a percentage to be invested; remember to spend less than
            you earn.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Spend what is left after investing: once you have identified the
            amount you can invest as a beginner, only spend what is remaining.
            It is the wise thing to do which will guide you on a path to
            financial discipline.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            You can start small: setting up an investment account does not mean
            you require a huge amount of money to begin. Different investment
            categories are available for you to choose from based on your
            earnings and goals.
          </Text>
          <Text style={{ margin: 10, fontFamily: "Ubuntu_400Regular" }}>
            Seek expert financial advice: contact an asset manager like Nova
            Asset Management to discuss your financial goals with an expert, so
            that you are clear on your investment strategy and achieving these
            goals in the long run.
          </Text>
        </Card>
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Advisory1 />
          <Advisory2 />
          <Advisory3 />
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}
