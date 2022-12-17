import {  } from './App.css'
import { useState as react_useState } from 'react'
import {  } from '@mui/Material/Box'
import {  } from '@mui/material/Button'
import {  } from '@mui/material/Avatar'
import { join as str_join } from 'squint-cljs/string.js'
import { get, nth, range, map, first, rand_int } from 'squint-cljs/core.js'
import styles from './App.css';
import { useGetCommentsQuery, usePixelGridsQuery } from './generated/graphql';
import Box from '@mui/Material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@clerk/clerk-react';
var Counter = function (p__1) {
let map__23 = p__1;
let init4 = get(map__23, "init");
let vec__58 = react_useState(init4);
let counter9 = nth(vec__58, 0, null);
let setCount10 = nth(vec__58, 1, null);
return <div>Count: {str_join(" ", range(counter9))} <div><Button onClick={function () {
return setCount10((counter9 + 1));
}}>Click me</Button></div></div>;
}
;
var Comments = function () {
let queryResponse11 = useGetCommentsQuery();
let comments12 = get(get(queryResponse11, "data"), "comments");
return <div><h1>Comments</h1> <div>{map(function (comment) {
return <div key={get(comment, "id")}><p>{get(comment, "comment")}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments12)}</div></div>;
}
;
var RenderGrid = function () {
let pixels_query13 = usePixelGridsQuery();
let pixels14 = get(first(get(get(pixels_query13, "data"), "pixelGrids")), "pixelString");
let pixel_vector15 = pixels14 && JSON.parse(pixels14);
return <Box style={({ "width": "10px", "display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", "gridTemplateRows": "repeat(3, 1fr)" })}>{map(function (row) {
return <div key={rand_int(1000000)}>{map(function (pixel) {
return <div key={rand_int(1000000)} style={({ "width": "10px", "height": "10px", "backgroundColor": ((pixel === 0)) ? ("yellow") : ("red") })}></div>;
}, row)}</div>;
}, pixel_vector15)}</Box>;
}
;
var App = function () {
let vec__1620 = react_useState(0);
let count21 = nth(vec__1620, 0, null);
let setCount22 = nth(vec__1620, 1, null);
let map__1923 = useUser();
let user24 = get(map__1923, "user");
return <div className={styles.App}><Box sx={({ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "height": "20vh" })}><h1>Hello,  {get(user24, "firstName")}</h1> <Avatar alt={get(user24, "firstName")} src={get(user24, "profileImageUrl")} style={({ "width": "100px", "height": "100px" })} onClick={function () {
return setCount22((count21 + 1));
}}></Avatar></Box> <Comments></Comments> <RenderGrid></RenderGrid> <Button onClick={function () {
return setCount22((count21 + 1));
}}>count is {count21}</Button></div>;
}
;
var default$ = App
;

export { Counter, Comments, RenderGrid, App }
export default default$
