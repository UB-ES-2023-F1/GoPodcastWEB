<template>
    <div class="categories">
        <h2>Browse Categories</h2>
        <div v-for="category in categories" :key="category.id" class="category">
            <img :src="'src/assets/'+category.image_url" :alt="category.title">
            <span class="name">{{ category.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories : [
                { id: 1, image_url: 'categories/category1.jpg', title: 'Pop' },
                { id: 2, image_url: 'categories/category2.jpg', title: 'Rock' },
                { id: 3, image_url: 'categories/category3.jpg', title: 'Hip Hop' },
                { id: 4, image_url: 'categories/category4.jpg', title: 'Electronic' },
                { id: 5, image_url: 'categories/category5.jpg', title: 'Classical' },
            ],
        };
    },
};
</script>

<style>
.categories {
    margin-top: 50px;
}

.category {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.category img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}

.category .name {
    font-size: 18px;
    font-weight: 600;
}
</style>
