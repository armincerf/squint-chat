(ns App
  (:require ["./App.css$default" :as styles]
            ["react" :as react]
            ["./Comments" :refer [Comments AddComment]]
            ["@mui/material/Box$default" :as Box]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@mui/material/Typography$default" :as Typography]
            ["@clerk/clerk-react" :refer [useUser]]))

(defn App []
  (let [{:keys [user]} (useUser)]
    #jsx [Box {:sx {:display "flex"
                    :flexDirection "column"
                    :alignItems "center"
                    :justifyContent "center"}}
          [Box
           {:sx {:display "flex"
                 :flexDirection "row"
                 :gap "1rem"
                 :alignItems "center"
                 :justifyContent "center"
                 :width "100%"}}
           [Typography {:variant "h1"} "Hello, " (:firstName user)]
           [Avatar
            {:alt (:firstName user)
             :src (:profileImageUrl user)
             :style {:width "100px"
                     :height "100px"}}]]
          [Comments]
          [AddComment]]))
