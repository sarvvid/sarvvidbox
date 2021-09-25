import React from 'react';
import styled from 'styled-components';
import { Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import account from '../img/account.png';
import Footer from '../components/footer';
import { useTheme } from '../contexts/themeContext';
import copyImage from '../img/copy.png';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
import avatar from '../img/avatar/male1.png'
export default function Account({navigation})  {

    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const [name,setname] = React.useState('');
    const [id,setid] = React.useState('');
    const [avatar_uri,seturi] = React.useState('')
    React.useEffect(()=>{ 
    (async()=>{
        const ut = await AsyncStorage.getItem("userToken")
        const name = await AsyncStorage.getItem("username")
        setid(ut)
        setname(name)
        const g = await AsyncStorage.getItem('gender');
        console.log(g)
        if (g == 'Male'){
            seturi(require('../img/avatar/male1.png'))
        }
        else if(g=="Female"){
            seturi(require("../img/avatar/female1.png"))
        }
        else{
            seturi(require("../img/avatar/female1.png"));
        }

    })()
   
    },[])

    return (
        <View style = {{flex:1, backgroundColor: `${ darkTheme ? "#292929" : "#fff"}`}}>
            <Container>
            <LinearView>
                    <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                        <Header>
                            <View>
                            <HeaderText>Account</HeaderText>
                            <Text style = {{color : "#fff", fontSize:18, fontWeight:"bold"}}>Name: {name}</Text>
                            <View style = {{flexDirection: "row", alignItems: "center"}}>
                            <Text style = {{color : "#fff", fontSize:18, fontWeight:"bold"}}>ID: {id}</Text>
                            <TouchableOpacity onPress = {() => {Clipboard.setString(id)
                             Toast.show({
                                type: 'success',
                                text1: 'Copied',
                                text2: 'Peer Id copied Successfully'
                              });
                            }}><Image source = {copyImage} style = {{marginLeft:5}}/></TouchableOpacity>
                            </View>
                            </View>
                            
                            <ImageView>
                          <Image source = {avatar_uri}/>
                      </ImageView>
                        </Header>
                    </LinearGradient>
                </LinearView>
                <Card dark = {darkTheme}>
                    <CardHead dark = {darkTheme}>Your Storage</CardHead>
                    <CardMain>
                        <SvgView>
                            <Svg >
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#32dac9" strokeWidth = "15"></Circle>
                                <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#653df8" strokeWidth = "15" strokeDasharray = "320" strokeDashoffset = "0"></Circle>
                            </Svg>
                            <Number >
                                <NumberText>0%</NumberText>
                                <NumberText>used</NumberText>
                            </Number>
                        </SvgView>
                        <Details>
                            <DetailsText>Available Space: <HighText>20GB</HighText></DetailsText>
                            <DetailsText>Used Space: <HighText>0GB</HighText></DetailsText>
                            
                        </Details>
                    </CardMain>
                    <View>
                        <SectionHead>Purchased Storage: <Text style = {{fontSize:25, fontWeight:"bold"}}>0GB</Text></SectionHead>
                        <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:15}}>
                            <Button onPress={()=>{
                                Toast.show({
                                type: 'error',
                                text1: 'Disabled',
                                text2: 'Currently Disabled for beta testing'
                                })
                            }}><ButtonText>Buy Storage</ButtonText></Button>
                            <Button><ButtonText>Manage Storage</ButtonText></Button>
                        </View>
                    </View>
                </Card>
            </Container>
            <Footer navigation = {navigation}/>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`
const LinearView = styled.View`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const HeaderText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
   
    
    
`

const ImageView = styled.View`
    background-color:coral;
    border-radius:50px;
`

const Header = styled.View`
    padding: 25px;
    padding-bottom: 35px;
    padding-top:55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const Card = styled.View`
     background-color: ${props => props.dark ? "#434861" : "#fff"};
   border-radius: 25px;
   padding: 15px;
   padding-left: 20px;
   padding-right: 20px;
   margin-top: 25px;
   elevation: 5;
`

const CardHead = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color : ${props => props.dark ? "#fff" : "#000"};
   
`

const CardMain = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
   

`
const SvgView = styled.View`
    width: 150px;
    height: 150px;

    position: relative;
   
   
`

const Details = styled.View`
   margin-bottom: 25px;
   
    
`

const DetailsText = styled.Text`
    color: #0075ff;
    font-size: 18px;
`
const HighText = styled.Text`
    color:#0075ff;
    font-weight: bold;
`

const Button = styled.TouchableOpacity`
    
    align-items: center;
    padding: 13px;
    border-radius: 25px;
    background: #418de1;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    
`
const Number = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 45px;
    left: 48px;
   
`
const  NumberText = styled.Text`
    color: #0075ff;
    font-size: 16px;
    font-weight: bold;
`

const SectionHead = styled.Text`
    font-size: 25px;
    color: #0075FF;
`