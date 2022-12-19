import { useEffect as react_useEffect, useRef as react_useRef } from 'react'
import {  } from '@mui/material/TextField'
import {  } from '@mui/material/Button'
import {  } from '@mui/Material/Box'
import { zero_QMARK_, atom, dec, map, remove, conj, get, into, some, swap_BANG_, merge, inc, filter, str, deref } from 'squint-cljs/core.js'
import { useForm } from 'react-hook-form';
import { useSubscription } from './utils/hooks';
import { useQueryClient } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUser } from '@clerk/clerk-react';
import Box from '@mui/Material/Box';
import { useGetCommentsQuery, useAddCommentMutation, useDeleteCommentByIdMutation } from './generated/graphql';
if ((typeof active_mutations !== 'undefined')) {
null} else {
var active_mutations = atom(0)
};
var get_comments_key = useGetCommentsQuery.getKey()
;
var mutation_on_settled = function (query_client) {
return ({ "onSettled": function () {
swap_BANG_(active_mutations, dec);
if (zero_QMARK_(deref(active_mutations))) {
return query_client.invalidateQueries(get_comments_key);}
} });
}
;
var useCommentsStream = function () {
let query_client4 = useQueryClient();
let on_message5 = function (p__6) {
let map__78 = p__6;
let data9 = get(map__78, "data");
let temp__24682__auto__10 = get(data9, "comments_stream");
if (temp__24682__auto__10) {
let new_comments11 = temp__24682__auto__10;
query_client4.setQueryData(get_comments_key, function (old_comments) {
let current12 = get(old_comments, "comments");
let new13 = filter(function (comment) {
return !some(function (_PERCENT_1) {
return (get(_PERCENT_1, "id") === get(comment, "id"));
}, current12);
}, new_comments11);
return ({ "comments": into(current12, new13) });
});
return query_client4.invalidateQueries(get_comments_key);}
};
let now_string14 = new Date().toISOString();
return useSubscription(({ "operation": str("subscription comments { comments_stream(batch_size: 5, cursor: {initial_value: {createdAt: \"", now_string14, "\"}}) { id comment createdAt user } } "), "onMessage": on_message5, "onError": function (error) {
return console.log("error: ", error);
}, "onComplete": function () {
return console.log("complete");
} }));
}
;
var Comments = function () {
let map__1517 = useGetCommentsQuery();
let data18 = get(map__1517, "data");
let isLoading19 = get(map__1517, "isLoading");
let queryClient20 = useQueryClient();
let map__1621 = useDeleteCommentByIdMutation(merge(({ "onMutate": function (p__22) {
let map__2324 = p__22;
let id25 = get(map__2324, "id");
queryClient20.cancelQueries(get_comments_key);
let previous_data26 = queryClient20.getQueryData(get_comments_key);
queryClient20.setQueryData(get_comments_key, function (p__27) {
let map__2829 = p__27;
let comments30 = get(map__2829, "comments");
return ({ "comments": remove(function (comment) {
return (id25 === get(comment, "id"));
}, comments30) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data26 });
}, "onError": function (_err, _new, context) {
return queryClient20.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient20)));
let mutate31 = get(map__1621, "mutate");
let comments32 = get(data18, "comments");
useCommentsStream();
return <div><h1>What animal says - 'bua bua'</h1> <h2>Today's guesses</h2> <div>{(isLoading19) ? (<h1>Loading</h1>) : (map(function (comment) {
return <div key={JSON.stringify(comment)}><Button onClick={function () {
return mutate31(({ "id": get(comment, "id") }));
}}>Delete</Button> <p>{get(comment, "comment")}</p> <p>{get(comment, "createdAt")}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments32))}</div></div>;
}
;
var useAddInputListener = function (input_ref, on_submit) {
return react_useEffect(function () {
if (input_ref) {
let input33 = get(input_ref, "current");
let submit_on_enter34 = function (e) {
if (!get(e, "shiftKey") && (get(e, "which") === 13)) {
e.preventDefault();
return on_submit();}
};
if (input33) {
input33.addEventListener("keydown", submit_on_enter34);
return function () {
return input33.removeEventListener("keydown", submit_on_enter34);
};}}
}, [input_ref, on_submit]);
}
;
var AddComment = function () {
let map__3539 = useUser();
let user40 = get(map__3539, "user");
let map__3641 = useForm();
let register42 = get(map__3641, "register");
let handleSubmit43 = get(map__3641, "handleSubmit");
let reset44 = get(map__3641, "reset");
let map__3745 = register42("test");
let ref46 = get(map__3745, "ref");
let onChange47 = get(map__3745, "onChange");
let onBlur48 = get(map__3745, "onBlur");
let name49 = get(map__3745, "name");
let queryClient50 = useQueryClient();
let map__3851 = useAddCommentMutation(merge(({ "onMutate": function (p__52) {
let map__5354 = p__52;
let object55 = get(map__5354, "object");
queryClient50.cancelQueries(get_comments_key);
let previous_data56 = queryClient50.getQueryData(get_comments_key);
queryClient50.setQueryData(get_comments_key, function (p__57) {
let map__5859 = p__57;
let comments60 = get(map__5859, "comments");
return ({ "comments": conj(comments60, object55) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data56 });
}, "onError": function (_err, _new, context) {
return queryClient50.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient50)));
let mutate61 = get(map__3851, "mutate");
let input_ref62 = react_useRef(null);
let on_submit63 = function (data) {
reset44();
return mutate61(({ "object": ({ "comment": get(data, "test"), "user": get(user40, "id") }) }));
};
let _64 = useAddInputListener(input_ref62, handleSubmit43(on_submit63));
return <Box component="form" onSubmit={handleSubmit43(on_submit63)}><p>{deref(active_mutations)}</p> <TextField variant="outlined" name={name49} onBlur={onBlur48} multiline={true} rows={4} label="Comment" inputRef={function (e) {
input_ref62["current"] = e;
return ref46(e);
}} sx={({ "mb": 2 })} onChange={onChange47}></TextField> <Button type="submit">Guess the animal</Button></Box>;
}
;

export { active_mutations, get_comments_key, mutation_on_settled, useCommentsStream, Comments, useAddInputListener, AddComment }
