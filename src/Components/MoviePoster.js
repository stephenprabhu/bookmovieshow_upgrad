import React from "react";
import { GridList, GridListTile,GridListTileBar } from "@material-ui/core";
import ImageData from "./ImageData";
import ImageData1 from "./ImageData1";
import './MoviePoster.css'
import { Box, Card, CardContent,Typography,CardActions,Button,} from "@material-ui/core";
import {FormControl,InputLabel,FormHelperText,Input} from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/styles';
// import theme from '../theme';

const Genres=['Drama',
  'Romance', 'Horror', 'Action','Crime', 'Thriller', 'Politicial',' Social','Fantasy','Suspense','Adventure','Comedy',
];



function MoviePoster() {
    return (
      <div>
         <div className="MoviePoster">
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
         <div className="item" id="item1">
          <GridList cellHeight={350} cols={4} style={{ width:800, marginLeft:1}}>
          {ImageData1.map((data) => (
            <GridListTile key={data.id}>
              <img src={data.poster_url} alt={data.title} />
              <GridListTileBar
              title={data.title}
              subtitle={data.description}
             />
            </GridListTile>
            ))}
           </GridList>
       </div>
         <div className="item" id="item2"> 
           <Card style={{height:400, paddingLeft:10}}>
            <CardContent>
              <Typography style={{}}>FIND MOVIES BY:</Typography>
             </CardContent>
            <CardActions>
             <FormControl>
               <InputLabel htmlFor="movie_name">Movie Name</InputLabel>
               <Input type="text" className="movie_name" />
              </FormControl>
             <FormControl >

             </FormControl>

          {/* <Button>Apply</Button> */}
        </CardActions>
      </Card>


         </div>
           
       

       </div>
     
  </div>
    );
  }
  
  export default MoviePoster;

