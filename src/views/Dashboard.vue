<template>
    <div class="fixed top-0 w-100 h2 shadow-1 tc flex justify-between bg-white">
        <div class="w-100">
            <router-link :to="'/create'">
                <button class="mt1 bg-blue bn white br2 ">Add note</button>
            </router-link>
        </div>
        <div class="w-100 mt1 b f3">
            All notes
        </div>
        <div class="w-100">
            <button @click="logout" class="mt1 bg-red bn white br2 ">Logout</button>
        </div>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-center h-100 w-100">
        <div
            @click="options(item)"
            class="w5 shadow-2 bg-light-yellow dark-gray pa2 ma2 note-card"
            v-for="item in items">
            <div class="b w-100">
                {{ item.title }}
            </div>
            <br>
            <div class="w-100">
                {{ item.body }}
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';

import * as Yup from 'yup';
import { inject } from 'vue'

import axios from 'axios';

export default {
    name: "App",
    components: {
    },
    data () {
        return {
            items: [],
        };
    },
    methods: {
        options (item) {
            let ctx = this;
            this.$swal({
                title: "Options",
                text: "Choose an action for this note:",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Edit',
                denyButtonText: 'Delete',
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    ctx.$router.push({ path: 'edit', query: {id: item.id} })
                } else if (result.isDenied) {
                    ctx.deleteNote(item);
                }
            })
        },
        deleteNote (item) {
            let ctx = this;
            axios.post(
                '/notes/destroy',
                { id: item.id },
                {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.access_token,
                    }
                }
            ).then(function (response) {
                ctx.$swal('Success', 'The note has been deleted', 'success')
                ctx.loadNotes();
            }).catch(function (error) {
                ctx.$swal('Error', 'There has been an error trying to delete the note.', 'error')
            });
        },
        logout () {
            let ctx = this;
            axios.post('/logout', {}, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.access_token,
                }
            }).then(function (response) {
                ctx.$router.push({ path: '/' })
            }).catch(function (error) {
                ctx.$router.push({ path: '/' })
            });
        },
        loadNotes () {
            let ctx = this;
            axios.get('/notes/index', {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.access_token,
                }
            }).then(function (response) {
                try {
                    ctx.items = response.data.data;
                } catch (e) {
                    console.error(e);
                }
            }).catch(function (error) {
                ctx.$swal('Error', 'There has been an error trying to recover saved notes.', 'error')
            });
        }
    },
    created () {
        this.loadNotes();
    }
};

</script>

<style>

.note-card{
    word-break: break-all;
}

</style>
