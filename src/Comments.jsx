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
import { useGetCommentsQuery, useAddCommentMutation, useDeleteCommentByIdMutation } from './generated/graphql';
var t = (1 === 1)
;
var mutation_on_success = function (query_client) {
return ({ "onSuccess": function () {
return query_client.invalidateQueries("getComments");
} });
}
;
var Comments = function () {
let map__46 = useGetCommentsQuery();
let data7 = get(map__46, "data");
let isLoading8 = get(map__46, "isLoading");
let isFetching9 = get(map__46, "isFetching");
let queryClient10 = useQueryClient();
let map__511 = useDeleteCommentByIdMutation(mutation_on_success(queryClient10));
let mutate12 = get(map__511, "mutate");
let comments13 = get(data7, "comments");
return <div><h1>Comments</h1> {(isFetching9) ? (<h2>fetching</h2>) : (null)} <div>{(isLoading8) ? (<h1>Loading</h1>) : (map(function (comment) {
return <div key={get(comment, "id")}><Button onClick={function () {
return mutate12(({ "id": get(comment, "id") }));
}}>Delete</Button> <p>{get(comment, "comment")}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments13))}</div></div>;
}
;
var AddComment = function () {
let map__1418 = useUser();
let user19 = get(map__1418, "user");
let map__1520 = useForm();
let register21 = get(map__1520, "register");
let handleSubmit22 = get(map__1520, "handleSubmit");
let reset23 = get(map__1520, "reset");
let map__1624 = register21("test");
let props25 = map__1624;
let ref26 = get(map__1624, "ref");
let onChange27 = get(map__1624, "onChange");
let onBlur28 = get(map__1624, "onBlur");
let name29 = get(map__1624, "name");
let queryClient30 = useQueryClient();
let map__1731 = useAddCommentMutation(mutation_on_success(queryClient30));
let mutate32 = get(map__1731, "mutate");
let on_submit33 = function (data) {
console.log("data", data, register21("test"));
reset23();
return mutate32(({ "object": ({ "comment": get(data, "test"), "user": get(user19, "id") }) }));
};
return <Box component="form" onSubmit={handleSubmit22(on_submit33)}><TextField variant="outlined" name={name29} onBlur={onBlur28} multiline={t} rows={4} label="Comment" inputRef={ref26} sx={({ "mb": 2 })} onChange={onChange27}></TextField> <Button type="submit">Add Comment</Button></Box>;
}
;

export { t, mutation_on_success, Comments, AddComment }
