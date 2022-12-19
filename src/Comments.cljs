(ns Comments
  (:require
   ["react" :as react]
   ["react-hook-form" :refer [useForm]]
   ["./utils/hooks" :refer [useSubscription]]
   ["@tanstack/react-query" :refer [useQueryClient]]
   ["@mui/material/TextField$default" :as TextField]
   ["@mui/material/Button$default" :as Button]
   ["@clerk/clerk-react" :refer [useUser]]
   ["@mui/material/Box$default" :as Box]
   ["./generated/graphql" :refer [useGetCommentsQuery useAddCommentMutation useDeleteCommentByIdMutation]]))

(defonce active-mutations (atom 0))

(def get-comments-key (.getKey useGetCommentsQuery))

(defn mutation-on-settled
  [query-client]
  {:onSettled (fn []
                (swap! active-mutations dec)
                (when (zero? @active-mutations)
                  (.invalidateQueries query-client get-comments-key)))})

(defn useCommentsStream
  []
  (let [query-client (useQueryClient)
        on-message (fn [{:keys [data]}]
                     (when-let [new-comments (:comments_stream data)]
                       (.setQueryData query-client get-comments-key
                                      (fn [old-comments]
                                        (let [current (:comments old-comments)
                                              new (filter (fn [comment]
                                                            (not (some #(= (:id %) (:id comment)) current)))
                                                          new-comments)]
                                          {:comments (into current new)})))
                       (.invalidateQueries query-client get-comments-key)))
        now-string (.toISOString (js/Date.))]
    (useSubscription {:operation (str "subscription comments { comments_stream(batch_size: 5, cursor: {initial_value: {createdAt: \""
                                      now-string
                                      "\"}}) { id comment createdAt user } } ")
                      :onMessage on-message
                      :onError (fn [error] (js/console.log "error: " error))
                      :onComplete (fn [] (js/console.log "complete"))})))

(defn Comments []
  (let [{:keys [data isLoading]} (useGetCommentsQuery)
        queryClient (useQueryClient)
        {:keys [mutate]} (useDeleteCommentByIdMutation
                          (merge
                           {:onMutate
                            (fn [{:keys [id]}]
                              (.cancelQueries queryClient get-comments-key)
                              (let [previous-data (.getQueryData queryClient get-comments-key)]
                                (.setQueryData queryClient get-comments-key
                                               (fn [{:keys [comments]}]
                                                 {:comments
                                                  (remove (fn [comment]
                                                            (= id (:id comment)))
                                                          comments)}))
                                (swap! active-mutations inc)
                                {:previous-data previous-data}))

                            :onError
                            (fn [_err _new context]
                              (.setQueryData queryClient get-comments-key (:previous-data context)))}
                           (mutation-on-settled queryClient)))
        comments (:comments data)]
    (useCommentsStream)
    #jsx [:div
          [:h1 "What animal says - 'nyan'"]
          [:h2 "Today's guesses"]
          [:div
           (if isLoading
             #jsx [:h1 "Loading"]
             (map (fn [comment]
                    #jsx [:div
                          {:key (js/JSON.stringify comment)}
                          [Button {:onClick (fn [] (mutate {:id (:id comment)}))} "Delete"]
                          [:p (:comment comment)]
                          [:p (:createdAt comment)]
                          [:p "by -" (:user comment)]]) comments))]]))

(defn useAddInputListener
  "Add a listener to call on-submit when the enter key is pressed and the shift key is not"
  [input-ref on-submit]
  (react/useEffect
   (fn []
     (when input-ref
       (let [input (:current input-ref)
             submit-on-enter (fn [e]
                               (when (and (not (:shiftKey e))
                                          (= (:which e) 13))
                                 (.preventDefault e)
                                 (on-submit)))]
         (when input
           (.addEventListener input "keydown"
                              submit-on-enter)

           (fn []
             (.removeEventListener input "keydown"
                                   submit-on-enter))))))
   [input-ref on-submit]))

(defn AddComment []
  (let [{:keys [user]} (useUser)
        {:keys [register handleSubmit reset]} (useForm)
        {:keys [ref onChange onBlur name]} (register "test")
        queryClient (useQueryClient)
        {:keys [mutate]} (useAddCommentMutation
                          (merge
                           {:onMutate
                            (fn [{:keys [object]}]
                              (.cancelQueries queryClient get-comments-key)
                              (let [previous-data (.getQueryData queryClient get-comments-key)]
                                (.setQueryData queryClient get-comments-key
                                               (fn [{:keys [comments]}]
                                                 {:comments
                                                  (conj comments object)}))
                                (swap! active-mutations inc)
                                {:previous-data previous-data}))
                            :onError
                            (fn [_err _new context]
                              (.setQueryData queryClient get-comments-key (:previous-data context)))}
                           (mutation-on-settled queryClient)))
        input-ref (react/useRef nil)

        on-submit (fn [data]
                    (reset)
                    (mutate {:object {:comment (:test data)
                                      :user (:id user)}}))
        _ (useAddInputListener input-ref (handleSubmit on-submit))]
    #jsx [Box {:component "form"
               :onSubmit (handleSubmit on-submit)}
          [:p @active-mutations]
          ;; can't use a var as props yet...
          [TextField {:inputRef (fn [e]
                                  (set! (.-current input-ref) e)
                                  (ref e))
                      :onChange onChange
                      :onBlur onBlur
                      :multiline true
                      :rows 4
                      :name name
                      :label "Comment"
                      :variant "outlined"
                      :sx {:mb 2}}]
          [Button {:type "submit"} "Guess the animal"]]))
