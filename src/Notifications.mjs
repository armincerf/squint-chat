import { str, get } from 'squint-cljs/core.js'
var request_notification_permission = async function () {
let permission67 = (await Notification.requestPermission());
if ((permission67 === "granted")) {
return console.log("Notification permission granted.");}
}
;
var show_notification = (function () {
 let f68 = function (var_args) {
let G__7172 = arguments["length"];
switch (G__7172) {case 2:
return f68.cljs$core$IFn$_invoke$arity$2((arguments[0]), (arguments[1]));
break;
case 3:
return f68.cljs$core$IFn$_invoke$arity$3((arguments[0]), (arguments[1]), (arguments[2]));
break;
default:
throw new Error(str("Invalid arity: ", alength(arguments)))}
};
f68["cljs$core$IFn$_invoke$arity$2"] = function (title, body) {
return show_notification(title, body, null);
};
f68["cljs$core$IFn$_invoke$arity$3"] = function (title, body, p__74) {
let map__7576 = p__74;
let icon77 = get(map__7576, "icon");
let tag78 = get(map__7576, "tag");
let notification79 = new Notification(title, ({ "body": body, "icon": icon77, "tag": tag78 }));
return console.log("Notification shown.");
};
f68["cljs$lang$maxFixedArity"] = 3;
return f68;
})()
;

export { request_notification_permission, show_notification }
