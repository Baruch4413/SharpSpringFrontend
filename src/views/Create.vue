<template>
    <div class="fixed top-0 w-100 h2 shadow-1 tc flex justify-between">
        <div class="w-100">
        </div>
        <div class="w-100 mt1 b f3">
            Create note
        </div>
        <div class="w-100">
            <router-link :to="'/dashboard'">
                <button class="mt1 bg-red bn white br2 ">Back</button>
            </router-link>
        </div>
    </div>
    <div class="flex flex-column justify-center items-center h-100 w-100">

        <Form class="flex flex-column w-30-l w-80-m w-100-s" @submit="onSubmit">

            <label class="b mt3" for="email">Title</label>
            <Field
                :rules="titleRules"
                class="pa2 br3 ba bw1 b--light-purple mv2"
                id="note_title"
                name="note_title"
                v-model="note_title"
                type="text" />
            <ErrorMessage class="red" name="note_title" />

            <label class="b mt3" for="body">Body</label>
            <textarea
                class="pa2 br3 ba bw1 b--light-purple mv2"
                id="body"
                name="note_body"
                v-model="note_body"></textarea>
            <ErrorMessage class="red" name="note_body" />

            <button class="mt3 bg-blue bn white br2 pa2">Submit</button>

        </Form>

    </div>
</template>

<script>

import { Field, Form, ErrorMessage } from 'vee-validate';

import * as Yup from 'yup';
import { inject } from 'vue'

import axios from 'axios';

export default {
    name: 'App',
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data () {
        return {
            note_title: '',
            note_body: '',
            titleRules: Yup.string().required().label("Title"),
        };
    },
    methods: {
        onSubmit () {
            let ctx = this;
            axios.post(
                '/notes/store',
                {
                    'title': this.note_title,
                    'body': this.note_body,
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + ctx.$store.state.access_token
                    }
                }
            ).then(function (response) {
                try {
                    ctx.$router.push({ path: '/dashboard' })
                } catch (e) {
                    console.error(e);
                }
            }).catch(function (error) {
                ctx.$swal('Error', 'There has been an error creating the note', 'error')
            });
        }
    },
};

</script>
