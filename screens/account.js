import React, {useCallback} from 'react';
import styled from 'styled-components';
import { Text, View, Image, TouchableOpacity, AsyncStorage, Modal,Alert, Slider,NativeModules } from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import account from '../img/account.png';
import Footer from '../components/footer';
import { useTheme } from '../contexts/themeContext';
import copyImage from '../img/copy.png';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
import avatar from '../img/avatar/male1.png'
import RazorpayCheckout from 'react-native-razorpay';
import { useState } from 'react/cjs/react.development';
import RangeSlider from 'rn-range-slider';
import close from '../img/close.png';
import next from '../img/next.png'
import axios from 'axios';

export default function Account({navigation})  {

    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(25);

    const handleSliderChange = (value) => {
        setSliderValue(value)
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
        if (g == 'male1'){
            seturi(require('../img/avatar/male1.png'))
        }
        else if(g=="female1"){
            seturi(require("../img/avatar/female1.png"))
        }
        else if(g=="male2"){
            seturi(require("../img/avatar/male2.png"));
        }
        else if(g=="male3"){
            seturi(require("../img/avatar/male3.png"));
        }
        else if(g=="female3"){
            seturi(require("../img/avatar/female3.png"));
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
                        <TouchableOpacity >

                        <SectionHead>Purchased Storage: <Text style = {{fontSize:25, fontWeight:"bold"}}>0GB</Text></SectionHead>
                        <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:15}}>
                            <Button 
                            onPress = {() => setModalOpen(true)}

><ButtonText>Buy Storage</ButtonText></Button>
                            <Button><ButtonText>Manage Storage</ButtonText></Button>
                        </View>
                        </TouchableOpacity>
                    </View>
                </Card>
            </Container>
            <Footer navigation = {navigation}/>
                            <ModalContainer>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalOpen}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalOpen(!modalOpen);
                                }}
                            >
                                <ModalView >
                                    <ModalHead>
                                        <Text style = {{fontSize:22}}>Buy Storage</Text>
                                        <TouchableOpacity onPress = {() => setModalOpen(false)}>
                                            <Image source = {close}/>
                                        </TouchableOpacity>
                                    </ModalHead>
                                    <View style = {{width:"100%", marginTop:25}}>
                                        <Text style = {{fontSize:20}}>Select how much storage you want to buy</Text>
                                    </View>

                                    <ModalMain>
                                        <TouchableOpacity onPress = {() => setSliderValue(sliderValue-1)}><Image style = {{transform : [{rotate:"180deg"}]}} source = {next}/></TouchableOpacity>
                                        <Slider
                                            style = {{width:"80%"}}
                                            value = {sliderValue}
                                            maximumValue = {50}
                                            minimumValue = {2}
                                            maximumTrackTintColor = "#3d3d3d"
                                            minimumTrackTintColor = "#3755f9"
                                            thumbTintColor = "#418de1"
                                            
                                            step = {1}
                                            onValueChange = {(value) => handleSliderChange(value)}
                                        />
                                        <TouchableOpacity onPress = {() => setSliderValue(sliderValue+1)}><Image source = {next}/></TouchableOpacity>
                                    </ModalMain>
                                    <View style = {{marginTop:25, flexDirection:"row"}}>
                                        <Text style = {{fontSize:25}}>Total storage:</Text>
                                        <Text style = {{fontSize:25, fontWeight:"500", marginLeft:10}}>{sliderValue} GB</Text>
                                    </View>
                                    <View style = {{marginTop:25, flexDirection:"row"}}>
                                        <Text style = {{fontSize:25}}>Total price:</Text>
                                        <Text style = {{fontSize:25, fontWeight:"500", marginLeft:10}}>{sliderValue*2} rupees / month</Text>
                                    </View>
                                    <View style = {{marginTop:25, width:"100%"}}>
                                        <Button 
                                            onPress={async() => {
                                            const f = await axios({
                                                url : `http://103.155.73.35:3000/createorder?amount=${sliderValue*2*100}`,
                                                method:"POST",
                                                headers:{
                                                    'Content-type' : "application/json",
                                                     Accept : "Application/json"
                                                }
                                            })
                                            const order_id = f.data.order_id
                                                var options = {
                                                description: 'SarvvidBox Storage Purchase',
                                                image: 'https://i.ibb.co/1fwCtPp/logo.png',
                                                currency: 'INR',
                                                key: 'rzp_test_JQkDqcpzn9C2iC',
                                                amount: sliderValue*2*100,
                                                name: 'SarvvidBox',
                                                order_id: order_id,//Replace this with an order_id created using Orders API.
                                                prefill: {
                                                    email: 'gaurav.kumar@example.com',
                                                    contact: '9191919191',
                                                    name: 'Gaurav Kumar'
                                                },
                                                theme: {color: '#53a20e'}
                                                }
                                                RazorpayCheckout.open(options).then(async(data) => {
                                                // handle success
                                                console.log("success")
                                                const at = await AsyncStorage.getItem("authtoken")
                                                const res  = await axios({
                                                    url : `http://103.155.73.35:3000/api/updatestorage?IMEI=${id}&current_storage=${20+sliderValue}&purchased=${sliderValue}`,
                                                    method:"post",
                                                    headers:{
                                                        'Content-type' : "application/json",
                                                        Accept:"Application/json",
                                                        'Authtoken' : at
                                                    },
                                                    body: JSON.stringify({
                                                        expires_date : Date.now()
                                                    })
                                                })
                                                console.log(res.data)
                                                });
                                            }}
                                        >
                                            <ButtonText style = {{fontSize:20}}>Buy now</ButtonText>
                                        </Button>
                                    </View>
                                </ModalView>
                            </Modal>
                            </ModalContainer>
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
const ModalContainer = styled.View`
    flex: 1;
    
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    
`

const ModalView = styled.View`
    margin: auto;
    width:90%;
   
    backgroundColor: white;
    borderRadius: 20px;
    padding: 35px;
    alignItems: center;
    shadowColor: #000;

    shadowOpacity: 0.25;
    shadowRadius: 4px;
    elevation: 25
`

const ModalHead = styled.View`
    flex-direction:row;
    width:100%;
    justify-content:space-between;
    
`
const ModalMain = styled.View`
    width:100%;
   margin-top:45px;
   flex-direction:row;
   justify-content:space-between
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