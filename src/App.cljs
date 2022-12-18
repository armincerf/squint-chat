(ns App
  (:require ["./App.css$default" :as styles]
            ["react" :as react]
            ["./generated/graphql" :refer [usePixelGridsQuery]]
            ["./Comments" :refer [Comments AddComment]]
            ["@mui/Material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@clerk/clerk-react" :refer [useUser]]))

(defn App []
  (let [{:keys [user]} (useUser)]
    #jsx [:div {:className styles.App}
          [Box {:sx {:display "flex"
                     :flexDirection "column"
                     :alignItems "center"
                     :justifyContent "center"
                     :height "20vh"}}
           [:h1 "Hello, " (:firstName user)]
           [Avatar
            {:alt (:firstName user)
             :src (:profileImageUrl user)
             :style {:width "100px"
                     :height "100px"}}]]
          [Comments]
          [AddComment]]))
