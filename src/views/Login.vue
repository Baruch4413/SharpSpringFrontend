<template>
    <div class="flex flex-column justify-center items-center h-100 w-100">

        <Form class="flex flex-column w-30-l w-80-m w-100-s" @submit="onSubmit">

            <label class="b mt3" for="email">Email</label>
            <Field
                :rules="emailRules"
                class="pa2 br3 ba bw1 b--light-purple mv2"
                id="user_email"
                name="user_email"
                v-model="user_email"
                type="text" />
            <ErrorMessage class="red" name="user_email" />

            <label class="b mt3" for="password">Password</label>
            <Field
                :rules="passwordRules"
                class="pa2 br3 ba bw1 b--light-purple mv2"
                id="password"
                name="user_password"
                v-model="user_password"
                type="password" />
            <ErrorMessage class="red" name="user_password" />

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
            user_email: '',
            user_password: '',
            emailRules: Yup.string().email().required().label("Email Address"),
            passwordRules: Yup.string().min(8).required().label("Your Password"),
        };
    },
    methods: {
        onSubmit () {
            let ctx = this;
            axios.post('/login', {
                'email': this.user_email,
                'password': this.user_password,
            }).then(function (response) {
                try {
                    ctx.$store.commit('setAccessToken', response.data.access_token);
                    ctx.$router.push({ path: '/dashboard' })
                } catch (e) {
                    console.error(e);
                }
            }).catch(function (error) {
                ctx.$swal('Error', 'Login error, please check your credentials', 'error')
            });
        }
    },
};

</script>
