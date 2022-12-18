import {  } from 'react'
import {  } from '@mui/material/TextField'
import {  } from '@mui/material/Button'
import {  } from '@mui/Material/Box'
import { get, map } from 'squint-cljs/core.js'
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUser } from '@clerk/clerk-react';
import Box from '@mui/Material/Box';
import { useGetCommentsQuery, useAddCommentMutation } from './generated/graphql';
var t = (1 === 1)
;
var Comments = function () {
let queryResponse7 = useGetCommentsQuery();
let comments8 = get(get(queryResponse7, "data"), "comments");
return <div><h1>Comments</h1> <div>{map(function (comment) {
return <div key={get(comment, "id")}><p>{get(comment, "comment")}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments8)}</div></div>;
}
;
var AddComment = function () {
let map__913 = useUser();
let user14 = get(map__913, "user");
let map__1015 = useForm();
let register16 = get(map__1015, "register");
let handleSubmit17 = get(map__1015, "handleSubmit");
let map__1118 = register16("test");
let props19 = map__1118;
let ref20 = get(map__1118, "ref");
let onChange21 = get(map__1118, "onChange");
let onBlur22 = get(map__1118, "onBlur");
let name23 = get(map__1118, "name");
let queryClient24 = useQueryClient();
let map__1225 = useAddCommentMutation(({ "onSuccess": function () {
return queryClient24.invalidateQueries(queryClient24, "getComments");
} }));
let mutate26 = get(map__1225, "mutate");
let on_submit27 = function (data) {
console.log("data", data, register16("test"));
return mutate26(({ "object": ({ "comment": get(data, "test"), "user": get(user14, "id") }) }));
};
return <Box component="form" onSubmit={handleSubmit17(on_submit27)}><TextField variant="outlined" name={name23} onBlur={onBlur22} multiline={t} rows={4} label="Comment" inputRef={ref20} sx={({ "mb": 2 })} onChange={onChange21}></TextField> <Button type="submit">Add Comment</Button></Box>;
}
;

export { t, Comments, AddComment }
