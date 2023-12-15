<template>
    <div class="users-container m-0 p-0">
        <div class="users overflow-x-auto flex-nowrap overflow-x-hidden" ref="usersContainer">
            <div v-for="user in userList" :key="user.id" class="user">
                <a :href="'/profile/' + user.id">
                    <img v-if="user.image_url !== undefined && user.image_url !== null && `${user.image_url}` !== 'data:image/jpeg;base64,'" :src="user.image_url" alt="profile" class="profile-img rounded-circle" style="width: 180px; height: 180px;"/>
                    <img v-else src="https://api.iconify.design/iconamoon/profile-fill.svg" alt="profile" class="profile-img rounded-circle grayscale-img" style="width: 180px; height: 180px;"/>
                </a>
                <span class="name">{{ user.username }}</span>
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';

// import axios from 'axios'

export default {
    props: {
        userList: {
            type: Array,
            default: []
        }
    },
    mounted() {
        const usersContainer = this.$refs.usersContainer;
        usersContainer.addEventListener('wheel', (e) => {
            if (e.deltaX !== 0) {
                usersContainer.scrollLeft += e.deltaX;
                e.preventDefault();
            }
        });
    },
};
</script>
    
<style>
.users {
    display: flex;
    align-items: center;
    padding-top: 25px;
    padding-bottom: 20px;
    /* width: 80vw; */
}

.grayscale-img {
    color: grey;
}

.users-container {
    margin-top: 50px;
    height: 300px;
}

.user {
    display: flex;
    flex-direction: column;
    /* align-items: center;
      justify-content: center; */
    margin-left: 45px;
    text-align: center;
}

.user img {
    width: 210px;
    height: 210px;
    border-radius: 5%;
    margin-bottom: 10px;
}

.user .title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}

.user:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
}

.user:hover img {
    box-shadow: 0 0 15px rgba(0, 72, 255, 0.784);
}
</style>
    