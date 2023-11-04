<template>
    <div class="login">
        <div class="container pt-5 w-50">
            <div class="logo d-flex justify-content-center">
                <router-link to="/" class="d-flex align-items-center" style="text-decoration: none; align-items:normal;">
                    <img src="../assets/logo_white.png" alt="logo" :style="{width: '25px', height: '25px'}">
                    <h5 class="ms-2 fw-lighter text-white" style="font-size: 1.3rem;">GoPodcast</h5>
                </router-link>
            </div>
            <h5 id="slogan" class="text-center mt-5 f-italic" style="font-size: 1.8rem;">Podcasts, Play, Repeat!</h5>
            <p class="text-center mt-5" :style="{fontSize: '1.2rem'}">Log in to listen to your favorite podcasts</p>
        
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <form @submit.prevent="submitForm" class="login-form col-xl-7 mx-auto mt-4">
                    <div class="form-group left mb-2">
                        <label for="email">Email address</label>
                        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                    </div>
                    <div class="form-group left mb-2">
                        <label for="password">Password</label>
                        <div class="password-input">
                            <input :type="showPassword ? 'text' : 'password'" v-model="password" class="form-control" id="password" placeholder="Password" @keyup.enter="onSubmit" required>
                            <span class="password-toggle" @click="passwordVisibility">
                                <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" id="togglePasswordIcon" style="color: #bbb;"></i>
                            </span>
                        </div>
                    </div>
                </form>
                <div class="justify-content-center d-flex mt-3">
                    <button type="button" class="btn-submit btn btn-dark mt-3" @click="onSubmit" :disabled="loading">Log In</button>
                </div>
            </div>

            <div class="d-flex justify-content-center mt-4">
                <p class="text-center">You do not have an account? <router-link to="/register">Sing up</router-link></p>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            showPassword: false,
            logged: false,
            loading: false
        }
    },
    methods: {
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        },
        onSubmit() {
            if (this.loading){
                return;
            }
            
            this.loading = true;
            const parameters = {
                email: this.email,
                password: this.password
            }

            const axiosConfig = {
                withCredentials: true
            }

            const path = 'http://localhost:5000/login' // Descomentar y modificar por el endpoint correcto
            axios.post(path, parameters, axiosConfig)
            .then((res) => {
                this.logged = true
                this.backToHome()
            })
            .catch((error) => {
                console.error(error)
                alert('Username or Password incorrect')
            })
            .finally(() => {
                this.loading = false; 
            });
        },
        backToHome() {
            this.$router.push('/')
        }
    }
}

</script>

<style>
.btn-submit{
  padding: 0.6rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  background-color: var(--submit-color);
  cursor: pointer;
}

.btn-submit:hover{
  border: 0.5px solid var(--submit-color);
  background-color: #262c91;
  transition: 0.3s;
}
</style>