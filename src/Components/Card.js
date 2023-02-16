import React from "react";
import { GridList, GridListTile,GridListTileBar } from "@material-ui/core";
import ImageData from "./ImageData";
import './Card.css'

function Card() {
    return (
      <div className="Card">
        <GridList cellHeight={250} cols={6} style={{ width:1500, marginTop:1}}>
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
    );
  }
  
  export default Card;

