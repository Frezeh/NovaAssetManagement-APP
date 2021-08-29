import React, { useEffect } from 'react';
import { Text, ScrollView, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaders } from '../redux/ActionCreators';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_400Regular,} from '@expo-google-fonts/ubuntu';
  
export default function About () {

    useEffect(() => {
        dispatch(fetchLeaders());
    }, []);

    const leaders = useSelector(state => state.leaders);

    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        Ubuntu_400Regular,
    });

    function History () {
    
        if (!fontsLoaded) {
         return <AppLoading />;
          } else {
         return (
             <Card title="Who We Are" titleStyle={{fontFamily: 'Ubuntu_400Regular'}}>
                 <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}> 
                 NOVAMBL Asset Management is a wholly owned subsidiary of NOVA Merchant Bank Limited Holding Company.
                 </Text>
                 <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>            
                 Our value proposition has been well curated to proactively cater to our clients’ financial goals for enhancement, consolidation, and distribution of wealth through private wealth management, retail asset management, institutional asset management and private trust service platforms.
                 </Text>
                 <Text style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}> 
                 Ours is a twin-promise of efficiency and best-in-class service delivery leveraging exceptional investment management, investment advisory and financial planning services to individuals and corporate entities who entrust their assets to us. We seek to provide our clients with unrivaled investment performance across a wide range of asset classes through superior market insight, technical expertise and strong execution capabilities.                 
                 </Text>
             </Card>
             );
         }  
     } 

    const RenderLeader = ({item}) => {

        return (

            <Card
            featuredTitle={item.name}
            featuredTitleStyle={{fontFamily: 'Ubuntu_400Regular'}}
            featuredSubtitle={item.designation}
            featuredSubtitleStyle={{fontFamily: 'Ubuntu_400Regular'}}
            image={{uri: baseUrl + item.image}}>
            <Text
                style={{margin: 10, fontFamily: 'Ubuntu_400Regular'}}>
                {item.description}</Text>
        </Card>
        );

    }  

    const home = leaders.leaders.map((leader) => {
        return (
            <ScrollView key={leader._id}>
                <RenderLeader item={leader} />     
            </ScrollView>
        );
    });  
             
        if (leaders.isLoading) {
            return(
                <ScrollView>
                    <History />
                    <Card
                        title='Management Team'
                        titleStyle={{fontFamily: 'Ubuntu_400Regular'}}
                        >
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (leaders.errMess) {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Management Team'
                        titleStyle={{fontFamily: 'Ubuntu_400Regular'}}
                        >
                        <Text>{leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
            <SafeAreaView style={{ flex: 1, backgroundColor: "white", borderTopRightRadius: 75, borderTopLeftRadius: 75, paddingTop: 20 }}>
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <History />
                <Card title ="Management Team" titleStyle={{fontFamily: 'Ubuntu_400Regular'}}>
                    {home}            
                </Card>
                </Animatable.View>
            </ScrollView>
            </SafeAreaView>
            );
        }
    };
