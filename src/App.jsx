import {  } from './App.css'
import {  } from 'react'
import {  } from '@mui/Material/Box'
import {  } from '@mui/material/Button'
import {  } from '@mui/material/Avatar'
import { get, first, map, rand_int } from 'squint-cljs/core.js'
import styles from './App.css';
import { usePixelGridsQuery } from './generated/graphql';
import { Comments, AddComment } from './Comments';
import Box from '@mui/Material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@clerk/clerk-react';
var RenderGrid = function () {
let pixels_query1 = usePixelGridsQuery();
let pixels2 = get(first(get(get(pixels_query1, "data"), "pixelGrids")), "pixelString");
let pixel_vector3 = pixels2 && JSON.parse(pixels2);
return <Box style={({ "width": "10px", "display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", "gridTemplateRows": "repeat(3, 1fr)" })}>{map(function (row) {
return <div key={rand_int(1000000)}>{map(function (pixel) {
return <div key={rand_int(1000000)} style={({ "width": "10px", "height": "10px", "backgroundColor": ((pixel === 0)) ? ("yellow") : ("red") })}></div>;
}, row)}</div>;
}, pixel_vector3)}</Box>;
}
;
var App = function () {
let map__45 = useUser();
let user6 = get(map__45, "user");
return <div className={styles.App}><Box sx={({ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "height": "20vh" })}><h1>Hello,  {get(user6, "firstName")}</h1> <Avatar alt={get(user6, "firstName")} src={get(user6, "profileImageUrl")} style={({ "width": "100px", "height": "100px" })}></Avatar></Box> <Comments></Comments> <AddComment></AddComment> <RenderGrid></RenderGrid></div>;
}
;
var default$ = App
;

export { RenderGrid, App }
export default default$
