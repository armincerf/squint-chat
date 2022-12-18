(ns Comments
  (:require
   ["react" :as react]
   ["react-hook-form" :refer [useForm]]
   ["@tanstack/react-query" :refer [useQueryClient]]
   ["@mui/material/TextField$default" :as TextField]
   ["@mui/material/Button$default" :as Button]
   ["@clerk/clerk-react" :refer [useUser]]
   ["@mui/Material/Box$default" :as Box]
   ["./generated/graphql" :refer [useGetCommentsQuery useAddCommentMutation useDeleteCommentByIdMutation]]))

;; hack until booleans work properly 
(def t (= 1 1))

(defn mutation-on-success
  [query-client]
  {:onSuccess (fn [] (.invalidateQueries query-client "getComments"))})

(defn Comments []
  (let [queryResponse (useGetCommentsQuery)
        queryClient (useQueryClient)
        {:keys [mutate]} (useDeleteCommentByIdMutation (mutation-on-success queryClient))
        comments (:comments (:data queryResponse))]
    #jsx [:div
          [:h1 "Comments"]
          [:div
           (map (fn [comment]
                  #jsx [:div
                        {:key (:id comment)}
                        [Button {:onClick (fn [] (mutate {:id (:id comment)}))} "Delete"]
                        [:p (:comment comment)]
                        [:p "by -" (:user comment)]]) comments)]]))

(defn AddComment []
  (let [{:keys [user]} (useUser)
        {:keys [register handleSubmit]} (useForm)
        {:keys [ref onChange onBlur name] :as props} (register "test")
        queryClient (useQueryClient)
        {:keys [mutate]} (useAddCommentMutation (mutation-on-success queryClient))

        on-submit (fn [data]
                    (js/console.log "data" data (register "test"))
                    (mutate {:object {:comment (:test data)
                                      :user (:id user)}}))]
    #jsx [Box {:component "form"
               :onSubmit (handleSubmit on-submit)}
          ;; can't use a var as props yet...
          [TextField {:inputRef ref
                      :onChange onChange
                      :onBlur onBlur
                      :multiline t
                      :rows 4
                      :name name
                      :label "Comment"
                      :variant "outlined"
                      :sx {:mb 2}}]
          [Button {:type "submit"} "Add Comment"]]))
