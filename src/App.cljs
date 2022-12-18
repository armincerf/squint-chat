(ns App
  (:require ["./App.css$default" :as styles]
            ["react" :as react]
            ["./generated/graphql" :refer [usePixelGridsQuery]]
            ["./Comments" :refer [Comments AddComment]]
            ["@mui/Material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@clerk/clerk-react" :refer [useUser]]))

(defn RenderGrid
  []
  (let [pixels-query (usePixelGridsQuery)
        pixels (:pixelString (first (:pixelGrids (:data pixels-query))))
        pixel-vector (and pixels (js/JSON.parse pixels))]
    #jsx [Box
          {:style {:width "10px"
                   :display "grid"
                   :gridTemplateColumns "repeat(3, 1fr)"
                   :gridTemplateRows "repeat(3, 1fr)"}}
          (map (fn [row]
                 #jsx [:div
                       {:key (rand-int 1000000)}
                       (map (fn [pixel]
                              #jsx [:div
                                    {:key (rand-int 1000000)
                                     :style {:width "10px"
                                             :height "10px"
                                             :backgroundColor (if (= pixel 0)
                                                                "yellow"
                                                                "red")}}
                                    ""]) row)]) pixel-vector)]))

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
          [AddComment]
          [RenderGrid]]))

(def default App)

