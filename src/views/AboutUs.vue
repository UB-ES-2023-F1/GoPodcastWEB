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
                        <h1 class="text-center mb-3">Sobre GoPodcast</h1>
                        <p>Gopodcast nace del anhelo de cinco informáticos de hacer de este mundo un lugar mejor: un lugar en el que el conocimiento circule libremente a través del podcasting. Descubre con nosotros una comunidad de oyentes y locutores que toca todo tipo de temas: desde la ciencia hasta el arte, desde el entretenimiento hasta la salud y el fitness, desde la historia hasta la actualidad...</p>
                        <p >Nuestro objetivo: <span style="text-decoration: underline;">convertirnos en la Wikipedia de los podcasts.</span></p>
                    </div>
                    <div class="images-and-text mt-5">
                        <h4 style="color: rgb(85, 50, 255); text-shadow: 0px 0px 1px rgb(147, 64, 255);">
                            Estos son nuestros valores</h4>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <img src="../assets/redpanda.jpg" alt="about-us" class="img-fluid"
                                    style="width: 100%; max-height: 300px;">
                            </div>
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">Contenido</h5>
                                <p>Nuestra plataforma permite a cualquier usuario compartir sus experiencias y conocimiento. Todos somos oyentes y creadores, sin distinción alguna. Creemos en la riqueza de la diversidad de temas y en la libertad de expresión para que podamos tratar cualquier tema, ¡sin tabúes!</p>

                                <!-- BUtton to Explore -->
                                <button class="btn mt-3" @click="$router.push('/');">Explorar el Home</button>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">Accesibilidad</h5>
                                <p>De nada sirve tener un buen contenido si este no llega a todo el mundo. Por eso nuestro modelo es totalmente gratuito, tanto para escuchar como para publicar. Funcionamos a través de donaciones de nuestros generosos usuarios. Así que si confías en este proyecto, no dudes en aportar tu granito de arena.</p>
                                <button class="btn mt-3" @click="$router.push('/');">Ver Podcasts</button>
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
                                <h5 style="color: rgb(85, 50, 255);">Transparencia</h5>
                                <p>¡Lo que ves es lo que hay! No comercializamos con tus datos ni usamos cookies para rastrear tu comportamiento en la web. Nos comprometemos a ser abiertos y honestos en cuanto a nuestras políticas, prácticas y decisiones.</p>

                                <!-- BUtton to Explore -->
                                <button class="btn mt-3" @click="$router.push('/');">Publicar Episodio</button>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-md-6">
                                <h5 style="color: rgb(85, 50, 255);">Comunidad</h5>
                                <p>Gopodcast no solo es un medio de comunicación, sino un vibrante punto de encuentro para mentes curiosas y voces elocuentes. La interacción con el resto de usuarios es un aspecto clave en el que queremos trabajar. Sigue a tus creadores favoritos para estar al día de sus últimas publicaciones y conecta con ellos comentando en sus episodios.</p>
                                <button class="btn mt-3" @click="$router.push('/');">Descubre artistas</button>
                            </div>
                            <div class="col-md-6">
                                <img src="../assets/redpanda.jpg" alt="about-us" class="img-fluid"
                                    style="width: 100%; max-height: 300px;">
                            </div>
                        </div>
                    </div>
                    <div class="slogan">
                        <h1 class="text-center mt-5">GoPodcast</h1>
                        <p class="text-center">Un lugar en el que descubrir, aprender y compartir.</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-secondary mt-3" @click="$router.push('/register');">Sign Up</button>
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
