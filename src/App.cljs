(ns App
  (:require ["./App.css$default" :as styles]
            ["react" :as react]
            ["./generated/graphql" :refer [useGetCommentsQuery usePixelGridsQuery]]
            ["@mui/Material/Box$default" :as Box]
            ["@mui/material/Button$default" :as Button]
            ["@mui/material/Avatar$default" :as Avatar]
            ["@clerk/clerk-react" :refer [useUser]]
            [squint.string :as str]))

(defn Counter [{:keys [init]}]
  (let [[counter setCount] (react/useState init)]
    #jsx [:div
          "Count:" (str/join " " (range counter))
          [:div
           [Button
            {:onClick (fn []
                        (setCount (inc counter)))}
            "Click me"]]]))

(defn Comments []
  (let [queryResponse (useGetCommentsQuery)
        comments (:comments (:data queryResponse))]
    #jsx [:div
          [:h1 "Comments"]
          [:div
           (map (fn [comment]
                  #jsx [:div
                        {:key (:id comment)}
                        [:p (:comment comment)]
                        [:p "by -" (:user comment)]]) comments)]]))

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
  (let [[count setCount] (react/useState 0)
        {:keys [user]} (useUser)]
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
                     :height "100px"}
             :onClick (fn []
                        (setCount (inc count)))}]]
          [Comments]
          [RenderGrid]
          [Button {:onClick (fn [] (setCount (inc count)))}
           "count is"  count]]))

(def default App)

