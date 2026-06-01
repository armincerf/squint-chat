(ns Notifications)

(defn ^:async request-notification-permission []
  (let [permission (js/await (js/Notification.requestPermission))]
    (when (= permission "granted")
      (js/console.log "Notification permission granted."))))

(defn show-notification
  ([title body] (show-notification title body nil))
  ([title body {:keys [icon tag]}]
   (let [notification (js/Notification. title #js {:body body
                                                   :icon icon
                                                   :tag tag})]
     (js/console.log "Notification shown."))))






