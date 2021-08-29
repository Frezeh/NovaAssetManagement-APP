import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TransactionInformation from './TransactionInformation';
import Transactions from './Transactions';

const FirstRoute = () => (
    <Transactions />
);

const SecondRoute = () => (
    <TransactionInformation />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'darkgrey' }} >
        <Text>Tab Two</Text>
    </View>
);

export default function Dashboard() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Transactions' },
        { key: 'second', title: 'Account Statement' },
        { key: 'third', title: 'Indicators' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'white'}
            inactiveColor={'black'}
            style={{ marginTop: 5, backgroundColor: '#4682B4', borderTopRightRadius: 75, borderTopLeftRadius: 75 }}
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