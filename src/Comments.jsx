import { useEffect as react_useEffect, useRef as react_useRef } from 'react'
import {  } from '@mui/material/TextField'
import {  } from '@mui/material/Button'
import {  } from '@mui/material/Box'
import { zero_QMARK_, atom, dec, map, remove, conj, get, into, some, swap_BANG_, merge, inc, filter, str, deref, assoc } from 'squint-cljs/core.js'
import { useForm } from 'react-hook-form';
import { useSubscription } from './utils/hooks';
import { useQueryClient } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUser } from '@clerk/clerk-react';
import Box from '@mui/material/Box';
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
let temp__25016__auto__10 = get(data9, "comments_stream");
if (temp__25016__auto__10) {
let new_comments11 = temp__25016__auto__10;
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
return useSubscription(({ "operation": str("subscription comments {", "comments_stream(batch_size: 5, cursor: {initial_value: {createdAt: \"", now_string14, "\"}}) { id comment createdAt user } } "), "onMessage": on_message5, "onError": function (error) {
return console.log("error: ", error);
}, "onComplete": function () {
return console.log("complete");
} }));
}
;
var Comments = function () {
let map__1518 = useGetCommentsQuery();
let data19 = get(map__1518, "data");
let isLoading20 = get(map__1518, "isLoading");
let queryClient21 = useQueryClient();
let map__1622 = useUser();
let user23 = get(map__1622, "user");
let map__1724 = useDeleteCommentByIdMutation(merge(({ "onMutate": function (p__25) {
let map__2627 = p__25;
let id28 = get(map__2627, "id");
queryClient21.cancelQueries(get_comments_key);
let previous_data29 = queryClient21.getQueryData(get_comments_key);
queryClient21.setQueryData(get_comments_key, function (p__30) {
let map__3132 = p__30;
let comments33 = get(map__3132, "comments");
return ({ "comments": remove(function (comment) {
return (id28 === get(comment, "id"));
}, comments33) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data29 });
}, "onError": function (_err, _new, context) {
return queryClient21.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient21)));
let mutate34 = get(map__1724, "mutate");
let comments35 = get(data19, "comments");
let timestamp_formatted36 = function (timestamp) {
if (timestamp) {
let date37 = new Date(timestamp);
return date37.toLocaleString("en-US", ({ "month": "short", "day": "numeric", "hour": "numeric", "minute": "numeric" }));}
};
useCommentsStream();
return <div><h2>Chat room</h2> <div>{(isLoading20) ? (<h1>Loading</h1>) : (map(function (comment) {
return <div key={JSON.stringify(comment)}>{((get(comment, "user") === get(user23, "id"))) ? (<Button onClick={function () {
return mutate34(({ "id": get(comment, "id") }));
}}>Delete</Button>) : (null)} <p>{get(comment, "comment")}</p> <p>{timestamp_formatted36(get(comment, "createdAt"))}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments35))}</div></div>;
}
;
var useAddInputListener = function (input_ref, on_submit) {
return react_useEffect(function () {
if (input_ref) {
let input38 = get(input_ref, "current");
let submit_on_enter39 = function (e) {
if (!get(e, "shiftKey") && (get(e, "which") === 13)) {
e.preventDefault();
return on_submit();}
};
if (input38) {
input38.addEventListener("keydown", submit_on_enter39);
return function () {
return input38.removeEventListener("keydown", submit_on_enter39);
};}}
}, [input_ref, on_submit]);
}
;
var AddComment = function () {
let map__4044 = useUser();
let user45 = get(map__4044, "user");
let map__4146 = useForm();
let register47 = get(map__4146, "register");
let handleSubmit48 = get(map__4146, "handleSubmit");
let reset49 = get(map__4146, "reset");
let map__4250 = register47("test");
let registerProps51 = map__4250;
let ref52 = get(map__4250, "ref");
let queryClient53 = useQueryClient();
let map__4354 = useAddCommentMutation(merge(({ "onMutate": function (p__55) {
let map__5657 = p__55;
let object58 = get(map__5657, "object");
queryClient53.cancelQueries(get_comments_key);
let previous_data59 = queryClient53.getQueryData(get_comments_key);
queryClient53.setQueryData(get_comments_key, function (p__60) {
let map__6162 = p__60;
let comments63 = get(map__6162, "comments");
return ({ "comments": conj(comments63, assoc(object58, "createdAt", new Date().toISOString())) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data59 });
}, "onError": function (_err, _new, context) {
return queryClient53.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient53)));
let mutate64 = get(map__4354, "mutate");
let input_ref65 = react_useRef(null);
let on_submit66 = function (data) {
reset49();
return mutate64(({ "object": ({ "comment": get(data, "test"), "user": get(user45, "id") }) }));
};
useAddInputListener(input_ref65, handleSubmit48(on_submit66));
return <Box component="form" onSubmit={handleSubmit48(on_submit66)}><TextField inputRef={function (e) {
input_ref65["current"] = e;
return ref52(e);
}} multiline={true} rows={4} label="Comment" variant="outlined" sx={({ "mb": 2 })} {...registerProps51}></TextField> <Button type="submit">Send</Button></Box>;
}
;

export { active_mutations, get_comments_key, mutation_on_settled, useCommentsStream, Comments, useAddInputListener, AddComment }
