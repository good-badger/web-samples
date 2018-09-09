import * as React from 'react';
import QRCode from 'qrcode';
import {ApprovalList} from './ApprovalList';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { GridList } from '@material-ui/core';
import GridListTile from '@material-ui/core/GridListTile';



const SERVER_PORT = 3000;
const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;
const SDGs=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17"];

class AppComponent extends React.Component {

  state = {
    imgSrc: "",
    sdg: '01',
  };

  componentWillMount(){

    QRCode.toDataURL(PROTOCOL + "//" + HOST + ":" + SERVER_PORT + "/api/community/callback?wallet=&name=", { errorCorrectionLevel: 'L',   color: {
        dark: '#101010',  // Blue dots
      }})
      .then(url => {
        this.setState({ imgSrc: url});
      })
      .catch(err => {
        console.error(err);
      }
    );
  }

  renderSdgs(){
    return (
      <GridList style={styles.grid} cols={6}>
        {SDGs.map((val,i) => {
          if(i === 0){
            return (
              <GridListTile style={styles.tile1} key={i} cols={1}>
                <img src={'./images/E_SDG_goals_icons-individual-rgb-'+val+'.png'} alt={'SDG-'+val} />
              </GridListTile>
            )
           }else{
             if(this.state.sdg === val){
              return (
                <GridListTile style={styles.tileSelected} key={i} cols={1} onClick={() => this.setState({sdg:val})}>
                  <img src={'./images/E_SDG_goals_icons-individual-rgb-'+val+'.png'} alt={'SDG-'+val} />
                </GridListTile>
              )
               }else{
              return (
                <GridListTile style={styles.tile} key={i} cols={1} onClick={() => this.setState({sdg:val})}>
                  <img src={'./images/E_SDG_goals_icons-individual-rgb-'+val+'.png'} alt={'SDG-'+val} />
                </GridListTile>
              )
               }
          }
        })}
      </GridList>
    )
  }

  render() {

		return (
      <div>
        <Typography style={styles.title} variant="display1" component="h2">Volunteer work</Typography>
        <Card style={styles.card}>
          <CardContent style={styles.content}>
            <img style={styles.mainImg} src="./images/volunteer.jpg"
              alt="Volunteer Work"
              height="250px"
              weight="400px"
            />
            <div style={styles.details}>
              <img src={this.state.imgSrc} alt="QR code could not be created" height="200px" weight="100px"/>
              <Typography component="p" style={styles.qrText}>Scan this code to submit your voluntary service</Typography>
            </div>
            <div>
              <div style={styles.gridContainer}>
                {this.renderSdgs()}
              </div>
            </div>
          </CardContent>
        </Card>
        <ApprovalList sdg={this.state.sdg}/>
      </div>
    );
  }
}

const styles = {
  title: {
    paddingTop: '10px',
    paddingLeft: '5px',
  },
  mainImg: {
    paddingTop: '20px',
  },
  gridContainer: {
    paddingLeft: '60px',
  },
  grid: {
    width: '650px',
  },
  tile1: {
    padding: '1px',
    width: '100px',
    height: '100px',
  },
  tileSelected: {
    padding: '1px',
    width: '100px',
    height: '100px',
    cursor: 'pointer',
    filter: 'brightness(60%)',
  },
  tile: {
    padding: '1px',
    width: '100px',
    height: '100px',
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
  },
  details: {
    flexDirection: 'column',
  },
  content: {
    flex: 'auto 1 1',
    display: 'flex',
  },
  cover: {
    width: 151,
    height: 151,
  },
  qrText: {
    width: 180,
    padding: '10px',
    textAlign: 'center',
  },
};

export const CommunityApp = AppComponent;