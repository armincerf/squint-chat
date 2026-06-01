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
let query_client6 = useQueryClient();
let on_message7 = function (p__8) {
let map__910 = p__8;
let data11 = get(map__910, "data");
let temp__25016__auto__12 = get(data11, "comments_stream");
if (temp__25016__auto__12) {
let new_comments13 = temp__25016__auto__12;
query_client6.setQueryData(get_comments_key, function (old_comments) {
let current14 = get(old_comments, "comments");
let new15 = filter(function (comment) {
return !some(function (_PERCENT_1) {
return (get(_PERCENT_1, "id") === get(comment, "id"));
}, current14);
}, new_comments13);
return ({ "comments": into(current14, new15) });
});
return query_client6.invalidateQueries(get_comments_key);}
};
let now_string16 = new Date().toISOString();
return useSubscription(({ "operation": str("subscription comments {", "comments_stream(batch_size: 5, cursor: {initial_value: {createdAt: \"", now_string16, "\"}}) { id comment createdAt user } } "), "onMessage": on_message7, "onError": function (error) {
return console.log("error: ", error);
}, "onComplete": function () {
return console.log("complete");
} }));
}
;
var Comments = function () {
let map__1720 = useGetCommentsQuery();
let data21 = get(map__1720, "data");
let isLoading22 = get(map__1720, "isLoading");
let queryClient23 = useQueryClient();
let map__1824 = useUser();
let user25 = get(map__1824, "user");
let map__1926 = useDeleteCommentByIdMutation(merge(({ "onMutate": function (p__27) {
let map__2829 = p__27;
let id30 = get(map__2829, "id");
queryClient23.cancelQueries(get_comments_key);
let previous_data31 = queryClient23.getQueryData(get_comments_key);
queryClient23.setQueryData(get_comments_key, function (p__32) {
let map__3334 = p__32;
let comments35 = get(map__3334, "comments");
return ({ "comments": remove(function (comment) {
return (id30 === get(comment, "id"));
}, comments35) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data31 });
}, "onError": function (_err, _new, context) {
return queryClient23.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient23)));
let mutate36 = get(map__1926, "mutate");
let comments37 = get(data21, "comments");
let timestamp_formatted38 = function (timestamp) {
if (timestamp) {
let date39 = new Date(timestamp);
return date39.toLocaleString("en-US", ({ "month": "short", "day": "numeric", "hour": "numeric", "minute": "numeric" }));}
};
useCommentsStream();
return <div><h2>Chat room</h2> <div>{(isLoading22) ? (<h1>Loading</h1>) : (map(function (comment) {
return <div key={JSON.stringify(comment)}>{((get(comment, "user") === get(user25, "id"))) ? (<Button onClick={function () {
return mutate36(({ "id": get(comment, "id") }));
}}>Delete</Button>) : (null)} <p>{get(comment, "comment")}</p> <p>{timestamp_formatted38(get(comment, "createdAt"))}</p> <p>by - {get(comment, "user")}</p></div>;
}, comments37))}</div></div>;
}
;
var useAddInputListener = function (input_ref, on_submit) {
return react_useEffect(function () {
if (input_ref) {
let input40 = get(input_ref, "current");
let submit_on_enter41 = function (e) {
if (!get(e, "shiftKey") && (get(e, "which") === 13)) {
e.preventDefault();
return on_submit();}
};
if (input40) {
input40.addEventListener("keydown", submit_on_enter41);
return function () {
return input40.removeEventListener("keydown", submit_on_enter41);
};}}
}, [input_ref, on_submit]);
}
;
var AddComment = function () {
let map__4246 = useUser();
let user47 = get(map__4246, "user");
let map__4348 = useForm();
let register49 = get(map__4348, "register");
let handleSubmit50 = get(map__4348, "handleSubmit");
let reset51 = get(map__4348, "reset");
let map__4452 = register49("test");
let registerProps53 = map__4452;
let ref54 = get(map__4452, "ref");
let queryClient55 = useQueryClient();
let map__4556 = useAddCommentMutation(merge(({ "onMutate": function (p__57) {
let map__5859 = p__57;
let object60 = get(map__5859, "object");
queryClient55.cancelQueries(get_comments_key);
let previous_data61 = queryClient55.getQueryData(get_comments_key);
queryClient55.setQueryData(get_comments_key, function (p__62) {
let map__6364 = p__62;
let comments65 = get(map__6364, "comments");
return ({ "comments": conj(comments65, assoc(object60, "createdAt", new Date().toISOString())) });
});
swap_BANG_(active_mutations, inc);
return ({ "previous-data": previous_data61 });
}, "onError": function (_err, _new, context) {
return queryClient55.setQueryData(get_comments_key, get(context, "previous-data"));
} }), mutation_on_settled(queryClient55)));
let mutate66 = get(map__4556, "mutate");
let input_ref67 = react_useRef(null);
let on_submit68 = function (data) {
reset51();
return mutate66(({ "object": ({ "comment": get(data, "test"), "user": get(user47, "id") }) }));
};
useAddInputListener(input_ref67, handleSubmit50(on_submit68));
return <Box component="form" onSubmit={handleSubmit50(on_submit68)}><TextField inputRef={function (e) {
input_ref67["current"] = e;
return ref54(e);
}} multiline={true} rows={4} label="Comment" variant="outlined" sx={({ "mb": 2 })} {...registerProps53}></TextField> <Button type="submit">Send</Button></Box>;
}
;

export { active_mutations, get_comments_key, mutation_on_settled, useCommentsStream, Comments, useAddInputListener, AddComment }
