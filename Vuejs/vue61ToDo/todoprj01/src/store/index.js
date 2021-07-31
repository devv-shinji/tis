import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Vuex 인스턴스 만들기
export default new Vuex.Store({
    actions: {
        /* 왜 actions를 사용하나? 비동기로 외부 함수 호출하기 위해서
         * actions 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 mutations로 고정.
         * 두번째인자: 값. store.dispatch()호출시 넘겨지는 값.
         */
        addTodo: function( mutations/* 고정 */, newTodoItem ){
            mutations.commit("addTodo", newTodoItem );
        },
        doneToggle: function( mutations/* 고정 */, id ){
            mutations.commit("doneToggle", id );
        },
        removeTodo: function( mutations/* 고정 */, id, index ){
            mutations.commit("removeTodo", id, index);
        },
        clearAll: function( mutations/* 고정 */){
            mutations.commit("clearAll");
        },
    },
    mutations: {
        /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
         * mutations 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 state 로 고정.
         * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
         * */
        addTodo: function(state/* 고정 */, newTodoItem/* mutations.commit 호출시 넘겨지는 값 */){
            console.log(event.target); // TodoInput 의 Button 정보

            if (newTodoItem && newTodoItem.trim() !== "") {
                // todoItems에서 최대 id 값을 구하는 방법.
                // 방법1. todoItems.reduce() 를 사용하여 newId를 구하는 방법
                // 방법2. 방법2. todoItems.reduce() 를 사용하여 최대 id 값을 찾기
                // 방법3. todoItems.map()과 Math.max()를 사용하여 max id를 찾는 방법

                // 방법1. todoItems.reduce() 를 사용하여 최대 id 값을 갖고있는 object 를 찾기
                let maxObj = null;
                if (state.todoItems.length > 0) {
                    // this.$data.todoItems.reduce()를 사용하여 최대 id 값을 갖고있는 element 를 찾는다.
                    maxObj = state.todoItems.reduce((prevObj, curtObj) => {
                        if (prevObj.id >= curtObj.id) {
                            return prevObj;
                        } else {
                            return curtObj;
                        }
                    });
                } else {
                    // 빈 배열인 경우
                    maxObj = {
                        id: 0
                    };
                }
                var newid = maxObj.id + 1;

                // 방법2. todoItems.reduce() 를 사용하여 최대 id 값을 찾기
                let maxid = 0;
                if (state.todoItems.length > 0) {
                    maxid = state.todoItems.reduce((maxid, obj) => {
                        return maxid >= obj.id ? maxid : obj.id;
                    });
                } else {
                    // 빈 배열인 경우
                    maxid = 0;
                }
                newid = maxid + 1;

                // 추가할 객체 생성:
                // input에 입력된 값 ==> newTodoItem ;
                var newTodo = {
                    id: newid,
                    todo: newTodoItem,
                    done: false
                };

                // this.$data.todoItems 에 newTodo를 추가하시오.
                // this.$data.todoItems.push(newTodo);
                state.todoItems[state.todoItems.length] = newTodo;
                // this.$set(
                //     this.$data.todoItems,
                //     this.$data.todoItems.length,
                //     newTodo
                // );

                // add 후에 input 태그에 남아있는 입력값 지우기
                newTodoItem = "";
                // this.$set(this.$data, "newTodoItem", "");
            }
        },
        doneToggle(state, id) {
            // debugger;
            // 방법1
            // this.$data.todoItems[index].done = !this.$data.todoItems[index].done ;

            // 방법2
            // this.$set( this.$data.todoItems[index], "done", !this.$data.todoItems[index].done );

            // 방법3
            // 복제 후 재할당 해야함
            const newitems = state.todoItems.map((item) => {
                if (item.id === id) {
                    item.done = !item.done;
                    return item;
                }
                else {
                    return item;
                }
            });

            state.todoItems = newitems;

        },
        removeTodo(state, id, index) {
            console.log(event.target);
            // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
            // 방법1: array.splice() 을 사용하는 방법
            // 방법2: array.map() 을 사용하는 방법
            state.todoItems.splice(index, 1);

            // 이벤트 취소를 이용하여 click 버블링 막기
            // event.stopPropagation();
            // event.preventDefault();
        },
        clearAll(state) {
            console.log(event.target);
            // 전체 삭제
            state.todoItems = [];
        }

    },
    state: {
        /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
        todoItems: [
            { id: 1, todo: "영화///보기", done: false },
            { id: 2, todo: "주말 산책", done: true },
            { id: 3, todo: "ES6 학습", done: false },
            { id: 4, todo: "잠실 야구장", done: false }
        ]
    },
    getters: {
        /* state 변경 정보를 컴포넌트에 전달하는 역활.
         * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
         * 첫번째인자: 무조건 state
         * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
         * 예시) message()=> store.getters.인자;
         */
        todoItems: function(state/* 고정 */){
            return state.todoItems;
        },
    },
});

