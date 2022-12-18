import {  } from './App.css'
import {  } from 'react'
import {  } from '@mui/Material/Box'
import {  } from '@mui/material/Button'
import {  } from '@mui/material/Avatar'
import { get } from 'squint-cljs/core.js'
import styles from './App.css';
import { usePixelGridsQuery } from './generated/graphql';
import { Comments, AddComment } from './Comments';
import Box from '@mui/Material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@clerk/clerk-react';
var App = function () {
let map__12 = useUser();
let user3 = get(map__12, "user");
return <div className={styles.App}><Box sx={({ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "height": "20vh" })}><h1>Hello,  {get(user3, "firstName")}</h1> <Avatar alt={get(user3, "firstName")} src={get(user3, "profileImageUrl")} style={({ "width": "100px", "height": "100px" })}></Avatar></Box> <Comments></Comments> <AddComment></AddComment></div>;
}
;

export { App }
