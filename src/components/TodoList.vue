<template>
    <body>
        <h1>todo-list</h1>
        <form id="form">
        <input @keydown.enter.prevent="add(submit)" type="text" class="input" id="input" v-model="submit" placeholder="Enter your todo" autocomplete="off">
            <ul class="todos" id="todos">
                <li @click="finish(todo)" @contextmenu.prevent="deleteTodo(todo)" v-for="todo in todos" :key="todo" :id="todo.id" :class="todo.done? 'completed' : ''" >{{ todo.content }}</li>
            </ul>
        </form>
        <small>왼쪽 클릭: 항목 완료 <br> 오른쪽 클릭: 해당 항목 삭제</small>        
    </body>
</template>
<script>
    export default {
    data() {
        return {
            submit : null,
            todos : [ ],
        }
    },
    methods : {
        add(submit){
            this.axios
            .post('/api/todos/', {
                content: submit, 
                done : false
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.submit = "";
            this.list();
        },
        finish(todo){
            this.axios
            .put(`/api/todos/` + todo.id);
            this.list();
        },
        deleteTodo(todo){
            this.axios
            .delete(`/api/todos/` + todo.id);
            this.list();
        },
        list(){
            this.axios        
            .get(`/api/todos/`)
            .then((res) => {
                console.log(res.data);
                this.todos = res.data;
            })        
            .catch((res) => {          
                console.error(res);        
            });
        }
    },
    mounted() {
        this.list()
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');
* {
    box-sizing: border-box;
}

body {
    background-color: #f5f5f5;
    color: #444;
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

h1 {
    color: black;
    font-size: 5rem;
    text-align: center;
}

form {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    width: 400px;
}

.input {
    border: none;
    color: #444;
    font-size: 2rem;
    padding: 1rem 2rem;
    display: block;
    width: 100%;
}

.input::placeholder {
    color: grey;
}

.input:focus {
    outline-color: skyblue;
}

.todos {
    background-color: #fff;
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: left;
}

.todos li {
    border-top: 1px solid #e5e5e5;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 1rem 2rem;
}

.todos li.completed {
    color: #b6b6b6;
    text-decoration: line-through;
}

small {
    color: #b5b5b5;
    margin-top: 3rem;
    text-align: center;
}
</style>