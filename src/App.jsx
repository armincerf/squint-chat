import {  } from 'react'
import {  } from '@mui/material/Box'
import {  } from '@mui/material/Avatar'
import {  } from '@mui/material/Typography'
import { get } from 'squint-cljs/core.js'
import { Comments, AddComment } from './Comments';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useUser } from '@clerk/clerk-react';
var App = function () {
let map__12 = useUser();
let user3 = get(map__12, "user");
let propsa4 = ({ "a": 1, "b": 2 });
let propsb5 = ({ "c": 3, "d": 4 });
return <Box sx={({ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" })}><Box sx={({ "display": "flex", "flexDirection": "row", "gap": "1rem", "alignItems": "center", "justifyContent": "center", "width": "100%" })}><button {...propsa4}></button> <Typography variant="h1">Hello,  {get(user3, "firstName")}</Typography> <Avatar alt={get(user3, "firstName")} src={get(user3, "profileImageUrl")} style={({ "width": "100px", "height": "100px" })}></Avatar></Box> <Comments></Comments> <AddComment></AddComment></Box>;
}
;

export { App }
