<template>
    <div class="register">
        <h1>Sign Up</h1>
        <button class="btn btn-success" @click="">Bootstrap test</button>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" required>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        submitForm() {
            if (this.password !== this.confirmPassword) {
                alert('Passwords do not match')
                return
            }
        }
    }
}
</script>

<style>
</style>
