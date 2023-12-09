<template>
    <div class="about">
        <div class="info">
            <div class="about-us">
                <!-- Button Go Back to the right -->
                <div class="d-flex justify-content-end">
                    <button class="btn" @click="$router.push('/');">
                        <!-- <p class="text-white d-inline me-3">Go Back</p> -->
                        <img src="../assets/icons/ic_home.png" alt="back" style="width: 23px; height: 23px;">
                    </button>
                </div>
                <div class="content">
                    <div class="description">
                        <h1 class="text-center mb-3">About Us</h1>
                        <p>Welcome to our website! We are a team of passionate individuals dedicated to bringing you the
                            best
                            podcasts
                            on the web.</p>
                        <p>Our mission is to provide a platform where podcasters can share their stories, ideas, and
                            expertise
                            with the
                            world. Whether you're a podcast enthusiast or a content creator, we hope you find our website
                            informative,
                            entertaining, and inspiring.</p>
                    </div>
                    <div class="images-and-text mt-5">
                        <h4 style="color: rgb(85, 50, 255); text-shadow: 0px 0px 1px rgb(147, 64, 255);">More about</h4>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <img src="../assets/redpanda.jpg" alt="about-us" class="img-fluid"
                                    style="width: 100%; max-height: 300px;">
                            </div>
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">What is GoPodcast?</h5>
                                <p>Our website is a place where you can find podcasts on any topic imaginable. We have
                                    podcasts
                                    about
                                    sports, politics, business, and more! You can also listen to your favorite podcasters
                                    talk
                                    about
                                    their lives or share their thoughts on current events.</p>

                                <!-- BUtton to Explore -->
                                <button class="btn mt-3" @click="$router.push('/');">Explore Home</button>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">Who are we?</h5>
                                <p>Lorem ipsum dolor sit ame consectetur adipi sicing elit. Quisquam, voluptatem. Lorem
                                    ipsum
                                    dolor sit
                                    amet consectetur adipisicing elit. Quisquam, voluptatem. Lorem ipsum dolor sit amet
                                    consectetur
                                    adipisicing elit. Quisquam, voluptatem. </p>
                                <button class="btn mt-3" @click="$router.push('/');">See Podcast</button>
                            </div>
                            <div class="col-md-6">
                                <img src="../assets/redpanda.jpg" alt="about-us" class="img-fluid"
                                    style="width: 100%; max-height: 300px;">
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-md-6">
                                <img src="../assets/redpanda.jpg" alt="about-us" class="img-fluid"
                                    style="width: 100%; max-height: 300px;">
                            </div>
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">Publish your episodes!</h5>
                                <p>Lorem ipsum dolor sit ame consectetur adipi sicing elit. Quisquam, voluptatem. Lorem
                                    ipsum
                                    dolor sit
                                    amet consectetur adipisicing elit. Quisquam, voluptatem. Lorem ipsum dolor sit amet
                                    consectetur
                                    adipisicing elit. Quisquam, voluptatem.</p>

                                <!-- BUtton to Explore -->
                                <button class="btn mt-3" @click="$router.push('/');">Publish Episode</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutUs',
}
</script>

<style scoped>
.content {
    height: 100%;
    color: white;
    font-size: 1rem;
    letter-spacing: 0.04rem;
    text-align: justify;
    padding: 40px;
}

.images-and-text {
    font-size: 0.9rem;
}

.images-and-text img {
    border-radius: 5px;
    box-shadow: 0px 0px 7px rgb(255, 255, 255);
}

.images-and-text .btn {
    background-color: rgb(43, 0, 255);
    color: white;
    border-radius: 50px;
    padding: 9px 19px;
    border: none;
    font-size: 0.9rem;
}

.images-and-text .btn:hover {
    background-color: rgb(10, 0, 61);
    color: white;
    border-radius: 50px;
    padding: 9px 19px;
    border: none;
    font-size: 0.9rem;
    text-shadow: 0px 0px 4px white;
    transition: all 0.35s ease-in-out;
}

.info {
    background-color: rgba(0, 0, 0, 0.82);
}

.about-us {
    margin: 0 auto;
    padding: 20px;
    height: 100%;
    max-width: 1100px;
}</style>
