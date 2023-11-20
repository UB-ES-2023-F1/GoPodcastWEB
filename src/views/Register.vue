<template>
    <div class="register">
        <div class="container pt-5 w-50">
            <div class="logo d-flex justify-content-center">
                <router-link to="/" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                    <img src="../assets/logo_white.png" alt="logo" :style="{ width: '25px', height: '25px' }">
                    <h5 class="ms-2 fw-lighter text-white" style="font-size: 1.3rem;">GoPodcast</h5>
                </router-link>
            </div>
            <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Play, Enjoy, Repeat!</h5>
            <p class="text-center mt-5" :style="{ fontSize: '1.2rem' }">Sign up to listen to your favorite podcasts
            </p>
            <form @submit.prevent="onSubmit()" class="register-form col-xl-7 mx-auto mt-4">
                <div class="form-group mb-2">
                    <label for="username">Username</label>
                    <input type="username" class="form-control" id="username" aria-describedby="usernameHelp"
                        placeholder="Enter username" v-model="username" required>
                </div>
                <div class="form-group left mb-2">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        placeholder="Enter email" v-model="email" required>
                </div>
                <div class="form-group mb-2">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" v-model="password"
                        required>
                    <small id="pswHelp" class="opacity-50" v-if="this.password">
                        Password must be at least 6 characters long, contain at least 1 big letter, 1 small letter and 1
                        number</small>
                </div>
                <div class="form-group mb-2">
                    <label for="confirmPassword">Confirm password</label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm password"
                        v-model="confirmPassword" required>
                </div>
                <div class="justify-content-center d-flex mt-3">
                    <button type="submit" class="btn-submit btn btn-dark mt-3">Sign Up</button>
                </div>
            </form>
            <div class="d-flex justify-content-center mt-4">
                <p class="text-center">Already have an account? <router-link to="/login">Log in</router-link></p>
            </div>
        </div>
    </div>
</template>

<style></style>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            username: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    },
    methods: {
        validatePassword() {
            // The password must be at least 6 characters long
            if (this.password.length < 6) {
                alert('Password must be at least 6 characters long')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            // The fields must not be empty
            else if (this.password === '' || this.confirmPassword === '') {
                alert('Fields must not be empty')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            // The password must have at least 1 big letter
            else if (!/[A-Z]/.test(this.password)) {
                alert('Password must have at least 1 big letter')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            // The password must have at least 1 small letter
            else if (!/[a-z]/.test(this.password)) {
                alert('Password must have at least 1 small letter')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            // The password must have at least 1 number
            else if (!/[0-9]/.test(this.password)) {
                alert('Password must have at least 1 number')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            // Both password and confirm password must be the same
            else if (this.password !== this.confirmPassword) {
                alert('Passwords do not match')
                document.getElementById('password').style.borderColor = 'red'
                document.getElementById('confirmPassword').style.borderColor = 'red'
                return false
            }
            else {
                document.getElementById('password').style.borderColor = 'green'
                document.getElementById('confirmPassword').style.borderColor = 'green'
            }
            return true
        },
        validateEmail() {
            // The email must not be empty
            if (this.email === '') {
                alert('Email must not be empty')
                document.getElementById('email').style.borderColor = 'red'
                return false
            }
            // The email must have email format
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                alert('Incorrect format')
                document.getElementById('email').style.borderColor = 'red'
                return false
            }
            else {
                document.getElementById('email').style.borderColor = 'green'
            }
            return true
        },
        onSubmit() {
            if (this.validatePassword() && this.validateEmail()) {
                const parameters = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                console.log(parameters)
                const path = 'gopodcastapidev.azurewebsites.net/user' // Descomentar y modificar por el endpoint correcto
                axios.post(path, parameters)
                    .then((res) => {
                        console.log(res)
                        alert('Account created')
                        this.backToLogin()
                    })
                    .catch((error) => {
                        alert('Error creating account')
                        console.error(error)
                    })
            }

        },
        backToLogin() {
            this.$router.push('/login')
        }
    }
}
</script>


