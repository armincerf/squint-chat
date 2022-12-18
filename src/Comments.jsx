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
let queryResponse8 = useGetCommentsQuery();
let queryClient9 = useQueryClient();
let map__710 = useDeleteCommentByIdMutation(mutation_on_success(queryClient9));
let mutate11 = get(map__710, "mutate");
let comments12 = get(get(queryResponse8, "data"), "comments");
return <div><h1>Comments</h1> <div>{map(function (comment) {
return <div key={get(comment, "id")}><Button onClick={function () {
return mutate11(({ "id": get(comment, "id") }));
}}>Delete</Button> <p>{get(comment, "comment")}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments12)}</div></div>;
}
;
var AddComment = function () {
let map__1317 = useUser();
let user18 = get(map__1317, "user");
let map__1419 = useForm();
let register20 = get(map__1419, "register");
let handleSubmit21 = get(map__1419, "handleSubmit");
let map__1522 = register20("test");
let props23 = map__1522;
let ref24 = get(map__1522, "ref");
let onChange25 = get(map__1522, "onChange");
let onBlur26 = get(map__1522, "onBlur");
let name27 = get(map__1522, "name");
let queryClient28 = useQueryClient();
let map__1629 = useAddCommentMutation(mutation_on_success(queryClient28));
let mutate30 = get(map__1629, "mutate");
let on_submit31 = function (data) {
console.log("data", data, register20("test"));
return mutate30(({ "object": ({ "comment": get(data, "test"), "user": get(user18, "id") }) }));
};
return <Box component="form" onSubmit={handleSubmit21(on_submit31)}><TextField variant="outlined" name={name27} onBlur={onBlur26} multiline={t} rows={4} label="Comment" inputRef={ref24} sx={({ "mb": 2 })} onChange={onChange25}></TextField> <Button type="submit">Add Comment</Button></Box>;
}
;

export { t, mutation_on_success, Comments, AddComment }
