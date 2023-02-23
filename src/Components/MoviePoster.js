import React from "react";
import { FormGroup,GridList, GridListTile,GridListTileBar, MenuItem } from "@material-ui/core";
import ImageData from "./ImageData";
import ImageData1 from "./ImageData1";
import './MoviePoster.css'
import { Box, Card, CardContent,Typography,CardActions,Button,} from "@material-ui/core";
import {FormControl,InputLabel,FormHelperText,Input} from '@material-ui/core';
import { Select, Checkbox} from '@material-ui/core';
 import createTheme from '@material-ui/core/styles/createMuiTheme';
//  import SwaggerUI from "swagger-ui-react"
// import "swagger-ui-react/swagger-ui.css"
//import { ThemeProvider } from "@material-ui/core/styles/MuiThemeProvider";


// const Genres=['Drama',
//   'Romance', 'Horror', 'Action','Crime', 'Thriller', 'Politicial',' Social','Fantasy','Suspense','Adventure','Comedy',
// ];

const theme= createTheme({
  spacing:4,
palette:{
  type: 'light',
  primary: {
    main:'#e3f2fd'
  }
  },
});

function MoviePoster() {
    return (
      <div>
         <div className="Upcoming_Movies">
           <GridList cellHeight={250} cols={6} style={{ width:1400, marginTop:1}}>
            {ImageData.map((data) => (
              <GridListTile key={data.id}>
             <img src={data.poster_url} alt={data.title} />
              <GridListTileBar
              title={data.title}
            />
            </GridListTile>
             ))}
            </GridList>
         </div>

  
       <div className="container">

         <div className="item" id="Released_Movies">
            <GridList cellHeight={350} cols={4} style={{ width:800, marginLeft:1}}>
              {ImageData1.map((data) => (
                  <GridListTile key={data.id}>
                      <img src={data.poster_url} alt={data.title} />
                   <GridListTileBar title={data.title} subtitle={data.description}/>
                  </GridListTile>
                 ))}
            </GridList>
         </div>


      {/* <ThemeProvider theme={theme}>  */}
        
          <div className="item" id="Filter_Movies"> 
             <Card style={{height:450, paddingLeft:20,paddingRight:50,}}>
                <CardContent>
                  <Typography style={{color:'theme.palette.light.main'}}>FIND MOVIES BY:</Typography>
                </CardContent>
               {/* <CardActions> */}
               <FormGroup>
             
                 <FormControl>
                       <InputLabel htmlFor="movie_name">Movie Name</InputLabel>
                         <Input type="text" className="movie_name" id="movietitle" />
                  </FormControl>
                  <br/>
                  <FormControl >
                     <InputLabel htmlFor="select_genres">Genres</InputLabel>
                        <Select id="select_genres" className="genres" >
                       <MenuItem value={1} > <Checkbox >Drama</Checkbox>
                        </MenuItem>
                        </Select>
                  </FormControl>
                   <br/>
                  <FormControl >
                     <InputLabel htmlFor="select_artist">Artists</InputLabel>
                        <Select id="select_artist" className="artist">
                        <MenuItem ></MenuItem>
                        </Select>
                  </FormControl>
                  <br/>
                  <FormControl >
                     <InputLabel htmlFor="select_start_releasedate" shrink="true">Release Date Start</InputLabel>
                      <Input type="date" className="select_date" id="releasedate"></Input>
                  </FormControl>  
                  <br/>
                  <FormControl >
                     <InputLabel htmlFor="select_end_releasedate" shrink="true">Release Date End</InputLabel>
                      <Input type="date" className="select_end_date" id="enddate"></Input>
                  </FormControl> 
                  <br/>
                  <FormControl>
                         <Button className="button" variant='contained' color='primary' >APPLY</Button>
                  </FormControl>
                 
                 </FormGroup>
                {/* </CardActions> */}
              
             </Card>
           </div>
           {/* </ThemeProvider> */}
       </div>
  </div>
    );
  }
  
  export default MoviePoster;

  // onClick="FilterApply{movietitle,select_genres,select_artist,releasedate,enddate}"
  // SwaggerUI url="http://localhost:8085/api/v1/genres"